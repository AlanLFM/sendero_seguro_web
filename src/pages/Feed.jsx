import {
  Search,
  Bell,
  SlidersHorizontal,
  Plus,
  ShieldCheck,
  MapPin,
  ThumbsUp,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "./Feed.css";

const reports = [
  {
    category: "ROBO",
    categoryClass: "danger",
    meta: "Reportado hace 15 minutos",
    title: "Asalto cerca de Entrada Peatonal (Av. Juan de Dios Bátiz)",
    location: "Peatonal Bátiz",
    useful: "Útil (12)",
  },
  {
    category: "ACOSO",
    categoryClass: "neutral",
    meta: "Hoy, 11:45 AM",
    title: "Sujeto sospechoso en pasillo de Laboratorios Pesados",
    location: "Edificio de Labs",
    useful: "Útil (45)",
  },
  {
    category: "INFRAESTRUCTURA",
    categoryClass: "safe",
    meta: "Ayer, 08:20 PM",
    title: "Luminaria fundida en el Sendero hacia el Metro",
    description:
      "El tramo entre el estacionamiento y el puente peatonal está completamente a...",
    location: "Sendero Metro",
    useful: "Útil (102)",
  },
];

const FeedComunitario = () => {
  return (
    <main className="feed-main">
      <header className="feed-topbar">
        <div className="search-box">
          <Search size={14} />
          <input type="text" placeholder="Buscar reportes..." />
        </div>

        <div className="topbar-actions">
          <button className="notification-btn">
            <Bell size={17} />
            <span></span>
          </button>

          <div className="feed-avatar">🎓</div>
        </div>
      </header>

      <section className="feed-content">
        <div className="feed-heading">
          <div>
            <h1>Feed Comunitario</h1>
            <p>
              Mantente informado sobre los últimos reportes de seguridad
              compartidos por la comunidad estudiantil de ESCOM.
            </p>
          </div>

          <div className="feed-actions">
            <button className="filter-btn">
              <SlidersHorizontal size={15} />
              Filtros
            </button>

            <button className="new-report-btn">
              <Plus size={16} />
              Nuevo Reporte
            </button>
          </div>
        </div>

        <div className="summary-grid">
          <article className="summary-card alert">
            <span>ALERTAS HOY</span>
            <div>
              <strong>03</strong>
              <small>↑ 12%</small>
            </div>
          </article>

          <article className="summary-card safe">
            <span>ZONAS SEGURAS</span>
            <div>
              <strong>88%</strong>
              <small>Capacidad</small>
            </div>
          </article>

          <article className="campus-card">
            <div>
              <span>ESTADO DEL CAMPUS</span>
              <h2>Circulación Regular</h2>
              <p>
                Sin incidentes críticos reportados en los senderos principales
                en las últimas 2 horas.
              </p>
            </div>

            <ShieldCheck size={82} />
          </article>
        </div>

        <div className="reports-list">
          {reports.map((report, index) => (
            <article className="community-report" key={index}>
              <div className="report-main-info">
                <div className="report-meta">
                  <span className={`report-category ${report.categoryClass}`}>
                    {report.category}
                  </span>
                  <small>{report.meta}</small>
                </div>

                <h2>{report.title}</h2>

                {report.description && <p>{report.description}</p>}
              </div>

              <aside className="report-location-panel">
                <span>UBICACIÓN</span>

                <div className="location-name">
                  <MapPin size={12} />
                  <strong>{report.location}</strong>
                </div>

                <div className="report-buttons">
                  <button>
                    <ThumbsUp size={13} />
                    {report.useful}
                  </button>

                  <button className="share-btn">
                    <Share2 size={14} />
                  </button>
                </div>
              </aside>
            </article>
          ))}
        </div>

        <div className="pagination">
          <button className="page-control">
            <ChevronLeft size={16} />
          </button>

          <button className="page-number active">1</button>
          <button className="page-number">2</button>
          <button className="page-number">3</button>

          <button className="page-control">
            <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default FeedComunitario;
