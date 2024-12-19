import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function CrearCuenta() {
  const [nombre, setNombres] = useState("")
  const [telefono, setTelefono] = useState("")
  const [correo, setCorreo] = useState("")
  const [contraseña, setContraseña] = useState("")

  const manejarCreacion = async () => {
    try {
      const urlCrear = "http://localhost:3000/api/mesero/crear"
      const respuesta = await axios.post(urlCrear, {
        nombre: nombre,
        telefono: telefono,
        correo: correo,
        password: contraseña
      })

      if (respuesta.status == 200) {

        alert("Creacion correcta")
      } else {
        alert("Fallo la creacion")
      }

    } catch (error) {
      console.log("Error:" + error)
      alert("ERROR")
    }
  }
  return (
    //nombres, apellidos, direccion, dni, edad, correo, password
    <div className="wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
    {/* <!-- Main content--> */}
    <section className="content" id="contentCorrecion">
      <div className="container-center lg animated slideInDown" style={{ margin: '0', maxWidth: '600px', width: '100%' }}>
        <div className="view-header">
          <div className="header-icon">
            <i className="pe page-header-icon pe-7s-add-user"></i>
          </div>
          <div className="header-title">
            <h3>Crear Cuenta</h3>
            <small>Por favor ingresa la información necesaria.</small>
          </div>
        </div>
  
        <div className="panel panel-filled">
          <div className="panel-body">
            <p></p>
            <div className="row">
              <div className="form-group col-lg-6">
                <label>Nombre</label>
                <input type="text" id="email" className="form-control" onChange={(e) => setNombres(e.target.value)} />
                <span className="help-block small">Ingrese sus nombres</span>
              </div>
              <div className="form-group col-lg-6">
                <label>Telefono</label>
                <input type="text" id="email" className="form-control" onChange={(e) => setTelefono(e.target.value)} />
                <span className="help-block small">Ingrese su telefono</span>
              </div>
              <div className="form-group col-lg-12">
                <label>Correo</label>
                <input type="text" id="username" className="form-control" onChange={(e) => setCorreo(e.target.value)} />
                <span className="help-block small">Ingrese su correo electronico</span>
              </div>
              <div className="form-group col-lg-12">
                <label>Contraseña</label>
                <input type="password" id="password" className="form-control" onChange={(e) => setContraseña(e.target.value)} />
                <span className="help-block small">Ingrese una contraseña</span>
              </div>
            </div>
            <div>
              <Link className="btn btn-accent" onClick={manejarCreacion} to="/login">Registrar</Link>
              <Link className="btn btn-default" to="/login">Regresar al Login</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* <!-- End main content--> */}
  </div>
  
  )
}

export default CrearCuenta