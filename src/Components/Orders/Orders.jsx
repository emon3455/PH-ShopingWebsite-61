import React, { useState } from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import Reviewoitem from '../ReviewItem/Reviewoitem';
import "./Order.css"
import { deleteShoppingCart, removeFromDb } from '../../../public/utilities/fakedb';

const Orders = () => {

    const savedCart = useLoaderData();
    const [cart, setCart] = useState(savedCart);

    const handleCart=(id)=>{
        const remainingCart = cart.filter(product=> product.id !== id);
        setCart(remainingCart);
        removeFromDb(id);
    }

    const handleClearCart= ()=>{
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shoping-container'>

            <div className="review-container">

               {
                cart.map(crt=> <Reviewoitem
                    key={crt.id}
                    cart={crt}
                    handleCart={handleCart}
                ></Reviewoitem>)
               }

            </div>

            <div className="details-container">

                <Cart 
                
                    cart={cart}
                    handleClearCart={handleClearCart}
                
                ></Cart>

            </div>
            
        </div>
    );
};

export default Orders;