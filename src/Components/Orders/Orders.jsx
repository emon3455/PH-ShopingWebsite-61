import React from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';
import Reviewoitem from '../ReviewItem/Reviewoitem';
import "./Order.css"

const Orders = () => {

    const cart = useLoaderData();

    return (
        <div className='shoping-container'>

            <div className="review-container">

               {
                cart.map(crt=> <Reviewoitem
                    key={crt.id}
                    cart={crt}
                
                ></Reviewoitem>)
               }

            </div>
            
            <div className="details-container">

                <Cart cart={cart}></Cart>

            </div>
            
        </div>
    );
};

export default Orders;