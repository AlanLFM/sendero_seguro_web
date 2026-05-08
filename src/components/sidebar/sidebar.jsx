import { NavLink } from "react-router-dom";
import {
  Shield,
  Map,
  MessageSquare,
  FileText,
  BarChart3,
  LogOut,
  Cross,
} from "lucide-react";
import "./Sidebar.css";

const Sidebar = ({ onLogout }) => {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">
          <div>
            <h1>Sendero<br />Seguro</h1>
          </div>
        </div>

        <p className="brand-subtitle">PROTECCIÓN ACADÉMICA</p>

        <nav className="sidebar-menu">
          <NavLink to="/dashboard" className="sidebar-link">
            <Map size={17} />
            <span>Inicio/Mapa de Calor</span>
          </NavLink>

          <NavLink to="/feed" className="sidebar-link">
            <MessageSquare size={17} />
            <span>Feed Comunitario</span>
          </NavLink>

          <NavLink to="/redactar-reporte" className="sidebar-link">
            <FileText size={17} />
            <span>Redactar Reporte</span>
          </NavLink>

          <NavLink to="/estadisticas" className="sidebar-link">
            <BarChart3 size={17} />
            <span>Estadísticas (Admin)</span>
          </NavLink>
        </nav>
      </div>

      <div className="sidebar-footer">
        <button className="sos-button">
          <Cross size={15} />
          EMERGENCIA SOS
        </button>

        <button className="logout-button" onClick={onLogout}>
          <LogOut size={16} />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
