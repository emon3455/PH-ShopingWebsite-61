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

    // useEffect(() => {
    //     try {
    //         fetch("http://localhost:5000/products")
    //             .then(res => res.json())
    //             .then(data => setProducts(data))
    //     }
    //     catch (ex) {
    //         console.log(ex);
    //     }
    // }, [])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`);

            const data = await response.json();
            setProducts(data);
        }
        fetchData();
    }, [currentPage, itemsPerPage]);


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
        const ids = Object.keys(storedCart);

        fetch(`http://localhost:5000/productsByIds`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(cartProducts => {
                const savedCart = [];
                // step 1: get id of the addedProduct
                for (const id in storedCart) {
                    // step 2: get product from products state by using id
                    const addedProduct = cartProducts.find(product => product._id === id)
                    if (addedProduct) {
                        // step 3: add quantity
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        // step 4: add the added product to the saved cart
                        savedCart.push(addedProduct);
                    }
                    // console.log('added Product', addedProduct)
                }
                // step 5: set the cart
                setCart(savedCart);
            })


    }, [])

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