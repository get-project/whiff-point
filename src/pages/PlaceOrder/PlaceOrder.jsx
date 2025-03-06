import { useContext } from 'react'
import StoreContext from '../../context/StoreContext'
import './PlaceOrder.css'

function PlaceOrder() {

  const { getTotalCartAmount } = useContext(StoreContext);

  return (
    <form className='place_order'>
      <div className='place_order_left'>
        <p className='title'>Delivery Information</p>
        <div className='multi_fields'>
          <input type='text' placeholder='First Name' />
          <input type='text' placeholder='Last Name' />
        </div>

        <input type='text' placeholder='Email address' />
        <input type='text' placeholder='Street' />

        <div className='multi_fields'>
          <input type='text' placeholder='City' />
          <input type='text' placeholder='State' />
        </div>

        <div className='multi_fields'>
          <input type='text' placeholder='Zip Code' />
          <input type='text' placeholder='Country' />
        </div>

        <input type='text' placeholder='Phone' />
      </div>

      <div className='place_order_right'>
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
              <b>₹{getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 40}</b>
            </div>
          </div>
          <button >Proceed To Payment</button>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder