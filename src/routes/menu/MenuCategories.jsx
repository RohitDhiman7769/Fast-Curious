import React from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from "../../assets/images/search-icon.png";
import ResetLocation from "../../helpers/ResetLocation";
import { useSelector, useDispatch } from "react-redux";
import { addProductItem } from "../../store/products";
const MenuCategories = ({
  categories,
  changeCategory,
  resetPagination,
}) => {

  const dispatch = useDispatch()
  const productData = useSelector((store) => store.products.items)

  const findMenuItem = (e) => {
    e.preventDefault();
    const inputValue = e.target.value.toLowerCase();
    const collectData = productData.all.filter((product) =>
      product.ItemName.toLowerCase().includes(inputValue)
    );

    if (collectData.length > 0) {
      dispatch(addProductItem({all: collectData}))
      // setProducts((prev) => ({ ...prev, all: collectData }));
    } else {
      dispatch(addProductItem({all: []}))

      // setProducts((prev) => ({ ...prev, all: [] }));
    }
  };


  return (
    <article className="menu__categories">
      <section className="menu__categories__search">
        <input
          type="text"
          placeholder="search..."
          onChange={findMenuItem}
        />
        <img
          src={SearchIcon}
          alt=""
          aria-hidden="true"
        />
      </section>
      <ul>
        {categories.map((category) => (
          <li key={category.id}>
            <NavLink
              to="/menu"
              onClick={() => {
                changeCategory(category.name);
                ResetLocation();
                resetPagination();
              }}>
              {category.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </article>
  );
};
export default MenuCategories;
