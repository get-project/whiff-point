import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel, Pagination, Autoplay } from 'swiper/modules';
import { gsap } from 'gsap';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import "./index.css";


const img = [
    { src: "assets/pic5.jpeg", title: "Food1" },
    { src: "assets/pic6.jpeg", title: "Food2" },
    { src: "assets/pic7.jpeg", title: "Food3" },
    { src: "assets/pic8.jpeg", title: "Food4" },
    { src: "assets/pic9.jpeg", title: "Food5" },
    { src: "assets/pic10.jpeg", title: "Food6" },
    { src: "assets/pic10.jpeg", title: "Food7" },
    { src: "assets/pic10.jpeg", title: "Food8" },
    { src: "assets/pic10.jpeg", title: "Food9" }
];

function Slider() {
    const swiperRef = useRef(null);
    // const progressCircle = useRef(null);
    // const progressContent = useRef(null);
    // const onAutoplayTimeLeft = (s, time, progress) => {
    //     progressCircle.current.style.setProperty('--progress', 1 - progress);
    //     progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    // };
    return (
        <main>
            <section className='hero-sec'>
                <Swiper
                    modules={[Mousewheel, Pagination, Navigation, Autoplay]}
                    grabCursor={true}
                    initialSlide={3}
                    centeredSlides={true}
                    slidesPerView={1}
                    spaceBetween={15}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    style={{
                        background: '#ffffff',
                    }}
                    // onAutoplayTimeLeft={onAutoplayTimeLeft}
                    navigation
                    pagination={{
                        clickable: true
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 50,
                        },
                    }}
                    speed={1000}
                    slideToClickedSlide={true}
                    mousewheel={{ thresholdDelta: 30 }}
                    onInit={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={(swiper) => {
                        const activeSlide = swiper.slides[swiper.activeIndex];
                        gsap.fromTo(
                            activeSlide,
                            { scale: 0.8 },
                            { scale: 1, duration: 0.8, ease: "back.out" }
                        );
                    }}
                >
                    {img.map((image, index) => (
                        <SwiperSlide key={index}>
                            <img 
                                className='block w-full h-full object-cover' 
                                src={image.src} 
                                alt={image.title}
                                style={{
                                    aspectRatio: '16/9',
                                }}
                            />
                            <p>{image.title}</p>
                        </SwiperSlide>
                    ))}

                    {/* <div className="autoplay-progress" slot="container-end">
                        <svg viewBox="0 0 48 48" ref={progressCircle}>
                            <circle cx="24" cy="24" r="20"></circle>
                        </svg>
                        <span ref={progressContent}></span>
                    </div> */}
                </Swiper>

            </section>
        </main>
    );
}

export default Slider;