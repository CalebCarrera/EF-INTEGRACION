import React, { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

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
    </aside>
  );
}

export default Navigation;
