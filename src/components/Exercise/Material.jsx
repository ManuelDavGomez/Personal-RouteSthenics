import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Material = () => {
  const [materials, setMaterials] = useState([]);
  const [visible, setVisible] = useState(10); // Estado para controlar la cantidad de elementos visibles

  useEffect(() => {
    fetch("http://localhost:3000/material")
      .then((res) => res.json())
      .then((data) => setMaterials(data))
      .catch((err) => console.log(err));
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <>
      <section className="exerc_container">
        <h2>Equipamientos</h2>
        <ul>
          {materials.slice(0, visible).map((material) => (
            <a key={material._id} href={`/Material/${material._id}`}>
              <li className="exerc_item">{material.materialName}</li>
            </a>
          ))}
        </ul>
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
