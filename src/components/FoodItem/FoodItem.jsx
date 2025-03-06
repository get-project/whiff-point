import { Link } from 'react-router';
import StoreContext from '../../context/StoreContext';  // Change import
import './FoodItem.css'
import { useContext } from 'react';
import { assets } from '../../../public/assets/assets';

function FoodItem({ id, name, price, description, image }) {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext);  // Use StoreContext

  return (

    <div className="food_item">
      <div className="food_item_img_container">
        <img className="food_item_img " src={image} alt={name} />
        {
          !cartItems[id] ? (
            <img
              className="addIcon"
              onClick={(e) => {
                e.preventDefault(); // Prevent navigation when clicking the add button
                addToCart(id);
              }}
              src={assets.add_icon_white}
              alt="Add to Cart"
            />
          ) : (
            <div className="food_item_counter">
              <img
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when clicking the remove button
                  removeFromCart(id);
                }}
                src={assets.remove_icon_red}
                alt="Remove from Cart"
              />
              <p>{cartItems[id]}</p>
              <img
                onClick={(e) => {
                  e.preventDefault(); // Prevent navigation when clicking the add button
                  addToCart(id);
                }}
                src={assets.add_icon_green}
                alt="Add to Cart"
              />
            </div>
          )
        }
      </div>
      <div className="food_item_info">
        <div className="food_item_name_rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food_item_desc">{description}</p>
        <p className="food_item_price">₹{price}</p>
      </div>
    </div>

  )
}

export default FoodItem