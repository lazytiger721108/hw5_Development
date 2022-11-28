// show image + price + rating + brand + title + reviews + seller
// have a button to add to cart/ remove from cart

export default function ItemCard(props) {
    const {
        asin,
        image_url,
        final_price,
        rating,
        brand, // = author
        title,
        reviews_count,
        addToCart,
        removeFromCart,
        seller_id,
        inCart
    } = props;


    return (
        <div className="row p-2 bg-white border rounded m-2">
            <div className="col-md-3 mt-1">
                <img className="img-fluid img-responsive rounded product-image" src={image_url} alt={title}/>
            </div>
            <div className="col-md-6 mt-1">
                <h5 className="text-primary">{title}</h5>
                <h6 className="text-muted font-weight-normal">ISBN: {asin}</h6>
                <div className="d-flex flex-row">
                    {/* TODO: use fontawesome rating stars */}
                    <p className="text-warning mb-0 mr-1">{rating}</p>
                    <p className="small text-muted mb-0 mr-1">({reviews_count} reviews)</p>
                </div>
                <div className="mt-1 mb-1 spec-1">
                    <span className="text-secondary">By {brand}</span>
                </div>
                {seller_id && <div className="mt-1 mb-1 spec-1">
                    <span className="text-secondary">Sold by <b className={"text-primary"}>{seller_id}</b></span>
                </div>}
            </div>
            <div className="align-items-center align-content-center col-md-3 border-left mt-1">
                <div className="d-flex flex-row align-items-center">
                    <span>${final_price}</span>
                </div>
                <div className="d-flex flex-column mt-4">
                    {inCart ?
                        <button className="btn btn-danger" onClick={() => {
                            removeFromCart(props);
                        }
                        }>Remove from cart</button>
                        :
                        <button className="btn btn-primary" onClick={() => {
                            addToCart(props);
                        }
                        }>Add to cart</button>
                    }
                </div>
            </div>
        </div>
    );
}