import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ExercBasic = () => {
  const [basics, setBasics] = useState([]);
  const [visible, setVisible] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://routesthenics-api.vercel.app/exercisebasic")
      .then((res) => res.json())
      .then((data) => {
        setBasics(data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <>
      <section className="exerc_container">
        <h2>Ejercicios Básicos y Variaciones</h2>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <ul>
            {basics.slice(0, visible).map((basic) => (
              <a key={basic._id} href={`/EjerciciosBasicos/${basic._id}`}>
                <li className="exerc_item">{basic.basicsName}</li>
              </a>
            ))}
          </ul>
        )}
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
