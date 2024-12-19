import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CrearPlatillo() {
  const [listaIngredientes, setListaIngredientes] = useState([]);
  const [ingrediente, setIngrediente] = useState('');
  const [precio, setPrecio] = useState('');
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [calorias, setCalorias] = useState('');
  const navigate = useNavigate();

  const manejarListaIngredientes = () => {
    if (ingrediente.trim() && !listaIngredientes.includes(ingrediente)) {
      setListaIngredientes([...listaIngredientes, ingrediente]);
      setIngrediente('');
    }
  };

  const manejarCreacion = async () => {
    try {
      const urlCrear = "http://localhost:3000/api/plato/crear";
      const respuesta = await axios.post(urlCrear, {
        nombre,
        ingredientes: listaIngredientes,
        precio,
        imagen: "default.jpg",
        descripcion, 
        calorias      
      });
  
      setIngrediente('');
      setListaIngredientes([]);
      setNombre('');
      setPrecio('');
      setDescripcion('');
      setCalorias('');
  
      if (respuesta.status === 201) {
        navigate("/plato");
      }
    } catch (error) {
      console.error("Error al crear el platillo:", error);
      alert("Ocurrió un error al guardar los datos");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Crear Plato</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="nombrePlatillo" className="col-sm-2 control-label">Nombre del Plato</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="nombrePlatillo"
                      placeholder="Nombre del platillo"
                      onChange={(e) => setNombre(e.target.value)}
                      value={nombre}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="precio" className="col-sm-2 control-label">Precio</label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="precio"
                      placeholder="Precio"
                      value={precio || ''}
                      onChange={(e) => setPrecio(Number(e.target.value))}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="descripcion" className="col-sm-2 control-label">Descripción</label>
                  <div className="col-sm-10">
                    <textarea
                      className="form-control"
                      id="descripcion"
                      placeholder="Descripción del platillo"
                      onChange={(e) => setDescripcion(e.target.value)}
                      value={descripcion}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="calorias" className="col-sm-2 control-label">Calorías</label>
                  <div className="col-sm-10">
                    <input
                      type="number"
                      className="form-control"
                      id="calorias"
                      placeholder="Calorías del platillo"
                      onChange={(e) => setCalorias(Number(e.target.value))}
                      value={calorias}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="ingredientes" className="col-sm-2 control-label">Ingredientes</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="ingredientes"
                      placeholder="Ingrese ingrediente"
                      value={ingrediente}
                      onChange={(e) => setIngrediente(e.target.value)}
                    />
                  </div>
                </div>
                <button type="button" className="btn btn-primary" onClick={manejarListaIngredientes}>
                  Agregar Ingrediente
                </button>
                <br />
                <br />
                {listaIngredientes.length > 0 && (
                  <div>
                    <h4>Ingredientes:</h4>
                    {listaIngredientes.map((ing, index) => (
                      <p key={index}>{ing}</p>
                    ))}
                  </div>
                )}
                <button type="button" className="btn btn-success" onClick={manejarCreacion}>
                  Agregar Plato
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CrearPlatillo;
