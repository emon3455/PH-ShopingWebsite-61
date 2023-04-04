import React from 'react';
import Cart from '../Cart/Cart';
import { useLoaderData } from 'react-router-dom';

const Orders = () => {

    const product = useLoaderData();

    return (
        <div className='shoping-container'>

            <div className="product-container">

               <h2>Orderd item: {product.length}</h2>

            </div>
            <div className="details-container">

                <Cart cart={product}></Cart>

            </div>
            
        </div>
    );
};

export default Orders;