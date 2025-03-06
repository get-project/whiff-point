import { useContext } from 'react'
import './FoodDisplay.css'
import StoreContext from '../../context/StoreContext'
import Title from '../Title';
import FoodItem from '../FoodItem/FoodItem';
import { food_list } from '../../../public/assets/assets';

function FoodDisplay({ category }) {
  // Use imported food_list if context is not providing it
  const { food_list: contextFoodList } = useContext(StoreContext) || {};
  const displayList = contextFoodList || food_list;

  return (
    <div className='food_display' id='food_display'>
      <h2><Title text1={"TOP"} text2={"DISHES"} /></h2>
      <div className='food_display_list'>
        {displayList.map((item, index) => {
          if (category === "All" || category === item.category) {

            return <FoodItem
              key={index}
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              image={item.image}
            />
          }

        })}
      </div>
    </div>
  )
}

export default FoodDisplay