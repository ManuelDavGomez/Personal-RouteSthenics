import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Rock = () => {
  const [rocks, setRocks] = useState([]);
  const [visible, setVisible] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://routesthenics-api.vercel.app/rock")
      .then((res) => res.json())
      .then((data) => {
        setRocks(data);
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
        <h2>Genero de Rock</h2>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <ul>
            {rocks.slice(0, visible).map((rock) => (
              <a key={rock._id} href={`/Rock/${rock._id}`}>
                <li className="exerc_item">{rock.rockName}</li>
              </a>
            ))}
          </ul>
        )}
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
