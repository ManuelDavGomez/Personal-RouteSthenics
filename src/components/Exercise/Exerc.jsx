import { useState, useEffect } from "react";
import "./exerc.css";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const ExercBasic = () => {
  const [skills, setSkills] = useState([]);
  const [visible, setVisible] = useState(10);

  useEffect(() => {
    fetch("http://localhost:3000/exercise")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.log(err));
  }, []);

  const showMoreItems = () => {
    setVisible((prevValue) => prevValue + 10);
  };

  return (
    <> 
      <section className="exerc_container">
        <h2>Habilidades (Skills)</h2>
        <ul >
          {skills.slice(0, visible).map((skill) => (
            <a key={skill._id} href={`/Skills/${skill._id}`}>
              <li className="exerc_item">
                {skill.exerciseName}
              </li>
            </a>
          ))}
        </ul>
        {visible < skills.length && (
          <button onClick={showMoreItems} className="exerc_btn">
            Ver más <MdOutlineKeyboardDoubleArrowRight />
          </button>
        )}
      </section>
    </>
  );
};

export default ExercBasic;
