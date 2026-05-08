import React from "react";
import {
  Bell,
  MapPin,
  Wifi,
  Users,
  Layers,
  ShieldCheck,
  EyeOff,
} from "lucide-react";
import "./Inicio.css";

const Inicio = () => {
  return (
    <main className="main-content">
      {/* TOP BAR */}
      <header className="topbar">
        <div className="topbar-alert">
          <div className="bell-box">
            <Bell size={18} />
          </div>
          <div>
            <h2>Vigilancia en Tiempo Real</h2>
            <p>CAMPUS ZACATENCO · ESCOM</p>
          </div>
        </div>

        <div className="user-box">
          <div className="user-info">
            <strong>Estudiante IPN</strong>
            <span>2023600123</span>
          </div>
          <div className="avatar">🎓</div>
        </div>
      </header>

      {/* MAP AREA */}
      <section className="map-area">
        <div className="map-lines"></div>
        <div className="heat-layer"></div>

        {/* Marca de ubicación */}
        <div className="location-marker">
          <MapPin size={14} fill="currentColor" />
        </div>

        {/* SOS PANEL */}
        <div className="sos-card">
          <div className="sos-icon">
            <Wifi size={28} />
            <MapPin size={23} fill="white" />
          </div>

          <div className="sos-title">
            <span>SOS</span>
            <h2>EMITIR ALERTA DE AUXILIO</h2>
          </div>

          <p>
            Se enviará tu ubicación exacta a Seguridad y contactos de confianza
          </p>
        </div>

        {/* BOTTOM CARDS */}
        <div className="dashboard-cards">
          <article className="status-card">
            <div className="status-header">
              <div>
                <h3>Estado del</h3>
                <h3>Campus</h3>
              </div>

              <div className="safe-pill">
                <strong>NIVEL 1:</strong>
                <span>SEGURO</span>
              </div>
            </div>

            <div className="percentage-row">
              <strong>92%</strong>
              <span>Zonas bajo vigilancia activa</span>
            </div>

            <div className="progress-bar">
              <div className="progress-fill"></div>
            </div>
          </article>

          <article className="reports-card">
            <h3>Últimos Reportes</h3>

            <div className="report-item">
              <div className="report-icon danger">
                <EyeOff size={18} />
              </div>

              <div className="report-text">
                <strong>Falla de Alumbrado · Pasillo A</strong>
                <span>Hace 12 min · Reportado por @estudiante32</span>
              </div>

              <div className="report-dot"></div>
            </div>

            <div className="report-item">
              <div className="report-icon neutral">
                <ShieldCheck size={18} />
              </div>

              <div className="report-text">
                <strong>Patrullaje Preventivo</strong>
                <span>Hace 45 min · Zona de Estacionamiento</span>
              </div>
            </div>
          </article>

          <article className="community-card">
            <Users size={23} />
            <h3>Comunidad</h3>
            <p>USUARIOS ACTIVOS AHORA</p>
            <strong>1,248</strong>

            <button className="layers-btn">
              <Layers size={22} />
            </button>
          </article>
        </div>
      </section>
    </main>
  );
};

export default Inicio;
