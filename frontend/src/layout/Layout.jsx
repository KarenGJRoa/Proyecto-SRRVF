// src/layout/Layout.jsx
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid p-0 vh-100 d-flex flex-column">
      {/* NAVBAR: Con logo y cerrar sesión como pidieron */}
      <nav className="navbar navbar-dark bg-dark px-4 shadow">
        <span className="navbar-brand mb-0 h1">Sistema SRR</span>
        <button className="btn btn-outline-danger btn-sm">Cerrar Sesión</button>
      </nav>

      <div className="d-flex flex-grow-1 overflow-hidden">
        {/* SIDEBAR: Menú lateral profesional */}
        <aside className="bg-light border-end shadow-sm" style={{ width: "260px" }}>
          <Sidebar />
        </aside>

        {/* CONTENIDO: Donde cargan tus formularios y el Dashboard */}
        <main className="flex-grow-1 p-4 bg-white overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
