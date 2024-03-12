// ExerciseDetail.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const id = () => {
  const { id } = useParams();
  const [exercise, setExercise] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/exercisebasic/${id}`)
      .then((res) => res.json())
      .then((data) => setExercise(data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!exercise) {
    return <div>Cargando ejercicio...</div>;
  }

  return (
    <div>
      <h2>Detalles del ejercicio</h2>
      <h3>{exercise.exerciseName}</h3>
      {/* Mostrar otros detalles del ejercicio según sea necesario */}
    </div>
  );
};

export default id;
