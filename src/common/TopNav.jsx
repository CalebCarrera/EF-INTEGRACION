import 'react';
import { useNavigate } from 'react-router-dom';

// Vendor styles
import '../assets/vendor/fontawesome/css/font-awesome.css';
import '../assets/vendor/animate.css/animate.css';
import '../assets/vendor/bootstrap/css/bootstrap.css';

// App styles
import '../assets/styles/pe-icons/pe-icon-7-stroke.css';
import '../assets/styles/pe-icons/helper.css';
import '../assets/styles/stroke-icons/style.css';
import '../assets/styles/style.css';

// Scripts
import '../assets/vendor/pacejs/pace.min.js';
import '../assets/vendor/jquery/dist/jquery.min.js';
import '../assets/vendor/bootstrap/js/bootstrap.min.js';

// Luna scripts
import '../assets/scripts/luna.js';

function TopNav() {
    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem('token');

        localStorage.removeItem('user');

        navigate('/login');
    };

    return (
        <nav className="navbar navbar-default navbar-fixed-top">
            <div className="container-fluid">
                <div className="navbar-header">
                    <div id="mobile-menu">
                        <div className="left-nav-toggle">
                            <a>
                                <i className="stroke-hamburgermenu"></i>
                            </a>
                        </div>
                    </div>
                    <a className="navbar-brand">
                        Tagliatore
                        <span>v.1.0</span>
                    </a>
                </div>
                <div id="navbar" className="navbar-collapse collapse">
                    <ul className="nav navbar-nav navbar-right">
                        <li>
                            <button 
                                className="btn btn-danger navbar-btn" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </li>
                    </ul>
                    <div className="left-nav-toggle">
                        <a>
                            <i className="stroke-hamburgermenu"></i>
                        </a>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default TopNav;
