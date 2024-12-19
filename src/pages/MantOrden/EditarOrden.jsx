import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarOrden() {
  const [orden, setOrden] = useState(null);
  const [mesaId, setMesaId] = useState(0);
  const [estado, setEstado] = useState("");
  const [listaPlatillos, setListaPlatillos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const consulta = async (id) => {
    if (!id) {
        setError("No se proporcionó un ID de orden");
        setLoading(false);
        return;
    }

    try {
        const URL = `http://localhost:3000/api/orden/detalle/${id}`;
        const respuesta = await axios.get(URL);
        const datosOrden = respuesta.data;

        if (!datosOrden) {
            throw new Error('No se recibieron datos de la orden');
        }

        setOrden(datosOrden);
        setMesaId(datosOrden.mesaId || 0);
        setEstado(datosOrden.estado || "pendiente");
        setListaPlatillos(datosOrden.platillos || []);
        setLoading(false);
    } catch (error) {
        if (error.response) {
            setError(`Error del servidor: ${error.response.status}`);
        } else if (error.request) {
            setError("No se pudo conectar con el servidor");
        } else {
            setError(`Error de solicitud: ${error.message}`);
        }
        setLoading(false);
    }
};

  useEffect(() => {
    consulta(id);
  }, [id]);

  const manejarActualizacion = async (id) => {
    try {
        const urlActualizar = `http://localhost:3000/api/orden/actualizar/${id}`;
        const payload = { estado }; 
        const respuesta = await axios.put(urlActualizar, payload);

        if (respuesta.status === 200) {
            navigate("/orden");
        }
    } catch (error) {
        if (error.response) {
            alert(`Error al actualizar: ${error.response.data.mensaje}`);
        } else if (error.request) {
            alert("No se pudo conectar con el servidor");
        } else {
            alert(`Error: ${error.message}`);
        }
    }
  };


  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Editar Orden</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="nroMesa" className="control-label">Numero de Mesa</label>
                  <input
                    type="number"
                    className="form-control"
                    id="nroMesa"
                    value={mesaId}
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Estado" className="control-label">Estado</label>
                  <select
                    className="form-control"
                    id="Estado"
                    onChange={(e) => setEstado(e.target.value)}
                    value={estado}
                  >
                    <option>pendiente</option>
                    <option>entregado</option>
                    <option>cancelado</option>
                  </select>
                </div>

                {listaPlatillos.length > 0 && (
                  <div className="mt-3">
                    <h4>Platillos en Orden:</h4>
                    <ul>
                      {listaPlatillos.map((platillo, index) => (
                        <li key={index}>{platillo.nombre} - {platillo.cantidad}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={() => manejarActualizacion(orden._id)}
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

export default EditarOrden;