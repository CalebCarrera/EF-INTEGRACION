import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function CrearCliente() {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [telefono, setTelefono] = useState(0)
    const [dni, setDni] = useState(0)
    const navigate = useNavigate();

    const manejarCreacion = async () => {
        try {
            const urlCrear = "http://localhost:3000/api/cliente/crear"
            let respuesta = await axios.post(urlCrear, {
                nombre: nombre,
                email: email,
                telefono: telefono,
                dni: dni,
            })

            if (respuesta.status === 201) {
                navigate("/cliente");
            }
        } catch (error) {
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
                            <h3 className="panel-heading">Crear Cliente</h3>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="nombreCliente" className="col-sm-2 control-label">Nombres</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="nombreCliente" placeholder="Ingrese nombres del cliente" onChange={(e) => { setNombre(e.target.value) }} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="form-group">
                                    <label htmlFor="Email" className="col-sm-2 control-label">Email</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="Email" placeholder="Ingrese email" onChange={(e) => { setEmail(e.target.value) }} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="form-group">
                                    <label htmlFor="Celular" className="col-sm-2 control-label">Celular</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="Celular" placeholder="Celular" onChange={(e) => { setTelefono(e.target.value) }} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="form-group">
                                    <label htmlFor="Dni" className="col-sm-2 control-label">Dni</label>
                                    <div className="col-sm-10">
                                        <input type="number" className="form-control" id="Dni" placeholder="Ingrese Dni" onChange={(e) => { setDni(e.target.value) }} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <button type="button" className="btn btn-success" onClick={manejarCreacion}>
                                    Agregar Cliente
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CrearCliente