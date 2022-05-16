const ProductsReducer = (state = [], action) => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return action.payload;
    case "ADD_PRODUCT":
      return [...state, action.payload];
    case "REMOVE_PRODUCT":
      return state.filter((product) => product.id !== action.payload);
    case "UPDATE_PRODUCT":
      console.log(action.payload);
      return state.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
    case "SEAERCH_PRODUCTS":
      return state.filter((product) => product.name.includes(action.payload));
    default:
      return state;
  }
};

export default ProductsReducer;
