import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../../public/utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"

const Shop = () => {

    const [products ,setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(()=>{

        try{
            fetch("products.json")
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
        addToDb(product.id)
    }

    useEffect(()=>{

        const storedCart = getShoppingCart();
        
        const savedCart = [];
        for(const id in storedCart){
            const addededProduct = products.find(product => product.id === id)

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
                    key={product.id}
                    handleAddToCart={handleAddToCart}
                   >

                </Product>)
               
            }    

            </div>
            <div className="details-container">

                <Cart cart={cart}></Cart>

            </div>
            
        </div>
    );
};

export default Shop;