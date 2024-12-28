import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Warm = () => {
  const [warms, setWarms] = useState([]);
  const [visible, setVisible] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://routesthenics-api.vercel.app/warmup")
      .then((res) => res.json())
      .then((data) => {
        setWarms(data);
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
        <h2>Calentamientos</h2>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <ul>
            {warms.slice(0, visible).map((warm) => (
              <a key={warm._id} href={`/Calentamientos/${warm._id}`}>
                <li className="exerc_item">{warm.warmName}</li>
              </a>
            ))}
          </ul>
        )}
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
