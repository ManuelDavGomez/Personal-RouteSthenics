import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Warm = () => {
  const [warms, setWarms] = useState([]);
  const [visible, setVisible] = useState(15); // Estado para controlar la cantidad de elementos visibles

  useEffect(() => {
    fetch("http://localhost:3000/warmup")
      .then((res) => res.json())
      .then((data) => setWarms(data))
      .catch((err) => console.log(err));
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  return (
    <>
      <section className="exerc_container">
        <h2>Calentamientos</h2>
        <ul>
          {warms.slice(0, visible).map((warm) => (
            <a key={warm._id} href={`/Calentamientos/${warm._id}`}>
              <li className="exerc_item">{warm.warmName}</li>
            </a>
          ))}
        </ul>
        {visible < warms.length && (
          <button onClick={showMoreItems} className="exerc_btn">
            Ver más <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </section>
    </>
  );
};

export default Warm;
