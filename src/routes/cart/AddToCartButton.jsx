import React from "react";
import {handleAddProduct} from './../../utils/getUser'
import { products } from "../../data/products";
import { useDispatch, useSelector } from "react-redux";
const AddToCartButton = ({ singleProduct,
  selectedAttributes, targetAttribute, setTargetAttribute }) => {
 
    const dispatch = useDispatch()
    const products = useSelector((store)=>store.products.items)
    console.log(products)

    const click = ()=>{
      
      handleAddProduct(singleProduct, selectedAttributes,products,dispatch);
      setTargetAttribute(false);
    }
 
    return (
    <button
      onClick={click}
      className={`passive-button-style ${targetAttribute?.length > 0 || singleProduct?.attributes?.length === 0
        ? "active-add-to-cart"
        : "inactive-add-to-cart"
        }`}
      disabled={targetAttribute?.length > 0 || singleProduct?.attributes?.length === 0 ? false : true}
    >
      Add to cart
    </button>
  );
}
export default AddToCartButton;