import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CrearOrden() {
  const [mesaId, setMesaId] = useState('');
  const [listaPlatillos, setListaPlatillos] = useState([]);
  const [platillo, setPlatillo] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();

  const manejarListaPlatillos = () => {
    if (platillo && cantidad > 0) {
      const platilloExistente = listaPlatillos.find(p => p.nombre === platillo);
      
      if (platilloExistente) {
        setListaPlatillos(listaPlatillos.map(p => 
          p.nombre === platillo ? { ...p, cantidad: p.cantidad + cantidad } : p
        ));
      } else {
        setListaPlatillos([...listaPlatillos, { nombre: platillo, cantidad }]);
      }

      setPlatillo('');
      setCantidad(1);
    }
  }

  const manejarCreacion = async () => {
    if (!mesaId) {
      alert("Por favor, ingrese el número de mesa");
      return;
    }

    if (listaPlatillos.length === 0) {
      alert("Por favor, agregue al menos un platillo a la orden");
      return;
    }

    try {
      const urlCrear = `http://localhost:3000/api/orden/crear`;
      const respuesta = await axios.post(urlCrear, {
        mesaId,
        platillos: listaPlatillos,
      });

      if (respuesta.status === 201) {
        console.log("Orden creada exitosamente");
        navigate("/orden");
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Ocurrió un error al guardar los cambios.");
    }
  };

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Crear Orden</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="nroMesa" className="control-label">Nro de Mesa</label>
                  <input
                    type="number"
                    className="form-control"
                    id="nroMesa"
                    placeholder="Ingrese nro de mesa"
                    onChange={(e) => setMesaId(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Platillo" className="control-label">Platillo</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Platillo"
                    placeholder="Ingrese platillo"
                    onChange={(e) => setPlatillo(e.target.value)}
                    value={platillo}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="Cantidad" className="control-label">Cantidad</label>
                  <input
                    type="number"
                    className="form-control"
                    id="Cantidad"
                    placeholder="Ingrese cantidad"
                    onChange={(e) => setCantidad(e.target.value)}
                    value={cantidad}
                  />
                </div>

                <button type="button" className="btn btn-primary" onClick={manejarListaPlatillos}>
                  Agregar Platillo
                </button>

                {listaPlatillos.length > 0 && (
                  <div className="mt-3">
                    <h4>Orden:</h4>
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
                  onClick={manejarCreacion}
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

export default CrearOrden