import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Electronica = () => {
  const [electros, setElectros] = useState([]);
  const [visible, setVisible] = useState(15); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/electronica")
      .then((res) => res.json())
      .then((data) => {
        setElectros(data);
        setLoading(false); 
      })
      .catch((err) => console.log(err));
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 15);
  };

  return (
    <>
      <section className="exerc_container">
        <h2>Genero de la Electronica</h2>
        {loading ? ( 
          <div className="spinner"></div>
        ) : (
        <ul>
          {electros.slice(0, visible).map((electro) => (
            <a key={electro._id} href={`/Electronica/${electro._id}`}>
              <li className="exerc_item">{electro.electroName}</li>
            </a>
          ))}
        </ul>
        )}
        {visible < electros.length && (
          <button onClick={showMoreItems} className="exerc_btn">
            Ver más <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </section>
    </>
  );
};

export default Electronica;
