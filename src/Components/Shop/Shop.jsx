import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../../public/utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import { Link } from 'react-router-dom';

const Shop = () => {

    const [products ,setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{

        try{
            fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(data => setProducts(data))
        }
        catch(ex){
            console.log(ex);
        }
   
    },[])

    const handleAddToCart = (product)=>{
        const newCart = [...cart , product];
        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart= ()=>{
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(()=>{

        const storedCart = getShoppingCart();
        
        const savedCart = [];
        for(const id in storedCart){
            const addededProduct = products.find(product => product._id === id)

            if(addededProduct){
                const quantity = storedCart[id];
                addededProduct.quantity = quantity;
                savedCart.push(addededProduct);
            }

            setCart(savedCart);
            
        }

    },[products])


    return (
        <div className='shoping-container'>

            <div className="product-container">

            {
               
               products.map(product => <Product
                    product={product}
                    key={product._id}
                    handleAddToCart={handleAddToCart}
                   >

                </Product>)
               
            }    

            </div>
            <div className="details-container">

                <Cart
                 cart={cart}
                 handleClearCart={handleClearCart}
                >
                    <button className='review-order-btn'><Link className='link-btn' to="/orders">Review Orders</Link></button>
                </Cart>

            </div>
            
        </div>
    );
};

export default Shop;