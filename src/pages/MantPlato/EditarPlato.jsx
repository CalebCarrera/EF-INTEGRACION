import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarPlatillo() {
  const [listaIngredientes, setListaIngredientes] = useState([]);
  const [ingrediente, setIngrediente] = useState('');
  const [precio, setPrecio] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [calorias, setCalorias] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);     
  const navigate = useNavigate();
  const { id } = useParams();

  const consulta = async (id) => {
    if (id) {
      const urlConsulta = `http://localhost:3000/api/plato/detalle/${id}`;
      try {
        const respuesta = await axios.get(urlConsulta);
        const datosPlatillo = respuesta.data;
        
        setNombre(datosPlatillo.nombre);
        setPrecio(datosPlatillo.precio);
        setListaIngredientes(datosPlatillo.ingredientes || []);
        
        setDescripcion(datosPlatillo.descripcion || '');
        setCalorias(datosPlatillo.calorias || '');
        
        setLoading(false);
      } catch (error) {
        console.error("Error al consultar el platillo:", error);
        setError(true);
        setLoading(false);
      }
    } else {
      console.error("ID del platillo no encontrado");
      setError(true);
      setLoading(false);
    }
  }

  useEffect(() => {
    consulta(id);
    console.log("ID recibido:", id);
  }, [id]);

  const manejarListaIngredientes = () => {
    if (ingrediente.trim() && !listaIngredientes.includes(ingrediente)) {
      setListaIngredientes([...listaIngredientes, ingrediente]);
      setIngrediente('');
    }
  };

  const manejarActualizacion = async () => {
    try {
      const urlActualizar = `http://localhost:3000/api/plato/actualizar/${id}`;
      const respuesta = await axios.put(urlActualizar, {
        nombre,
        ingredientes: listaIngredientes,
        precio,
        imagen: "default.jpg",
        descripcion,
        calorias
      });

      if (respuesta.status === 200) {
        navigate("/plato");
      }
    } catch (error) {
      console.error("Error al actualizar el platillo:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar el platillo. Intenta de nuevo.</div>;

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Editar Plato</h3>
              <div className="panel-body">
                {/* Campo para el nombre del platillo */}
                <div className="form-group">
                  <label htmlFor="nombrePlatillo" className="control-label">Nombre del Plato</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombrePlatillo"
                    placeholder="Nombre del platillo"
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                  />
                </div>

                {/* Campo para el precio del platillo */}
                <div className="form-group">
                  <label htmlFor="precio" className="control-label">Precio</label>
                  <input
                    type="number"
                    className="form-control"
                    id="precio"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(Number(e.target.value))}
                  />
                </div>

                {/* Campo para descripción */}
                <div className="form-group">
                  <label htmlFor="descripcion" className="control-label">Descripción</label>
                  <textarea
                    className="form-control"
                    id="descripcion"
                    placeholder="Descripción del platillo"
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={descripcion}
                  />
                </div>

                {/* Campo para calorías */}
                <div className="form-group">
                  <label htmlFor="calorias" className="control-label">Calorías</label>
                  <input
                    type="number"
                    className="form-control"
                    id="calorias"
                    placeholder="Calorías del platillo"
                    onChange={(e) => setCalorias(Number(e.target.value))}
                    value={calorias}
                  />
                </div>

                {/* Campo para agregar ingredientes */}
                <div className="form-group">
                  <label htmlFor="ingredientes" className="control-label">Ingredientes</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ingredientes"
                    placeholder="Ingrese ingrediente"
                    value={ingrediente}
                    onChange={(e) => setIngrediente(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={manejarListaIngredientes}
                >
                  Agregar Ingrediente
                </button>

                {/* Mostrar lista de ingredientes */}
                {listaIngredientes.length > 0 && (
                  <div className="mt-3">
                    <h4>Ingredientes:</h4>
                    <ul>
                      {listaIngredientes.map((ing, index) => (
                        <li key={index}>{ing}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Botón para guardar cambios */}
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={manejarActualizacion}
                >
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default EditarPlatillo;
