const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        {/* Logo y Nombre */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img src="/vite.svg" alt="Logo" width="30" height="24" className="d-inline-block align-text-top me-2" />
          Sistema SRR
        </a>

        {/* Botón de Cerrar Sesión a la derecha */}
        <div className="d-flex">
          <button className="btn btn-outline-danger btn-sm" type="button">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
