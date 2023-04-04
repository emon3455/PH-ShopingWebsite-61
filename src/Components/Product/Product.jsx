import React from 'react';
import "./Product.css"

const Product = (props) => {
    const {id,name,seller,price,ratings,img} = props.product;

    const handleAddToCart = props.handleAddToCart;

    return (
        <div className='product'>

            <div>
                <img src={img} alt="product image" />
            </div>

            <div className="product-body">
                <h4>{name.length>20 ? name.slice(0,20): name}</h4>
                <h4>Price: ${price}</h4>
                <p>Manufracturer: {seller}</p>

                <p>Rating: {ratings}</p>
                <button onClick={()=> handleAddToCart(props.product)} className='addToCart'>Add To Cart <i className="fa-solid fa-cart-shopping"></i></button>
            </div>
        </div>
    );
};

export default Product;