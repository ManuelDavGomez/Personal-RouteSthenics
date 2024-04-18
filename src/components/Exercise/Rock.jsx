import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Rock = () => {
  const [rocks, setRocks] = useState([]);
  const [visible, setVisible] = useState(15); // Estado para controlar la cantidad de elementos visibles

  useEffect(() => {
    fetch("http://localhost:3000/rock")
      .then((res) => res.json())
      .then((data) => setRocks(data))
      .catch((err) => console.log(err));
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  return (
    <> 
      <section className="exerc_container">
        <h2>Genero de Rock</h2>
        <ul>
          {rocks.slice(0, visible).map((rock) => (
            <a key={rock._id} href={`/Rock/${rock._id}`}>
              <li className="exerc_item">{rock.rockName}</li>
            </a>
          ))}
        </ul>
        {visible < rocks.length && (
          <button onClick={showMoreItems} className="exerc_btn">
            Ver más <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </section>
    </>
  );
};

export default Rock;
