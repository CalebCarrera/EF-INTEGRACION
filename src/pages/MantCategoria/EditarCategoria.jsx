import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditarCategoria() {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);  
    const navigate = useNavigate();
    const { id } = useParams();

    const consulta = async (id) => {
        if (id) {
            try {
                const urlConsulta = `http://localhost:3000/api/categoria/consultar/${id}`;
                const respuesta = await axios.get(urlConsulta);
                const datosCategoria = respuesta.data;
                setNombre(datosCategoria.nombre);
                setDescripcion(datosCategoria.descripcion);
                setLoading(false);
            } catch (error) {
                console.error("Error al consultar la categoria:", error);
                setError(true);
                setLoading(false);
            }
        } else {
            console.error("ID de la categoria no encontrado");
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        consulta(id);
    }, [id]);

    const manejarActualizacion = async () => {
        try {
            const urlActualizar = `http://localhost:3000/api/categoria/actualizar/${id}`;
            const respuesta = await axios.put(urlActualizar, {
                nombre,
                descripcion,
            });

            if (respuesta) {
                console.log("Categoria actualizada exitosamente");
                navigate("/categoria");
            }
        } catch (error) {
            console.error("Error al actualizar la categoria:", error);
            alert("Ocurrió un error al guardar los cambios.");
        }
    };

    if (loading) return <div>Cargando datos...</div>;
    if (error) return <div>Error al cargar la categoria. Intenta de nuevo.</div>;

    return (
        <section className="content">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-12">
                        <div className="panel panel-filled">
                            <h3 className="panel-heading">Editar Categoria</h3>
                            <div className="panel-body">
                                <div className="form-group">
                                    <label htmlFor="nombreCategoria" className="control-label">Nombre de la Categoria</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nombreCategoria"
                                        placeholder="Nombre de la categoria"
                                        onChange={(e) => setNombre(e.target.value)}
                                        value={nombre}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="descripcion" className="control-label">Descripcion</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="descripcion"
                                        placeholder="Descripcion"
                                        onChange={(e) => setDescripcion(e.target.value)}
                                        value={descripcion}
                                    />
                                </div>

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

export default EditarCategoria;