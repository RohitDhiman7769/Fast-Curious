import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AddToCartButton from '../cart/AddToCartButton';
import Attribute from './Attribute';
import ResetLocation from "../../helpers/ResetLocation";

const MenuGridItem = ({ singleProduct }) => {
  const [selectedAttributes, setSelectedAttributes] = useState([]);
  const [targetAttribute, setTargetAttribute] = useState('');

  const handleSelectedAttributes = (attributeId, attributeValue) => {
    setTargetAttribute(attributeValue);
    const newSelectedAttribute = { attributeId, attributeValue };
    setSelectedAttributes(prevAttributes => {
      const existingAttributeIndex = prevAttributes.findIndex(
        attribute => attribute.attributeId === newSelectedAttribute.attributeId
      );
      if (existingAttributeIndex !== -1) {
        const updatedAttributes = [...prevAttributes];
        updatedAttributes[existingAttributeIndex] = { ...newSelectedAttribute };
        return updatedAttributes;
      } else {
        return [...prevAttributes, newSelectedAttribute];
      }
    });
  };


  return (
    <article className="menu-item txt-white">
      <Link onClick={ResetLocation} to={`/menu/${singleProduct.id}`} className="menu-item__link">
        <img src={singleProduct.ItemImg} alt={`${singleProduct.ItemName}`} />
      </Link>
      <h3>{singleProduct.ItemName}</h3>
      <p>{singleProduct.ItemIngredients}</p>
      {singleProduct.attributes.length === 0 ? null :
        singleProduct.attributes?.map(attribute => (
          <Attribute
            key={attribute.id}
            className="menu-item__attributes"
            handleSelectedAttributes={handleSelectedAttributes}
            attribute={attribute}
            targetAttribute={targetAttribute}
          />
        ))
      }
      <div className="menu-item__pricing">
        {singleProduct.sale === true ?
          <section className="menu-item__pricing-sale">
            <p className="menu-item__pricing-prev"><span>$</span>{singleProduct.ItemPriceBefore}</p>
            <p className="menu-item__pricing-curr"><span>$</span>{singleProduct.ItemPrice}</p>
          </section>
          :
          <p className="menu-item__pricing-curr"><span>$</span>{singleProduct.ItemPrice}</p>
        }
        <AddToCartButton
          // handleAddProduct={handleAddProduct}
          // handleRemoveProduct={handleRemoveProduct}
          singleProduct={singleProduct}
          selectedAttributes={selectedAttributes}
          targetAttribute={targetAttribute}
          setTargetAttribute={setTargetAttribute}
        />
      </div>
    </article>
  );
};

export default MenuGridItem;
