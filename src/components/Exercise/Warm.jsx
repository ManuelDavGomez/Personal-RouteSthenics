import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ExercBasic = () => {
  const [basics, setBasics] = useState([]);
  const [visible, setVisible] = useState(15); // Estado para controlar la cantidad de elementos visibles

  useEffect(() => {
    fetch("http://localhost:3000/warmup")
      .then((res) => res.json())
      .then((data) => setBasics(data))
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
        {basics.slice(0, visible).map((basic) => (
            <a key={basic._id}href={`/Calentamientos/${basic._id}`}>
              <li  className="exerc_item">
                {basic.warmName}
              </li>
            </a>
          ))}
        </ul>
        {visible < basics.length && (
          <button onClick={showMoreItems} className="exerc_btn">
            Ver más <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </section>
    </>
  );
};

export default ExercBasic;
