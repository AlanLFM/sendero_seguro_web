import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '../lib/firebase'

function Login({ onSwitchToRegister, onLoginSuccess }) {
  const [boleta, setBoleta] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const credential = boleta.trim()
    if (!credential) {
      setError('Ingresa tu boleta o correo institucional.')
      setLoading(false)
      return
    }

    try {
      const isEmail = credential.includes('@')
      const field = isEmail ? 'correo' : 'boleta'
      const usersRef = collection(db, 'usuarios')
      const q = query(usersRef, where(field, '==', credential), limit(1))
      const snapshot = await getDocs(q)

      if (snapshot.empty) {
        setError('Credenciales incorrectas o usuario no existe.')
        setLoading(false)
        return
      }

      const userData = snapshot.docs[0].data()
      if (userData.contrasena !== password) {
        setError('Credenciales incorrectas. Intenta de nuevo.')
        setLoading(false)
        return
      }

      onLoginSuccess({ boleta: userData.boleta, correo: userData.correo, nombre: userData.nombreCompleto })
      navigate('/dashboard')
    } catch (err) {
      setError('No se pudo iniciar sesion. Intenta de nuevo.')
      setLoading(false)
    }
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit}>
      <div className="field-group">
        <label className="field-label">Número de boleta o correo</label>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </span>
          <input
            type="text"
            className="input-field"
            placeholder="Ej: 2023630001"
            value={boleta}
            onChange={e => setBoleta(e.target.value)}
          />
        </div>
      </div>

      <div className="field-group">
        <div className="label-row">
          <label className="field-label" style={{marginBottom:0}}>Contraseña</label>
          <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
        </div>
        <div className="input-wrapper">
          <span className="input-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            type={showPass ? 'text' : 'password'}
            className={`input-field ${error ? 'error' : ''}`}
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{paddingRight: '38px'}}
          />
          <button
            type="button"
            onClick={() => setShowPass(v => !v)}
            style={{position:'absolute',right:'10px',background:'none',border:'none',cursor:'pointer',color:'var(--gray-400)',display:'flex',padding:'4px',transition:'color 0.2s'}}
          >
            {showPass ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                <line x1="1" y1="1" x2="23" y2="23"/>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="17" height="17">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
            )}
          </button>
        </div>
        {error && <div className="field-error">{error}</div>}
      </div>

      <label className="remember-label">
        <input
          type="checkbox"
          checked={remember}
          onChange={e => setRemember(e.target.checked)}
          className="remember-check"
        />
        <span>Recordar sesión en este dispositivo</span>
      </label>

      <button type="submit" className={`submit-btn ${loading ? 'loading' : ''}`} disabled={loading}>
        {loading ? <span className="spinner" /> : 'Iniciar Sesión'}
      </button>
    </form>
  )
}

export default Login
