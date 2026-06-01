# SSPR API

Base local: `http://localhost:3000`

## Auth

### POST `/api/login`
Alias simple solicitado por la consigna.

Body:
```json
{
  "email": "admin@sspr.com",
  "password": "admin123"
}
```

### POST `/api/auth/login`
Mismo login usado por el frontend.

### GET `/api/auth/me`
Requiere header:
```text
Authorization: Bearer <token>
```

## Pedidos

Todos requieren JWT.

### GET `/api/orders`
Lista pedidos.

### POST `/api/orders`
Crea pedido.

Body:
```json
{
  "origen": "Lima",
  "destino": "Callao",
  "cliente": "Cliente Demo",
  "descripcion": "Pedido de prueba"
}
```

### GET `/api/orders/:id`
Obtiene un pedido por id.

### PUT `/api/orders/:id`
Actualiza un pedido completo.

### PATCH `/api/orders/:id/estado`
Actualiza solo el estado.

Body:
```json
{
  "estado": "En tránsito"
}
```

### DELETE `/api/orders/:id`
Elimina pedido. Requiere rol `admin`.

## Tracking

Todos requieren JWT.

### GET `/api/tracking`
Alias solicitado por la consigna para listar seguimiento de pedidos.

### GET `/api/tracking/:id`
Alias para consultar detalle de pedido.

## Repartidores

Todos requieren JWT.

### GET `/api/repartidores`
Lista repartidores.

### POST `/api/repartidores`
Crea repartidor. Requiere rol `admin` o `supervisor`.

Body:
```json
{
  "nombre": "Juan Perez",
  "telefono": "999888777",
  "placa": "ABC-123",
  "estado": "Disponible"
}
```
