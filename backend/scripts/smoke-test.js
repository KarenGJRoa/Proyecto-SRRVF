const BASE_URL = process.env.API_URL || "http://localhost:3000";

const request = async (path, options = {}) => {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`${options.method || "GET"} ${path} -> ${res.status}: ${JSON.stringify(data)}`);
  }
  return data;
};

const run = async () => {
  const login = await request("/api/login", {
    method: "POST",
    body: JSON.stringify({ email: "admin@sspr.com", password: "admin123" }),
  });

  const auth = { Authorization: `Bearer ${login.token}` };

  const created = await request("/api/orders", {
    method: "POST",
    headers: auth,
    body: JSON.stringify({
      origen: "Lima",
      destino: "Callao",
      cliente: "Cliente Smoke Test",
      descripcion: "Pedido creado por prueba automatizada",
    }),
  });

  const orders = await request("/api/orders", { headers: auth });
  const tracking = await request("/api/tracking", { headers: auth });

  console.log(JSON.stringify({
    ok: true,
    login: login.user.email,
    createdOrderId: created.order.id,
    ordersTotal: orders.total,
    trackingTotal: tracking.total,
  }, null, 2));
};

run().catch((err) => {
  console.error(err.stack || err.message);
  process.exit(1);
});
