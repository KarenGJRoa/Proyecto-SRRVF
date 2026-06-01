import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="bg-light border-end" style={{ width: '250px', height: '100vh' }}>
      <div className="list-group list-group-flush">
        <Link to="/dashboard" className="list-group-item list-group-item-action py-3">Panel Principal</Link>
        <Link to="/create-order" className="list-group-item list-group-item-action py-3">Crear Orden</Link>
        <Link to="/tracking" className="list-group-item list-group-item-action py-3">Seguimiento de Envío</Link>
      </div>
    </div>
  );
};

export default Sidebar;
