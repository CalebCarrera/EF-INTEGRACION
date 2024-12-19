import 'react'
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';


function PaginaProtegida({children}) {
    const token = localStorage.getItem('token');
    if (!token) {
        return <Navigate to="/login"/>
    }
    return children;
}

PaginaProtegida.propTypes = {
    children: PropTypes.node.isRequired,
}

export default PaginaProtegida;