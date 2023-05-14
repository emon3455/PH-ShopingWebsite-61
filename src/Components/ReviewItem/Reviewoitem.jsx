import React from 'react';
import "./ReviewItem.css"

const Reviewoitem = ({cart, handleCart}) => {

    const {_id,img,name,price,quantity} = cart;

    return (
        <div className='review-cart'>

            <div className="info-container">

                <div className="img-container">
                    <img  src={img} alt="" />
                </div>

                <div className="product-info">
                    <h4>{name}</h4>
                    <p>Price: $ <span>{price}</span></p>
                    <p>Quantity: <span>{quantity}</span></p>
                </div>
                
            </div>

            <div onClick={()=> handleCart(_id)} className="icon-container">
                    <i className="fa-solid fa-trash-can"></i>
            </div>
            
        </div>
    );
};

export default Reviewoitem;