import './App.css';
import {useState} from "react";
import BookData from './assets/data.json';
import ItemCard from "./components/ItemCard";
import SideBar from "./components/SideBar";


// only use the first 200 items in data.json
BookData = BookData.slice(0, 200);
// if seller_id is empty, change it to 'Unknown'; if final_price is empty, change it to 0
BookData.forEach((item) => {
        if (item.seller_id === null) {
            item.seller_id = 'Unknown';
        }
        if (item.final_price === null) {
            item.final_price = 0;
        }
        // if item's brand start with "by ", remove "by "
        if (item.brand.startsWith("by ")) {
            item.brand = item.brand.substring(3);
        }
    }
);

BookData.sort((v1, v2) => v1.reviews_count - v2.reviews_count)

// retrieve all sellers and brands, then sort them
const all_sellers = [...new Set(BookData.map(item => item.seller_id))].sort();
const all_brands = [...new Set(BookData.map(item => item.brand))].sort();
all_sellers.unshift("all"); // dummy
all_brands.unshift("all"); // dummy


export default function App() {
    // init as a list
    const [cart, setCart] = useState([]);
    const [seller_id, setSeller_id] = useState('all');
    const [brand, setBrand] = useState('all');


    const [data, setData] = useState(JSON.parse(JSON.stringify(BookData)));

    // console.log(data[0])

    function addToCart(item) {
        // add item to cart
        setCart([...cart, item]);
        // console.log(cart)
    }

    function removeFromCart(item) {
        // remove item from cart
        setCart(cart.filter((i) => i.asin !== item.asin));
    }

    function filterBySeller(seller_id, flag) {
        // console.log(brand, seller_id)
        // if seller_id lower case is 'all'
        setSeller_id(seller_id);
        const books = BookData.filter((item) => {
            if (seller_id === 'all') {
                return item.brand === brand || brand === 'all';
            } else {
                if (brand === 'all') {
                    return item.seller_id === seller_id
                } else {
                    return item.seller_id === seller_id && item.brand === brand
                }
            }
        })
        // if sort flag is true, sort by reviews_count descending
        if (flag) {
            books.sort((v1, v2) => v2.reviews_count - v1.reviews_count)
        }
        setData(JSON.parse(JSON.stringify(books)))
    }

    function filterByBrand(brand, flag) {
        // console.log(brand, seller_id)
        setBrand(brand);
        const books = BookData.filter((item) => {
            if (brand === 'all') {
                return item.seller_id === seller_id || seller_id === 'all';
            } else {
                if (seller_id === 'all') {
                    return item.brand === brand
                } else {
                    return item.seller_id === seller_id && item.brand === brand
                }
            }
        })
        if (flag) {
            books.sort((v1, v2) => v2.reviews_count - v1.reviews_count)
        }
        setData(JSON.parse(JSON.stringify(books)))
    }

    function sortByReviewsCount(flag) {
        const books = data.sort((v1, v2) => {
            if (flag) {
                return v1.reviews_count - v2.reviews_count
            } else {
                return v2.reviews_count - v1.reviews_count
            }
        })
        setData(JSON.parse(JSON.stringify(books)));
    }

    function reset() {
        setData(JSON.parse(JSON.stringify(BookData)));
        setSeller_id('all');
        setBrand('all');
        // let checkbox as unchecked
        document.getElementById('flexCheckDefault').checked = false;
        // let the two filter dropdowns as 'all'
        document.getElementById('seller').value = 'all';
        document.getElementById('brand').value = 'all';
    }

    return (
        <div className="App">
            <div className="container row">
                {/* sidebar */}
                <div className="col-md-2">
                    <SideBar
                        all_brands={all_brands}
                        filterByBrand={filterByBrand}
                        all_sellers={all_sellers}
                        filterBySeller={filterBySeller}
                        sortByReviewsCount={sortByReviewsCount}
                        reset={reset}
                    />
                </div>
                <div className="col-sm-7">
                    <div className="d-flex justify-content-center row">
                        {/* map through data to show each item with ItemCard component */}
                        {/* pass in addToCart and removeFromCart functions as props */}
                        {/* props = image_url, final_price, rating, category, title, reviews_count, addToCart, removeFromCart */}
                        {data.map((item) => (
                            <ItemCard asin={item.asin}
                                      image_url={item.image_url}
                                      final_price={item.final_price}
                                      rating={item.rating}
                                      brand={item.brand}
                                      title={item.title}
                                      reviews_count={item.reviews_count}
                                      addToCart={addToCart}
                                      removeFromCart={removeFromCart}
                                      seller_id={item.seller_id}
                                      inCart={cart.some((i) => i.asin === item.asin)}
                            />
                        ))}
                    </div>
                </div>
                {/* show cart items with list, price for each item, total price */}
                <div className="col-sm-3">
                    <h3>Cart</h3>
                    <ul className="list-group">
                        {cart.map((item, index) => (
                            <li className="list-group-item d-flex justify-content-between align-items-center">
                                {item.title}
                                <span className="badge bg-primary rounded-pill">${item.final_price}</span>
                            </li>
                        ))}
                    </ul>
                    {/* total price: keep two decimal places */}
                    <h4>Total: ${cart.reduce((acc, item) => acc + item.final_price, 0).toFixed(2)}</h4>
                </div>
            </div>
        </div>
    );
}