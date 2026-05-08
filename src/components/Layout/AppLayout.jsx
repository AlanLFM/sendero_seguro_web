import { Outlet } from 'react-router-dom'
import Sidebar from '../sidebar/sidebar'

const AppLayout = ({ onLogout }) => {
  return (
    <div className="sendero-page">
      <Sidebar onLogout={onLogout} />
      <Outlet />
    </div>
  )
}

export default AppLayout
