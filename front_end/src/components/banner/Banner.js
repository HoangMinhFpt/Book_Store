import {
    faChevronLeft,
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/components/banner/Banner.scss";

function Banner(props) {
    const Item = ({ item, index }) => (
        <div className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <center>
                <img src={item.img} className="img-fluid" alt={item.title} />
            </center>
        </div>
    );

    const Indicator = ({ item, index }) => (
        <li
            data-bs-target={`#${item}`}
            data-bs-slide-to={index}
            className={`${index === 0 ? "active" : ""}`}
        />
    );

    return (
        <div
            id={props.id}
            className={`carousel slide ${props.className}`}
            data-bs-ride="carousel"
            style={{ minHeight: 100 }}
        >
            <ol className="carousel-indicators">
                {props.data.map((item, index) => (
                    <Indicator item={props.id} index={index} key={index} />
                ))}
            </ol>
            <div className="carousel-inner">
                {props.data.map((item, index) => (
                    <Item item={item} index={index} key={index} />
                ))}
            </div>
            <a
                className="carousel-control-prev"
                href={`#${props.id}`}
                role="button"
                data-bs-slide="prev"
            >
                <FontAwesomeIcon icon={faChevronLeft} style={{ color: "##22232b" }} />
            </a>
            <a
                className="carousel-control-next"
                href={`#${props.id}`}
                role="button"
                data-bs-slide="next"
            >
                <FontAwesomeIcon icon={faChevronRight} style={{ color: "##22232b" }} />
            </a>
        </div>
    );
}

export default Banner;
