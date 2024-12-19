import { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function MantMeseros() {
  const [data, setData] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const manejarEliminar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const urlEliminar = `http://localhost:3000/api/mesero/eliminar/${id}`
      await axios.delete(urlEliminar, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      })
      cargarMeseros();
    } catch (err) {
      setError(err);
      console.log(error)
    }
  }

  const cargarMeseros = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("Token no encontrado");
      }
      const urlListar = "http://localhost:3000/api/mesero/listarMesero";
      const response = await axios.get(urlListar, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      setData(response.data);
      setCargando(false);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.mensaje || "Error al cargar los datos");
      setCargando(false);
    }
  };
  


  useEffect(() => {
    cargarMeseros()
  }, [])

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
                <div className="pull-right text-right" style={{ lineHeight: "14px" }}>
                  <small>Mantenimiento Meseros <span className="c-white"></span></small>
                </div>
                <div className="header-icon">
                  <i className="pe page-header-icon pe-7s-menu"></i>
                </div>
                <div className="header-title">
                  <h3>Mantenimiento Meseros</h3>
                  <small>Listado de meseros.</small>
                </div>
              </div>
              <hr />
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="panel panel-filled">
                <Link className="btn btn-success" to="/crearMesero">Crear</Link>
                <div className="panel-body">
                  <div className="table-responsive">
                    <table className="table table-hover table-striped">
                      <thead>
                        <tr>
                          <th>Nombre</th>
                          <th>Correo</th>
                          <th>Telefono</th>
                          <th>Estado</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((mesero) => {
                          return (
                            <tr key={mesero._id}>
                              <td>{mesero.nombre}</td>
                              <td>{mesero.correo}</td>
                              <td>{mesero.telefono}</td>
                              <td>{mesero.activo? "Activo" : "Inactivo"}</td>
                              <td>
                                <Link className="btn btn-warning" to={`/editarMesero/${mesero._id}`}>Editar</Link>
                                <button className="btn btn-danger" onClick={() => manejarEliminar(mesero._id)}>
                                  Eliminar
                                </button>
                              </td>
                            </tr>
                          )
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

export default MantMeseros