import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

//vendor styles
import "../assets/vendor/fontawesome/css/font-awesome.css";
import "../assets/vendor/animate.css/animate.css";
import "../assets/vendor/bootstrap/css/bootstrap.css";

//app styles
import "../assets/styles/pe-icons/pe-icon-7-stroke.css";
import "../assets/styles/pe-icons/helper.css";
import "../assets/styles/stroke-icons/style.css";
import "../assets/styles/style.css";

//scripts
import "../assets/vendor/pacejs/pace.min.js";
import "../assets/vendor/jquery/dist/jquery.min.js";
import "../assets/vendor/bootstrap/js/bootstrap.min.js";

function Login() {
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const manejarLogin = async () => {
    try {
      const urlLogin = "http://localhost:3000/api/mesero/login";
      const respuesta = await axios.post(urlLogin, {
        correo: correo,
        password: contraseña,
      });

      if (respuesta.status === 200) {
        localStorage.setItem("token", respuesta.data.token);
        navigate("/plato");
      }
    } catch (error) {
      console.log("Error:", error);
      alert("Datos incorrectos");
    }
  };
  return (
    <div className="wrapper flex items-center justify-center min-h-screen">
      {/* <!-- Main content--> */}
      <section className="content" id="contentCorrecion" style={{margin: "0"}}>
        <div className="container-center animated slideInDown">
          <div className="view-header">
            <div className="header-icon">
              <i className="pe page-header-icon pe-7s-unlock"></i>
            </div>
            <div className="header-title">
              <h3>Login</h3>
              <small>
                Por favor ingrese sus credenciales para continuar.
              </small>
            </div>
          </div>
  
          <div className="panel panel-filled">
            <div className="panel-body">
              <div className="form-group">
                <label className="control-label" htmlFor="username">
                  Correo
                </label>
                <input
                  type="text"
                  placeholder="ejemplo@gmail.com"
                  required=""
                  name="username"
                  id="username"
                  className="form-control"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <span className="help-block small">
                  Ingrese su correo electrónico
                </span>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="password">
                  Contraseña
                </label>
                <input
                  type="password"
                  placeholder="******"
                  required=""
                  name="password"
                  id="password"
                  className="form-control"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                />
                <span className="help-block small">
                  Ingrese su contraseña
                </span>
              </div>
              <div className="flex justify-between">
                <button className="btn btn-accent" onClick={manejarLogin}>
                  Ingresar
                </button>
                <Link className="btn btn-default" to="/crearCuenta">
                  Crear Cuenta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- End main content--> */}
    </div>
  );  
}
export default Login;
