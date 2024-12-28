import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [visible, setVisible] = useState(10);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://routesthenics-api.vercel.app/material")
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data);
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
        <h2>Equipamientos</h2>
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <ul>
            {materials.slice(0, visible).map((material) => (
              <a key={material._id} href={`/Material/${material._id}`}>
                <li className="exerc_item">{material.materialName}</li>
              </a>
            ))}
          </ul>
        )}
        {visible < materials.length && (
          <button onClick={showMoreItems} className="exerc_btn">
            Ver más <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </section>
    </>
  );
};

export default Material;
