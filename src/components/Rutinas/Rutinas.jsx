// src/components/Rutinas.jsx
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";
import ejerciciosData from "../../data/ejercicios.json";

const niveles = ["Principiante", "Intermedio", "Avanzado"];
const categorias = ["Empuje", "Tiron", "Core", "Piernas"];

const Rutinas = () => {
  const [rutina, setRutina] = useState([]);
  const [ejercicios, setEjercicios] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroNivel, setFiltroNivel] = useState("");
  const [filtroCategoria, setFiltroCategoria] = useState("");

  useEffect(() => {
    setEjercicios(ejerciciosData);
    const rutinaGuardada = localStorage.getItem("miRutina");
    if (rutinaGuardada) {
      setRutina(JSON.parse(rutinaGuardada));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("miRutina", JSON.stringify(rutina));
  }, [rutina]);

  const agregarEjercicio = (ejercicio) => {
    const repeticiones = prompt("¿Cuántas repeticiones?");
    const series = prompt("¿Cuántas series?");
    if (!rutina.find((e) => e.id === ejercicio.id)) {
      setRutina([...rutina, { ...ejercicio, repeticiones, series }]);
    }
  };

  const eliminarEjercicio = (id) => {
    setRutina(rutina.filter((e) => e.id !== id));
  };

  const actualizarEjercicio = (id, campo, valor) => {
    setRutina((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [campo]: valor } : e))
    );
  };

  const exportarPDF = () => {
    const doc = new jsPDF();
    doc.text("Mi Rutina Personalizada", 10, 10);
    rutina.forEach((ej, i) => {
      doc.text(
        `${i + 1}. ${ej.nombre} - ${ej.series}x${ej.repeticiones}`,
        10,
        20 + i * 10
      );
    });
    doc.save("mi_rutina.pdf");
  };

  const ejerciciosFiltrados = ejercicios.filter((e) => {
    return (
      e.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      (filtroNivel ? e.nivel === filtroNivel : true) &&
      (filtroCategoria ? e.categoria === filtroCategoria : true)
    );
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Crear Rutina</h1>

      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Ver Ejercicios
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[80vh] overflow-y-auto relative">
            <h2 className="text-xl font-semibold mb-4">
              Ejercicios Disponibles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={filtroNombre}
                onChange={(e) => setFiltroNombre(e.target.value)}
                className="border p-2 rounded"
              />
              <select
                value={filtroNivel}
                onChange={(e) => setFiltroNivel(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Todos los niveles</option>
                {niveles.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <select
                value={filtroCategoria}
                onChange={(e) => setFiltroCategoria(e.target.value)}
                className="border p-2 rounded"
              >
                <option value="">Todas las categorías</option>
                {categorias.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              {ejerciciosFiltrados.map((e) => (
                <li key={e.id} className="border p-3 rounded shadow text-black">
                  <p className="font-bold">{e.nombre}</p>
                  <p className="font-medium text-gray-400">{e.text}</p>
                  <p className="text-sm text-gray-600">
                    {e.nivel} - {e.categoria}
                  </p>
                  <button
                    onClick={() => agregarEjercicio(e)}
                    className="mt-2 text-blue-600 hover:underline"
                  >
                    Añadir
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-xl mb-2">Mi Rutina</h2>
        {rutina.length === 0 ? (
          <p>No has añadido ejercicios aún.</p>
        ) : (
          <ul className="space-y-2">
            {rutina.map((e) => (
              <li
                key={e.id}
                className="border p-2 rounded flex flex-col md:flex-row md:justify-between md:items-center gap-2"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-2 ">
                  <span className="font-medium">{e.nombre}</span>
                  <label>
                    Series:
                    <input
                      type="number"
                      min="1"
                      value={e.series}
                      onChange={(ev) =>
                        actualizarEjercicio(e.id, "series", ev.target.value)
                      }
                      className="ml-1 border px-2 py-1 rounded w-16 text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </label>
                  <label>
                    Reps:
                    <input
                      type="number"
                      min="1"
                      
                      value={e.repeticiones}
                      onChange={(ev) =>
                        actualizarEjercicio(
                          e.id,
                          "repeticiones",
                          ev.target.value
                        )
                      }
                      className="ml-1 border px-2 py-1 rounded w-16 text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </label>
                </div>
                <button
                  onClick={() => eliminarEjercicio(e.id)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={exportarPDF}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Exportar a PDF
      </button>
    </div>
  );
};

export default Rutinas;
