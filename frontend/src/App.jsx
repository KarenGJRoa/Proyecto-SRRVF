// ============================================================
//  App.jsx  –  Rutas con control de acceso por rol
// ============================================================
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login       from "./pages/Login";
import Dashboard   from "./pages/Dashboard";
import CreateOrder from "./pages/CreateOrder";
import Tracking    from "./pages/Tracking";
import Repartor    from "./pages/Repartor";
import Rute        from "./pages/Rute";
import PrivateRoute from "./component/PrivateRoute";

// Ruta privada con control de rol
function RoleRoute({ children, roles }) {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!user.rol) return <Navigate to="/" replace />;
  if (!roles.includes(user.rol)) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Dashboard: todos los roles autenticados */}
        <Route path="/dashboard" element={
          <PrivateRoute><Dashboard /></PrivateRoute>
        } />

        {/* Crear pedido: solo admin y supervisor */}
        <Route path="/create-order" element={
          <PrivateRoute>
            <RoleRoute roles={["admin", "supervisor"]}>
              <CreateOrder />
            </RoleRoute>
          </PrivateRoute>
        } />

        {/* Tracking/Pedidos: todos los roles */}
        <Route path="/tracking" element={
          <PrivateRoute><Tracking /></PrivateRoute>
        } />

        {/* Repartidores: solo admin y supervisor */}
        <Route path="/repartor" element={
          <PrivateRoute>
            <RoleRoute roles={["admin", "supervisor"]}>
              <Repartor />
            </RoleRoute>
          </PrivateRoute>
        } />

        {/* Rutas: todos los roles */}
        <Route path="/rute" element={
          <PrivateRoute><Rute /></PrivateRoute>
        } />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
