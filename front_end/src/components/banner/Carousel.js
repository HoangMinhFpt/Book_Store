import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../../styles/components/banner/Carousel.scss";
import CardList from "../card/book/CardList";

const Carousel = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true
  };
  return (
    <div className="owl-carousel-container">
      <Slider {...settings} className="owl-carousel-content">
        {props.data.map((product, index) => {
          return (
            <CardList
              data={product}
              className="card-list-carousel"
              key={index}
            />
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
