import { menu_list } from "../../../public/assets/assets"
import Title from "../Title"
import './ExploreMenu.css'

function ExploreMenu({ category, setCategory }) {
  return (
    <>
      <section className=" mt-32">
        <div className="exploreMenu " id="exploreMenu">
         <Title text1={"Explore"} text2={"Our Menu"} />
          <p className="exploreMenu_text">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta ducimus architecto perspiciatis!</p>

          <div className="exploreMenu_list">
            {menu_list.map((item, index) => {
              return (
                <div onClick={() => setCategory(prev => prev === item.menu_name ? "ALl" : item.menu_name)} key={index} className="exploreMenu_list_item">
                  <img className={category === item.menu_name ? "active" : ""} src={item.menu_image} alt="" />
                  <p>{item.menu_name}</p>
                </div>
              )
            })}
          </div>

          <hr />
        </div>
      </section>

    </>

  )
}

export default ExploreMenu