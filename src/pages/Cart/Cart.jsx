import { useContext, useEffect } from 'react';
import StoreContext from '../../context/StoreContext';
import './Cart.css'
import { useNavigate } from 'react-router';

function Cart() {
  const { cartItems, food_list, removeFromCart, addToCart, getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();


  useEffect(() => {
    console.log("Cart Items:", JSON.stringify(cartItems, null, 2));
  }, [cartItems]);

  return (
    <div className='cart'>
      <div className='cartItems'>
        <div className='cartItems_title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
          <p>Add</p>
        </div>
        <br />
        <hr />
        {food_list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div key={item._id} className='cartItems_title cartItems_item'>
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{item.price * cartItems[item._id]}</p>
                <p className='cross' onClick={() => removeFromCart(item._id)}>x</p>
                <p className='add' onClick={() => addToCart(item._id)}>+</p>
                <hr />
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className='cart_bottom'>
        <div className='cart_total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart_total_details'>
              <p>Subtotal</p>
              <p>₹{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className='cart_total_details'>
              <p>Delivery Fee</p>
              <p>₹{getTotalCartAmount() === 0 ? 0 : 40}</p>
            </div>
            <hr />
            <div className='cart_total_details'>
              <b>Total</b>
              <b>₹{getTotalCartAmount() === 0? 0 :getTotalCartAmount() + 40 }</b>
            </div>
          </div>
          <button onClick={() => navigate('/placeorder')}>Proceed To Check</button>
        </div>
        <div className='cart_promo_code'>
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart_promocode_input'>
              <input type='text' placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
