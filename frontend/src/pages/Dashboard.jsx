// ============================================================
//  pages/Dashboard.jsx  –  Panel con estadísticas reales
// ============================================================
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const authHeader = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
});

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      padding: "24px 28px",
      boxShadow: "0 2px 12px rgba(0,0,0,.07)",
      borderLeft: `5px solid ${color}`,
      minWidth: 160,
      flex: 1,
    }}>
      <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color }}>{value}</div>
      <div style={{ fontSize: 13, color: "#888", marginTop: 4 }}>{label}</div>
    </div>
  );
}

function Dashboard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const rol  = user.rol || "conductor";

  const [stats, setStats] = useState({
    total: 0, pendiente: 0, enTransito: 0, entregado: 0, cancelado: 0, repartidores: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [ordersRes, repsRes] = await Promise.all([
          fetch(`${API_URL}/api/orders`, { headers: authHeader() }),
          fetch(`${API_URL}/api/repartidores`, { headers: authHeader() }),
        ]);
        const ordersData = await ordersRes.json();
        const repsData   = await repsRes.json();

        const orders = ordersData.orders || [];
        setStats({
          total:       orders.length,
          pendiente:   orders.filter(o => o.estado === "Pendiente").length,
          enTransito:  orders.filter(o => o.estado === "En tránsito").length,
          entregado:   orders.filter(o => o.estado === "Entregado").length,
          cancelado:   orders.filter(o => o.estado === "Cancelado").length,
          repartidores: (repsData.repartidores || []).length,
        });
      } catch (e) {
        console.error("Error cargando estadísticas", e);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <aside className="sidebar">
        <div className="sidebar-top">
          <ul className="sidebar-menu">
            <li className="active">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/>
                <rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>
              </svg>
              <Link to="/dashboard"><span>Dashboard</span></Link>
            </li>

            {/* Pedidos: admin y supervisor */}
            {(rol === "admin" || rol === "supervisor") && (
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
                  <path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>
                </svg>
                <Link to="/tracking"><span>Pedidos</span></Link>
              </li>
            )}

            {/* Tracking: todos los roles */}
            {rol === "conductor" && (
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/>
                  <path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/>
                </svg>
                <Link to="/tracking"><span>Mis Pedidos</span></Link>
              </li>
            )}

            {/* Repartidores: solo admin y supervisor */}
            {(rol === "admin" || rol === "supervisor") && (
              <li>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                  <path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                  <circle cx="9" cy="7" r="4"/>
                </svg>
                <Link to="/repartor"><span>Repartidores</span></Link>
              </li>
            )}

            {/* Rutas: todos */}
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="6" cy="19" r="3"/>
                <path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/>
                <circle cx="18" cy="5" r="3"/>
              </svg>
              <Link to="/rute"><span>Ruta</span></Link>
            </li>

            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
                <circle cx="12" cy="12" r="3"/>
              </svg>
              <span style={{ cursor: "pointer" }} onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.href = "/";
              }}>
                <span>Salir</span>
              </span>
            </li>
          </ul>
        </div>

        <div className="sidebar-user">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.925 20.056a6 6 0 0 0-11.851.001"/>
            <circle cx="12" cy="11" r="4"/><circle cx="12" cy="12" r="10"/>
          </svg>
          <div>
            <h6>{user.nombre || "Usuario"}</h6>
            <small style={{ color: "#aaa", textTransform: "capitalize" }}>{rol}</small>
          </div>
        </div>
      </aside>

      <main className="content">
        <div className="topbar">
          <h2>Dashboard</h2>
          <img className="top-logo" src={logo} alt="Logo" />
        </div>

        {/* Botón crear pedido solo para admin y supervisor */}
        {(rol === "admin" || rol === "supervisor") && (
          <div className="actions">
            <div className="actions-right">
              <button className="add-btn">
                <Link to="/create-order">+ Nuevo pedido</Link>
              </button>
            </div>
          </div>
        )}

        {/* Tarjetas de estadísticas */}
        {loading ? (
          <p style={{ padding: 24, color: "#888" }}>Cargando estadísticas...</p>
        ) : (
          <div style={{ padding: "24px", display: "flex", flexWrap: "wrap", gap: 16 }}>
            <StatCard label="Total pedidos"   value={stats.total}       color="#4d7df0" icon="📦" />
            <StatCard label="Pendientes"      value={stats.pendiente}   color="#f0a500" icon="🕐" />
            <StatCard label="En tránsito"     value={stats.enTransito}  color="#17a2b8" icon="🚛" />
            <StatCard label="Entregados"      value={stats.entregado}   color="#28a745" icon="✅" />
            <StatCard label="Cancelados"      value={stats.cancelado}   color="#dc3545" icon="❌" />
            {(rol === "admin" || rol === "supervisor") && (
              <StatCard label="Repartidores"  value={stats.repartidores} color="#6f42c1" icon="👤" />
            )}
          </div>
        )}

        {/* Barra de progreso visual por estado */}
        {!loading && stats.total > 0 && (
          <div style={{ padding: "0 24px 24px" }}>
            <h5 style={{ marginBottom: 12, color: "#444" }}>Distribución de pedidos</h5>
            <div style={{ background: "#eee", borderRadius: 8, height: 28, overflow: "hidden", display: "flex" }}>
              {stats.pendiente  > 0 && <div title="Pendientes"  style={{ width: `${(stats.pendiente  / stats.total)*100}%`, background: "#f0a500" }} />}
              {stats.enTransito > 0 && <div title="En tránsito" style={{ width: `${(stats.enTransito / stats.total)*100}%`, background: "#17a2b8" }} />}
              {stats.entregado  > 0 && <div title="Entregados"  style={{ width: `${(stats.entregado  / stats.total)*100}%`, background: "#28a745" }} />}
              {stats.cancelado  > 0 && <div title="Cancelados"  style={{ width: `${(stats.cancelado  / stats.total)*100}%`, background: "#dc3545" }} />}
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 8, fontSize: 12, color: "#666" }}>
              <span>🟡 Pendiente</span>
              <span>🔵 En tránsito</span>
              <span>🟢 Entregado</span>
              <span>🔴 Cancelado</span>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
