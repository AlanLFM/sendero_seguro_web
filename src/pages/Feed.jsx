import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  ShieldCheck,
  MapPin,
  ThumbsUp,
  Share2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
  Timestamp,
} from "firebase/firestore";
import { db } from "../lib/firebase";
import Topbar from "../components/Topbar/Topbar";
import "./Feed.css";

const PAGE_SIZE = 5;

const categoryStyles = {
  robo: "danger",
  acoso: "neutral",
  persona_sospechosa: "danger",
  infraestructura: "safe",
  emergencia_medica: "danger",
  violencia_agresion: "danger",
  accidente: "neutral",
  objeto_sospechoso: "danger",
  riesgo_ambiental: "safe",
  transporte_movilidad: "neutral",
  seguridad_preventiva: "safe",
  otro: "neutral",
};

const FeedComunitario = () => {
  const [reportes, setReportes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [indexWarning, setIndexWarning] = useState("");
  const [alertsToday, setAlertsToday] = useState(0);
  const [safePercent, setSafePercent] = useState(88);
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [pageCursors, setPageCursors] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const fetchPage = async (cursor, targetPage) => {
    setLoading(true);
    setError("");
    setIndexWarning("");

    try {
      const baseQuery = [
        collection(db, "reportes"),
        where("estado", "==", "pendiente"),
        orderBy("updatedAt", "desc"),
        limit(PAGE_SIZE),
      ];

      if (cursor) {
        baseQuery.push(startAfter(cursor));
      }

      const q = query(...baseQuery);
      const snapshot = await getDocs(q);
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setReportes(docs);
      setHasMore(snapshot.docs.length === PAGE_SIZE);
      setPage(targetPage);
      if (snapshot.docs.length > 0) {
        setPageCursors((prev) => {
          const next = [...prev];
          next[targetPage - 1] = snapshot.docs[snapshot.docs.length - 1];
          return next;
        });
      }
    } catch (err) {
      const code = err?.code || "";
      if (code.includes("failed-precondition")) {
        setIndexWarning(
          "Se requiere un indice compuesto para filtrar por estado. Mostrando pendientes con filtro local."
        );

        try {
          const fallbackQuery = [
            collection(db, "reportes"),
            orderBy("updatedAt", "desc"),
            limit(PAGE_SIZE),
          ];

          if (cursor) {
            fallbackQuery.push(startAfter(cursor));
          }

          const qFallback = query(...fallbackQuery);
          const snapshotFallback = await getDocs(qFallback);
          const docsFallback = snapshotFallback.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter((doc) => doc.estado === "pendiente");

          setReportes(docsFallback);
          setHasMore(snapshotFallback.docs.length === PAGE_SIZE);
          setPage(targetPage);
          if (snapshotFallback.docs.length > 0) {
            setPageCursors((prev) => {
              const next = [...prev];
              next[targetPage - 1] = snapshotFallback.docs[snapshotFallback.docs.length - 1];
              return next;
            });
          }
        } catch (fallbackErr) {
          setError("No se pudieron cargar los reportes.");
        }
        return;
      }

      setError("No se pudieron cargar los reportes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(null, 1);
  }, []);

  useEffect(() => {
    const loadSummary = async () => {
      try {
        const start = new Date();
        start.setHours(0, 0, 0, 0);
        const q = query(
          collection(db, "reportes"),
          where("createdAt", ">=", Timestamp.fromDate(start)),
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(q);
        const todays = snapshot.docs
          .map((doc) => doc.data())
          .filter((doc) => doc.estado === "pendiente");
        const total = todays.length;
        setAlertsToday(total);
        setSafePercent(Math.max(0, 100 - total * 5));
      } catch {
        setAlertsToday(0);
        setSafePercent(88);
      }
    };

    loadSummary();
  }, []);

  const formatTime = (timestamp, fallback) => {
    const ref = timestamp?.toDate ? timestamp : fallback;
    if (!ref?.toDate) return "";
    const date = ref.toDate();
    const diffMs = Date.now() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "Hace un momento";
    if (diffMin < 60) return `Hace ${diffMin} min`;
    const diffH = Math.floor(diffMin / 60);
    if (diffH < 24) return `Hace ${diffH} h`;
    return date.toLocaleDateString("es-MX", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const filteredReports = useMemo(() => {
    return reportes.filter((report) => {
      const matchesSearch = report.titulo
        ?.toLowerCase()
        .includes(searchValue.toLowerCase());
      const matchesCategory = filterValue ? report.categoria === filterValue : true;
      return matchesSearch && matchesCategory;
    });
  }, [reportes, searchValue, filterValue]);

  const campusStatus = useMemo(() => {
    if (alertsToday <= 2) {
      return {
        title: "Circulacion Normal",
        description: "Sin incidentes criticos reportados en las ultimas horas.",
      };
    }
    if (alertsToday <= 5) {
      return {
        title: "Precaucion",
        description: "Se detectaron reportes recientes. Mantente alerta.",
      };
    }
    return {
      title: "Alerta Activa",
      description: "Alta actividad de reportes. Evita zonas de riesgo.",
    };
  }, [alertsToday]);

  const handleNext = async () => {
    if (!hasMore || loading) return;
    const cursor = pageCursors[page - 1];
    await fetchPage(cursor, page + 1);
  };

  const handlePrev = async () => {
    if (page === 1 || loading) return;
    const cursor = page > 2 ? pageCursors[page - 3] : null;
    await fetchPage(cursor, page - 1);
  };

  return (
    <main className="feed-main">
      <Topbar
        showSearch
        showFilters
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filterValue={filterValue}
        onFilterChange={setFilterValue}
      />

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
            <button className="new-report-btn" onClick={() => navigate("/redactar-reporte")}>
              <Plus size={16} />
              Nuevo Reporte
            </button>
          </div>
        </div>

        <div className="summary-grid">
          <article className="summary-card alert">
            <span>ALERTAS HOY</span>
            <div>
              <strong>{String(alertsToday).padStart(2, "0")}</strong>
              <small>Pendientes</small>
            </div>
          </article>

          <article className="summary-card safe">
            <span>ZONAS SEGURAS</span>
            <div>
              <strong>{safePercent}%</strong>
              <small>Capacidad</small>
            </div>
          </article>

          <article className="campus-card">
            <div>
              <span>ESTADO DEL CAMPUS</span>
              <h2>{campusStatus.title}</h2>
              <p>{campusStatus.description}</p>
            </div>

            <ShieldCheck size={82} />
          </article>
        </div>

        {error && <div className="feed-error">{error}</div>}
        {indexWarning && <div className="feed-warning">{indexWarning}</div>}
        {loading && <div className="feed-loading">Cargando reportes...</div>}

        {!loading && filteredReports.length === 0 && (
          <div className="feed-empty">No hay reportes pendientes.</div>
        )}

        <div className="reports-list">
          {filteredReports.map((report) => (
            <article className="community-report" key={report.id}>
              <div className="report-main-info">
                <div className="report-meta">
                  <span
                    className={`report-category ${categoryStyles[report.categoria] || "neutral"}`}
                  >
                    {(report.categoria || "otro").replace(/_/g, " ").toUpperCase()}
                  </span>
                  <small>{formatTime(report.createdAt, report.updatedAt)}</small>
                </div>

                <h2>{report.titulo}</h2>
                {report.descripcion && <p>{report.descripcion}</p>}
              </div>

              <aside className="report-location-panel">
                <span>UBICACION</span>

                <div className="location-name">
                  <MapPin size={12} />
                  <strong>{report.ubicacionTexto}</strong>
                </div>

                {report.evidenciaUrl && (
                  <div className="report-thumb">
                    <img src={report.evidenciaUrl} alt="Evidencia" />
                  </div>
                )}

                <div className="report-buttons">
                  <button>
                    <ThumbsUp size={13} />
                    Util ({report.utiles || 0})
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
          <button className="page-control" onClick={handlePrev} disabled={page === 1 || loading}>
            <ChevronLeft size={16} />
          </button>

          <button className="page-number active">{page}</button>

          <button className="page-control" onClick={handleNext} disabled={!hasMore || loading}>
            <ChevronRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
};

export default FeedComunitario;
