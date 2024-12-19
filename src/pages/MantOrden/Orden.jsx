import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

function MantOrdenes() {
  const [data, setData] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const manejarEliminar = async (id) => {
    try {
      const urlEliminar = `http://localhost:3000/api/orden/eliminar/${id}`
      await axios.delete(urlEliminar)
      cargarOrdenes()
    } catch (err) {
      setError(err)
      alert("Error al eliminar la orden");
    }
  };

  const cargarOrdenes = async () => {
    try {
      const urlListar = "http://localhost:3000/api/orden/listarOrden";
      const response = await axios.get(urlListar);
      setData(response.data);
      setCargando(false);
    } catch (err) {
      setError(err);
      setCargando(false);
      alert("Error al cargar las órdenes");
    }
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const cargarTabla = () => {
    if (cargando) {
      return <div>Cargando...</div>;
    }
    if (error) {
      return <div>Error al cargar los datos: {error.message}</div>;
    }
    return (
      <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="view-header">
              <div className="header-icon">
                <i className="pe page-header-icon pe-7s-menu"></i>
              </div>
              <div className="header-title">
                <h3>Mantenimiento Orden</h3>
                <small>Listado de ordenes</small>
              </div>
            </div>
            <hr />
          </div>
        </div>
    
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <Link className="btn btn-success mb-3" to="/crearOrden">
                Crear
              </Link>
              <div className="panel-body">
                <div className="table-responsive">
                  <table className="table table-hover table-bordered table-striped table-sm">
                    <thead className="thead-dark">
                      <tr>
                        <th>Mesa</th>
                        <th>Platillos</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((orden) => {
                        return (
                          <tr key={orden._id}>
                            <td>{orden.mesaId}</td>
                            <td>
                              {orden.platillos.map((platillo, index) => (
                                <div key={index}>
                                  {platillo.nombre} - Cantidad: {platillo.cantidad}
                                </div>
                              ))}
                            </td>
                            <td>{orden.estado}</td>
                            <td>
                              <div className="btn-group">
                                <Link
                                  className="btn btn-warning btn-sm"
                                  to={`/editarOrden/${orden._id}`}
                                >
                                  Editar
                                </Link>
                                <button
                                  className="btn btn-danger btn-sm ml-2"
                                  onClick={() => manejarEliminar(orden._id)}
                                >
                                  Eliminar
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    )
  }

  return (
    <div className="wrapper">
      {cargarTabla()}
    </div>
  );
}

export default MantOrdenes