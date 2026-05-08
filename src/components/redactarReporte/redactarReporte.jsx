import {
  Eye,
  User,
  Circle,
  Info,
  Lightbulb,
  MapPin,
  Camera,
} from "lucide-react";
import "./RedactarReporte.css";

const RedactarReporte = () => {
  return (
    <main className="report-main">
        <section className="report-header">
          <div>
            <p className="section-label">SEGURIDAD / COMUNIDAD</p>
            <h1>Redactar Reporte</h1>
            <p className="header-description">
              Tu reporte ayuda a construir un entorno más seguro para todos. La
              información proporcionada será validada por el comité de vigilancia.
            </p>
          </div>

          <div className="campus-status">
            <div>
              <strong>Estado del Campus</strong>
              <span>Zona Segura</span>
            </div>
            <div className="status-avatar"></div>
          </div>
        </section>

        <section className="report-layout">
          <form className="report-form-card">
            <div className="form-group">
              <label>Título del Incidente</label>
              <input
                type="text"
                placeholder="Ej: Luminaria fundida en estacionamiento sur"
              />
            </div>

            <div className="form-group">
              <label>Descripción del incidente</label>
              <textarea placeholder="Describe los hechos de la manera más detallada posible..." />
            </div>

            <div className="upload-box">
              <div className="upload-icon">
                <Camera size={22} />
              </div>
              <strong>Botón para adjuntar imagen/evidencia</strong>
              <span>PNG, JPG hasta 10MB</span>
            </div>

            <div className="form-actions">
              <button type="button" className="cancel-btn">
                Cancelar
              </button>

              <button type="submit" className="submit-btn">
                Enviar Reporte Oficial
              </button>
            </div>
          </form>

          <aside className="report-side">
            <div className="privacy-card">
              <div className="card-title">
                <Eye size={18} />
                <h2>Privacidad del Reporte</h2>
              </div>

              <label className="privacy-option selected">
                <input type="radio" name="privacy" defaultChecked />
                <div>
                  <strong>Publicar con mi nombre</strong>
                  <span>Visible para la comunidad ESCOM</span>
                </div>
              </label>

              <label className="privacy-option">
                <input type="radio" name="privacy" />
                <div>
                  <strong>Publicar de forma Anónima</strong>
                  <span>Tu identidad será cifrada por el sistema</span>
                </div>
              </label>

              <div className="privacy-warning">
                <Info size={14} />
                <p>
                  El anonimato protege tu identidad pero permite que las
                  autoridades te contacten por canal privado si requieren más
                  detalles.
                </p>
              </div>
            </div>

            <div className="tips-card">
              <div className="tips-title">
                <Lightbulb size={17} />
                <h2>Consejos de Seguridad</h2>
              </div>

              <ul>
                <li>Procura indicar puntos de referencia conocidos.</li>
                <li>Si hay un herido, utiliza el botón de EMERGENCIA SOS inmediatamente.</li>
                <li>Evita incluir datos personales de terceros sin su consentimiento.</li>
              </ul>
            </div>

            <div className="location-card">
              <div className="location-pin">
                <MapPin size={18} fill="white" />
              </div>

              <div>
                <strong>GEOLOCALIZACIÓN</strong>
                <span>ESCOM IPN, Ciudad de México</span>
              </div>
            </div>
          </aside>
        </section>
    </main>
  );
};

export default RedactarReporte;
