# SSPR - Sistema de Seguimiento de Pedidos y Rutas

## Estructura del proyecto
- `backend/` - API REST con Node.js, Express y MongoDB
- `frontend/` - Interfaz con React y Vite

## Instalación local

### Backend
```bash
cd backend
npm install
cp .env.example .env   # editar con tus credenciales
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Usuarios de prueba
| Email | Contraseña | Rol |
|---|---|---|
| admin@sspr.com | admin123 | admin |
| supervisor@sspr.com | super123 | supervisor |
| conductor@sspr.com | conductor123 | conductor |
