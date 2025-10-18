import Carousel from "react-bootstrap/Carousel";
import eldenring from "../../../assets/img/Elden-Ring-1.webp";
import gowr from "../../../assets/img/God-of-War-Ragnarok.webp";
import wukong from "../../../assets/img/Black-Myth-WuKong.webp";
import kingdom from "../../../assets/img/Kingdom-Come-Deliverance-2.webp";

function Carrousel() {
  const images = [
    { src: eldenring, label: "First slide" },
    { src: gowr, label: "Second slide" },
    { src: wukong, label: "Third slide" },
    { src: kingdom, label: "Fourth slide" },
  ];

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        overflow: "hidden",
      }}
    >
      <Carousel>
        {images.map((img, idx) => (
          <Carousel.Item key={idx} interval={2000}>
            <img
              src={img.src}
              alt={`${img.label}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default Carrousel;
