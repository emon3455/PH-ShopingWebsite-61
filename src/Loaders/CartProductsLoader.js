import { getShoppingCart } from "../../public/utilities/fakedb";

const cartProductsLoader = async()=>{
    const loadedProduct = await fetch("products.json");
    const product = await loadedProduct.json();

    const storedCart = getShoppingCart(); // {id , quantity} ai formet data load kora.

    const savedCart = [];
    for (const id in storedCart) {
       const addededProduct = product.find(pd=> pd.id === id);
       if(addededProduct){
            const quantity = storedCart[id];
            addededProduct.quantity = quantity;
            savedCart.push(addededProduct);
       }
    }

    return savedCart;
}

export default cartProductsLoader