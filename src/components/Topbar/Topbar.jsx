import { useMemo } from 'react'
import { Bell, Search } from 'lucide-react'
import './Topbar.css'

const Topbar = ({
  showSearch = false,
  searchValue = '',
  onSearchChange,
  showFilters = false,
  filterValue = '',
  onFilterChange,
}) => {
  const usuario = useMemo(() => {
    const saved = localStorage.getItem('sendero_user')
    return saved ? JSON.parse(saved) : {}
  }, [])

  const inicial = (
    usuario?.nombre?.[0] ||
    usuario?.nombreCompleto?.[0] ||
    usuario?.correo?.[0] ||
    'U'
  ).toUpperCase()

  return (
    <header className="topbar">
      <div className="topbar-left">
        {showSearch && (
          <div className="search-box">
            <Search size={14} />
            <input
              type="text"
              placeholder="Buscar reportes..."
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
            />
          </div>
        )}

        {showFilters && (
          <select
            className="filter-select"
            value={filterValue}
            onChange={(e) => onFilterChange?.(e.target.value)}
          >
            <option value="">Todas las categorias</option>
            <option value="robo">Robo</option>
            <option value="acoso">Acoso</option>
            <option value="persona_sospechosa">Persona sospechosa</option>
            <option value="infraestructura">Infraestructura</option>
            <option value="emergencia_medica">Emergencia medica</option>
            <option value="violencia_agresion">Violencia o agresion</option>
            <option value="accidente">Accidente</option>
            <option value="objeto_sospechoso">Objeto sospechoso</option>
            <option value="riesgo_ambiental">Riesgo ambiental</option>
            <option value="transporte_movilidad">Transporte o movilidad</option>
            <option value="seguridad_preventiva">Seguridad preventiva</option>
            <option value="otro">Otro</option>
          </select>
        )}
      </div>

      <div className="topbar-actions">
        <button className="notification-btn" type="button">
          <Bell size={17} />
          <span></span>
        </button>

        <div className="feed-avatar">{inicial}</div>
      </div>
    </header>
  )
}

export default Topbar
