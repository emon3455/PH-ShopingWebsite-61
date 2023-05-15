import { getShoppingCart } from "../../public/utilities/fakedb";

const cartProductsLoader = async()=>{

    const storedCart = getShoppingCart(); // {id , quantity} ai formet data load kora.
    const ids = Object.keys(storedCart);
    const loadedProduct = await fetch(`http://localhost:5000/productsByIds`,{
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify(ids)
    });

    const product = await loadedProduct.json();

    const savedCart = [];


    for (const id in storedCart) {
       const addededProduct = product.find(pd=> pd._id === id);
       if(addededProduct){
            const quantity = storedCart[id];
            addededProduct.quantity = quantity;
            savedCart.push(addededProduct);
       }
    }


    return savedCart;
}

export default cartProductsLoader