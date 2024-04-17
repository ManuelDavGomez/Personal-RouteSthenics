import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Flexibility = () => {
  const [flexs, setFlexs] = useState([]);
  const [visible, setVisible] = useState(15); // Estado para controlar la cantidad de elementos visibles

  useEffect(() => {
    fetch("http://localhost:3000/flexibility")
      .then((res) => res.json())
      .then((data) => setFlexs(data))
      .catch((err) => console.log(err));
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  return (
    <>
      <section className="exerc_container">
        <h2>Flexibilidad</h2>
        <ul>
          {flexs.slice(0, visible).map((flex) => (
            <a key={flex._id} href={`/Flexibilidad/${flex._id}`}>
              <li className="exerc_item">{flex.flexName}</li>
            </a>
          ))}
        </ul>
        {visible < flexs.length && (
          <button onClick={showMoreItems} className="exerc_btn">
            Ver más <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </section>
    </>
  );
};

export default Flexibility;
