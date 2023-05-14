import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../../public/utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import "./Shop.css"
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {

    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    const [currentPage , setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { totalProducts } = useLoaderData();
    console.log(totalProducts);

    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    const pageNumbers = [...Array(totalPages).keys()];
    console.log(pageNumbers);

    useEffect(() => {

        try {
            fetch("http://localhost:5000/products")
                .then(res => res.json())
                .then(data => setProducts(data))
        }
        catch (ex) {
            console.log(ex);
        }

    }, [])

    const handleAddToCart = (product) => {
        const newCart = [...cart, product];
        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {

        const storedCart = getShoppingCart();

        const savedCart = [];
        for (const id in storedCart) {
            const addededProduct = products.find(product => product._id === id)

            if (addededProduct) {
                const quantity = storedCart[id];
                addededProduct.quantity = quantity;
                savedCart.push(addededProduct);
            }

            setCart(savedCart);

        }

    }, [products])

    const options = [5, 10, 15, 20];
    function handleSelectChange(event) {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0);
    }


    return (
        <>
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
            {/* pagination */}
            <div className="pagination">
                {
                    <p>currentPage: {currentPage}</p>
                }
                {
                    pageNumbers.map(page=> <button
                        key={page}
                        onClick={()=> setCurrentPage(page)}
                        className={currentPage === page ? "selected" : ""} 
                        > 
                        {page} 
                        </button> 
                        )
                }
                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {options.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default Shop;