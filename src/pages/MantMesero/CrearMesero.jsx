import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CrearMesero() {
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [password, setPassword] = useState('')
  const [telefono, setTelefono] = useState('')
  const navigate = useNavigate();

  const manejarCreacion = async ()=>{
    try{
      const urlCrear = "http://localhost:3000/api/mesero/crear"
      let respuesta = await axios.post(urlCrear,{
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        password: password,
      })
  
      if (respuesta.status === 200) {
        navigate("/mesero");
      }
    }catch(error){
      console.log("Error:", error);
      alert("Datos incorrectos");
    }
  }

  return (
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="panel panel-filled">
              <h3 className="panel-heading">Crear Mesero</h3>
              <div className="panel-body">
                <div className="form-group">
                  <label htmlFor="Nombres" className="col-sm-2 control-label">Nombre</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Nombres" placeholder="Ingrese nombres" onChange={(e)=>{setNombre(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Nombres" className="col-sm-2 control-label">Telefono</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="Nombres" placeholder="Ingrese nombres" onChange={(e)=>{setTelefono(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Correo" className="col-sm-2 control-label">Correo</label>
                  <div className="col-sm-10">
                    <input type="Correo" className="form-control" id="nombrePlatillo" placeholder="Ingrese Correo" onChange={(e)=>{setCorreo(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <div className="form-group">
                  <label htmlFor="Nombres" className="col-sm-2 control-label">Contraseña</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="nombrePlatillo" placeholder="Ingrese contraseña" onChange={(e)=>{setPassword(e.target.value)}}/>
                  </div>
                </div>
                <br />
                <br />
                <button type="button" className="btn btn-success" onClick={manejarCreacion}>
                  Agregar Mesero
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CrearMesero