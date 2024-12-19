import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

function CrearCategoria() {
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState(0)
    const navigate = useNavigate();

    const manejarCreacion = async () => {
        try {
            const urlCrear = "http://localhost:3000/api/categoria/crear"
            let respuesta = await axios.post(urlCrear, {
                nombre: nombre,
                descripcion: descripcion
            })

            if (respuesta.status === 201) {
                navigate("/categorias");
            }
        } catch (error){
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
                            <h3 className="panel-heading">Crear Categoria</h3>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="nombrePlatillo" className="col-sm-2 control-label">Nombre de la Categoria</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="nombre" placeholder="Nombre de la categoria" onChange={(e) => { setNombre(e.target.value) }} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <div className="form-group">
                                    <label htmlFor="precio" className="col-sm-2 control-label">Descripcion</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control" id="descripcion" placeholder="Descripcion" onChange={(e) => { setDescripcion(e.target.value) }} />
                                    </div>
                                </div>
                                <br />
                                <br />
                                <button type="button" className="btn btn-success" onClick={manejarCreacion}>
                                    Agregar Categoria
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CrearCategoria