import LightGallery from 'lightgallery/react';
// import styles
import 'lightgallery/css/lightgallery.css';
import 'lightgallery/css/lg-zoom.css';
import 'lightgallery/css/lg-thumbnail.css';
import 'lightgallery/css/lg-autoplay.css';
import 'lightgallery/css/lg-fullscreen.css';
import 'lightgallery/css/lg-share.css';


// import plugins if you need
import lgThumbnail from 'lightgallery/plugins/thumbnail';
import lgZoom from 'lightgallery/plugins/zoom';
import lgAutoplay from 'lightgallery/plugins/autoplay';
import lgFullscreen from 'lightgallery/plugins/fullscreen';
import lgShare from 'lightgallery/plugins/share';
import Title from './Title';

const images = [

    { src: "assets/food_15.png", alt: "food_img" },
    { src: "assets/food_16.png", alt: "food_img" },
    { src: "assets/food_17.png", alt: "food_img" },
    { src: "assets/food_18.png", alt: "food_img" },
    { src: "assets/food_19.png", alt: "food_img" },
    { src: "assets/food_20.png", alt: "food_img" },
    { src: "assets/food_21.png", alt: "food_img" },
    { src: "assets/food_22.png", alt: "food_img" },
    { src: "assets/food_23.png", alt: "food_img" },
    { src: "assets/food_24.png", alt: "food_img" },
    { src: "assets/food_25.png", alt: "food_img" },
    { src: "assets/food_26.png", alt: "food_img" }

]

export function Gallery() {
    const onInit = () => {
        console.log('lightGallery has been initialized');
    };
    const onBeforeSlide = (detail) => {
        const { index, prevIndex } = detail;
        console.log(index, prevIndex);
    };
    return (
        <div className="App py-8">
            <Title className="text-2xl mb-6" text1={"ORDER"} text2={"NOW"} />
            <LightGallery
                onInit={onInit}
                onBeforeSlide={onBeforeSlide}
                speed={500}
                plugins={[lgThumbnail, lgZoom, lgAutoplay, lgFullscreen, lgShare]}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
                {
                    images.map((image, index) => {
                        return (
                            <a href={image.src} key={index} className="aspect-video">
                                <img 
                                    className='lgImage w-full h-full object-cover' 
                                    alt={image.alt} 
                                    src={image.src}
                                />
                            </a>
                        )
                    })
                }
            </LightGallery>
        </div>
    );
}