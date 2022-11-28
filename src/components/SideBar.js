// a side bar component placed in left side of the page
// show 2 filters + 1 sort + 1 reset button
// 2 filters: seller + brand
// 1 sort: sort by reviews_count
// 1 reset button: reset all filters and sort

import {useState} from "react";


export default function SideBar(props) {

    const {all_sellers, all_brands, filterBySeller, sortByReviewsCount, filterByBrand, reset} = props;
    const [flag, setFlag] = useState(false)

    function sortByReviewsCountFun() {
        setFlag(!flag)
        sortByReviewsCount(flag)
    }

    function resetFun() {
        reset()
        setFlag(false)
    }

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">Sort By</h5>
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault"
                           onClick={sortByReviewsCountFun}/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Review Count (Descending)
                    </label>
                </div>
                <h5 className="card-title">Filter By Seller</h5>
                <select className="form-select" aria-label="Default select example" id='seller'
                        onChange={(event) => filterBySeller(event.target.value, flag)}>
                    {all_sellers.map((seller, index) => (
                        <option value={seller}>{seller}</option>
                    ))}
                </select>
                <h5 className="card-title">Filter By Author</h5>
                <select className="form-select" aria-label="Default select example" id='brand'
                        onChange={(event) => filterByBrand(event.target.value, flag)}>
                    {all_brands.map((brand, index) => (
                        <option value={brand}>{brand}</option>
                    ))}
                </select>
                <br/>
                <button type="button" className="btn btn-primary" onClick={resetFun}>Reset</button>
            </div>
        </div>
    );
}