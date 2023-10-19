import React, {useRef} from 'react'
import { CarouselProvider, Slider, Slide, DotGroup, ButtonBack, ButtonNext, Dot } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';

const EventGallery = ({ images }) => {
    if (!images) images = []

    const sliderRef = useRef(null);

    const handlePrevClick = () => {
        sliderRef.current?.previousSlide();
    };

    const handleNextClick = () => {
        sliderRef.current?.nextSlide();
    };

    return (
        <div className="w-full relative lg:w-[90vh] px-32 lg:px-10">
            <CarouselProvider
                naturalSlideWidth={100}
                naturalSlideHeight={100}
                totalSlides={images.length}
                visibleSlides={2}
                dragEnabled={true}
                currentSlide={0} 
                infinite={true}
            >
                <Slider ref={sliderRef}>
                    {images.map((image, index) => (
                        <Slide key={index} index={index}>
                            <img
                                alt={`Image ${index + 1}`}
                                className="h-full w-full rounded-lg object-cover"
                                src={image}
                            />
                        </Slide>

                    ))}

                </Slider>
                <ButtonBack className="absolute top-1/2 left-20 lg:left-0 transform -translate-y-1/2 text-white bg-black rounded-full p-2 hover:bg-gray-900 transition-colors">
                    &lt;
                </ButtonBack>
                <ButtonNext className="absolute top-1/2 right-20 lg:right-0 transform -translate-y-1/2 text-white bg-black rounded-full p-2 hover:bg-gray-900 transition-colors">
                    &gt;
                </ButtonNext>
                <DotGroup className="absolute bottom-0 translate-y-5 left-2/4 transform -translate-x-2/4 z-50 flex gap-2">
                    {images.map((_, index) => (
                        <Dot
                            key={index}
                            slide={index}
                            className="block h-1 cursor-pointer rounded-2xl transition-all bg-white border w-4"
                            activeClassName="bg-white w-16"
                        />
                    ))}
                </DotGroup>
            </CarouselProvider>
        </div>
    )
}
export default EventGallery;