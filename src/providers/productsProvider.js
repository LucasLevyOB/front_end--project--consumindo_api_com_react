import { createContext, useReducer } from "react";
import ProductsReducer from "../reducers/productsReducer";

const ProductsContext = createContext([]);

const ProductsProvider = ({ children }) => {
  const [products, productsDispatch] = useReducer(ProductsReducer, []);

  return (
    <ProductsContext.Provider value={{ products, productsDispatch }}>
      {children}
    </ProductsContext.Provider>
  );
};

export { ProductsContext };

export default ProductsProvider;
