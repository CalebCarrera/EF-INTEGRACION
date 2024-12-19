import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <aside className="navigation">
      <nav>
        <ul className="nav luna-nav">
          <li className="nav-category">Main</li>
          <li>
            <a
              href="#!"
              onClick={toggleCollapse}
              aria-expanded={isCollapsed}
            >
              Mantenimientos
              <span className="sub-nav-icon">
                <i className="stroke-arrow"></i>
              </span>
            </a>
            <ul className={`nav nav-second ${isCollapsed ? "show" : "collapse"}`}>
              <li><Link to="/plato">Platos</Link></li>
              <li><Link to="/cliente">Clientes</Link></li>
              <li><Link to="/orden">Ordenes</Link></li>
              <li><Link to="/categoria">Categorias</Link></li>
              <li><Link to="/mesero">Meseros</Link></li>
              <li><Link to="/chat">Chat</Link></li>
            </ul>
          </li>
        </ul>
      </nav>
      <button 
        className="btn btn-danger navbar-btn" 
        onClick={handleLogout}
      >
        Logout
      </button>
    </aside>
  );
}

export default Navigation;
