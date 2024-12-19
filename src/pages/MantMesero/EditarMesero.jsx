import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarMesero() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [telefono, setTelefono] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const consulta = async (id) => {
    if (id) {
      const token = localStorage.getItem('token');
      const urlConsulta = `http://localhost:3000/api/mesero/consultar/${id}`;
      try {
        const respuesta = await axios.get(urlConsulta, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        const datosMesero = respuesta.data;
        setNombre(datosMesero.nombre);
        setCorreo(datosMesero.correo);
        setTelefono(datosMesero.telefono);
        setLoading(false);
      } catch (error) {
        console.error("Error al consultar el mesero:", error);
        setError(true);
        setLoading(false);
      }
    } else {
      console.error("ID del mesero no encontrado");
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    consulta(id);
  }, [id]);

  const manejarActualizacion = async () => {
    try {
      const token = localStorage.getItem('token');
      const urlActualizar = `http://localhost:3000/api/mesero/actualizar/${id}`;
      const respuesta = await axios.put(urlActualizar, {
        nombre,
        correo,
        telefono,
      }, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (respuesta.status === 200) {
        console.log("Mesero actualizado exitosamente");
        navigate("/mesero");
      }
    } catch (error) {
      console.error("Error al actualizar el mesero:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  if (loading) return <div>Cargando datos...</div>;
  if (error) return <div>Error al cargar el mesero. Intenta de nuevo.</div>;

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Editar Mesero</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="Nombre" className="col-sm-2 control-label">Nombre</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Nombre" placeholder="Ingrese nombre" onChange={(e) => setNombre(e.target.value)} value={nombre} />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Correo" className="col-sm-2 control-label">Correo</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" id="Correo" placeholder="Ingrese correo" onChange={(e) => setCorreo(e.target.value)} value={correo} />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Telefono" className="col-sm-2 control-label">Teléfono</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Telefono" placeholder="Ingrese teléfono" onChange={(e) => setTelefono(e.target.value)} value={telefono} />
                  </div>
 </div>
                <br />
                <br />
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

export default EditarMesero;