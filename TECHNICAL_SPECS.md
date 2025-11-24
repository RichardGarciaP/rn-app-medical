# Especificaciones Técnicas - Medical App Mobile

## 📋 Información General

- **Nombre del Proyecto:** Medical App Mobile
- **Versión:** 1.0.0
- **Tipo:** Aplicación móvil multiplataforma
- **Plataformas:** Android, iOS, Web
- **Fecha de Creación:** Noviembre 2024

## 🛠️ Stack Tecnológico

### Framework Principal

- **React Native** `0.81.5` - Framework para desarrollo de aplicaciones móviles nativas
- **Expo** `~54.0.25` - Plataforma para desarrollo y despliegue de aplicaciones React Native
- **Expo Router** `~6.0.15` - Sistema de navegación basado en archivos (file-based routing)

### Lenguaje de Programación

- **TypeScript** `^5.9.3` - Superset de JavaScript con tipado estático
- **React** `19.1.0` - Biblioteca para construir interfaces de usuario

### Librerías y Dependencias Core

#### Navegación y Routing

- **Expo Router** `~6.0.15` - Navegación basada en archivos, similar a Next.js
- **Expo Linking** `~8.0.9` - Deep linking y manejo de URLs
- **React Native Screens** `~4.16.0` - Optimización de navegación nativa
- **React Native Safe Area Context** `~5.6.0` - Manejo de áreas seguras en dispositivos

#### Gestión de Estado

- **React Context API** - Estado global para autenticación
- **Custom Hooks** - Lógica de negocio reutilizable

#### Comunicación con API

- **Axios** `^1.13.2` - Cliente HTTP para peticiones REST
- **Interceptores** - Manejo automático de tokens y errores

#### Almacenamiento Local

- **AsyncStorage** `^2.2.0` - Persistencia de datos en dispositivo (tokens, sesiones)

#### UI Components

- **React Native Picker** `^2.11.1` - Selector de opciones nativo
- **DateTimePicker** `^8.4.4` - Selector de fecha y hora nativo
- **Expo Status Bar** `~3.0.8` - Control de barra de estado
- **Expo Constants** `~18.0.10` - Acceso a constantes del sistema

## 🏗️ Arquitectura del Proyecto

### Estructura de Carpetas

```
medical-app-mobile/
├── app/                          # Expo Router - Navegación basada en archivos
│   ├── _layout.tsx              # Layout raíz con providers
│   ├── index.tsx                # Página de inicio con redirección
│   ├── login.tsx                # Pantalla de login
│   ├── register.tsx             # Pantalla de registro
│   ├── patient/                 # Rutas de pacientes
│   │   ├── _layout.tsx         # Layout de stack para pacientes
│   │   ├── home.tsx            # Dashboard del paciente
│   │   └── new-appointment.tsx # Crear nueva cita
│   └── doctor/                  # Rutas de doctores
│       └── home.tsx             # Dashboard del doctor
│
├── src/
│   ├── components/              # Componentes reutilizables de UI
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Input.tsx
│   │   ├── Loading.tsx
│   │   └── index.ts
│   │
│   ├── constants/               # Constantes y configuración
│   │   ├── theme.ts            # Colores, espaciados, fuentes, sombras
│   │   ├── routes.ts           # Rutas de navegación
│   │   ├── validation.ts       # Reglas de validación
│   │   └── index.ts
│   │
│   ├── context/                 # Context API
│   │   └── AuthContext.tsx     # Autenticación y estado de usuario
│   │
│   ├── hooks/                   # Custom Hooks
│   │   ├── useAppointments.ts  # Gestión de citas médicas
│   │   ├── useForm.ts          # Manejo de formularios
│   │   ├── useDoctors.ts       # Lista de doctores
│   │   └── index.ts
│   │
│   ├── screens/                 # Pantallas de la aplicación
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── PatientHomeScreen.tsx
│   │   ├── NewAppointmentScreen.tsx
│   │   └── DoctorHomeScreen.tsx
│   │
│   ├── services/                # Servicios de API
│   │   ├── api.ts              # Cliente Axios configurado
│   │   ├── authService.ts      # Servicios de autenticación
│   │   ├── appointmentService.ts
│   │   └── config.ts           # Configuración de API URLs
│   │
│   ├── types/                   # TypeScript types e interfaces
│   │   └── index.ts
│   │
│   └── utils/                   # Utilidades y helpers
│       ├── validation.ts        # Validaciones de formularios
│       ├── appointmentValidation.ts
│       ├── dateHelpers.ts      # Helpers para manejo de fechas
│       └── index.ts
│
├── assets/                      # Recursos estáticos
├── App.tsx                      # Punto de entrada (retorna null con Expo Router)
├── app.json                     # Configuración de Expo
├── tsconfig.json                # Configuración de TypeScript
├── package.json                 # Dependencias y scripts
└── ARCHITECTURE.md              # Documentación de arquitectura
```

## 🔧 Configuración del Proyecto

### Entry Point

```json
{
  "main": "expo-router/entry"
}
```

El proyecto usa Expo Router como punto de entrada, eliminando la necesidad de configurar manualmente la navegación.

### TypeScript Configuration

- **Strict Mode:** Activado
- **Target:** ES2020
- **JSX:** React
- **Type Checking:** Estricto con inferencia de tipos

### API Configuration

- **Base URL:** Configurable por entorno
- **Timeout:** 30 segundos
- **Retry Attempts:** 3
- **Interceptores:**
  - Request: Inyección automática de JWT tokens
  - Response: Manejo de errores de autenticación

## 🎨 Patrones de Diseño Implementados

### 1. Custom Hooks Pattern

Lógica de negocio encapsulada en hooks reutilizables:

- `useAppointments` - CRUD de citas médicas
- `useForm` - Manejo de formularios con validación
- `useDoctors` - Gestión de lista de doctores

### 2. Service Layer Pattern

Capa de abstracción para comunicación con API:

- Servicios especializados por feature
- Interceptores para manejo transversal
- Tipado completo con TypeScript

### 3. Context API + Hooks

- Estado global con Context API
- Custom hooks para acceso a contexto
- Providers anidados en layout raíz

### 4. File-based Routing

- Navegación automática basada en estructura de archivos
- Layouts anidados para diferentes tipos de usuarios
- Type-safe navigation con Expo Router

### 5. Barrel Exports Pattern

- Exports centralizados con `index.ts`
- Importaciones limpias y organizadas
- Mejor tree-shaking

### 6. Constants Pattern

- Valores inmutables centralizados
- Theme consistency
- Reglas de validación reutilizables

## 📱 Características Implementadas

### Autenticación

- Login con email/password
- Registro de usuarios (Pacientes y Doctores)
- Persistencia de sesión con AsyncStorage
- Auto-logout en caso de token expirado
- Redirección automática basada en rol

### Gestión de Citas (Pacientes)

- Visualización de citas programadas
- Creación de nuevas citas médicas
- Cancelación de citas
- Selección de doctor
- Selección de fecha y hora con validaciones:
  - Horario laboral (8 AM - 6 PM)
  - Días laborales (Lunes a Viernes)
  - Mínimo 1 hora de anticipación
  - Máximo 3 meses de anticipación
- Toast notifications en Android
- Pull-to-refresh
- Auto-actualización al crear cita

### Gestión de Citas (Doctores)

- Visualización de citas programadas
- Listado ordenado por fecha
- Información de pacientes

### UI/UX

- Componentes reutilizables y consistentes
- Loading states
- Error handling con mensajes amigables
- Validación en tiempo real de formularios
- Indicadores visuales de estado
- Diseño responsive

## 🔒 Seguridad

### Implementaciones de Seguridad

- **JWT Tokens:** Autenticación basada en tokens (preparado para implementación)
- **HTTPS:** Comunicación segura con el backend
- **Validación de Inputs:** Sanitización de datos de usuario
- **AsyncStorage Encryption:** Datos sensibles en dispositivo
- **Error Handling:** Sin exposición de información sensible

### Validaciones Implementadas

- Email format validation
- Password strength (mínimo 6 caracteres)
- Input sanitization
- Business rules validation

## 🧪 Estrategia de Testing (Preparado)

### Estructura para Tests

```
src/
├── __tests__/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── utils/
```

### Herramientas Sugeridas

- **Jest:** Unit testing
- **React Native Testing Library:** Component testing
- **MSW:** Mock Service Worker para API mocking

## 🚀 Scripts Disponibles

```bash
npm start          # Inicia Expo Dev Server
npm run android    # Ejecuta en emulador Android
npm run ios        # Ejecuta en simulador iOS
npm run web        # Ejecuta en navegador web
```

## 📦 Build y Deployment

### Compilación para Producción

```bash
# Android
eas build --platform android

# iOS
eas build --platform ios

# Ambas plataformas
eas build --platform all
```

### Entornos

- **Development:** Expo Go
- **Preview:** EAS Build (APK/IPA)
- **Production:** App Store / Play Store

## 🔄 Flujo de Datos

### Autenticación

```
Usuario → LoginScreen → authService.login()
→ API → AuthContext.signIn()
→ AsyncStorage (persistencia)
→ Auto-redirección basada en rol
```

### Gestión de Citas

```
Usuario → NewAppointmentScreen → useForm (validación)
→ appointmentService.createAppointment()
→ API → Toast notification
→ Router.replace() → PatientHomeScreen (auto-refresh)
```

## 🎯 Mejores Prácticas Aplicadas

✅ **TypeScript First** - Type safety en toda la aplicación
✅ **Component Composition** - Componentes pequeños y reutilizables
✅ **Custom Hooks** - Lógica separada de UI
✅ **Error Boundaries** - Manejo robusto de errores
✅ **Code Splitting** - Navegación lazy-loaded
✅ **Consistent Naming** - Convenciones claras
✅ **Barrel Exports** - Imports organizados
✅ **Constants Centralization** - Valores inmutables
✅ **Responsive Design** - Adaptable a diferentes pantallas
✅ **Accessibility Ready** - Preparado para mejoras de accesibilidad

## 🔮 Roadmap de Mejoras Sugeridas

### Corto Plazo

- [ ] Implementar JWT refresh tokens
- [ ] Agregar tests unitarios e integración
- [ ] Implementar error boundary components
- [ ] Agregar modo offline con sincronización
- [ ] Push notifications

### Mediano Plazo

- [ ] Multi-idioma (i18n)
- [ ] Modo oscuro
- [ ] Analytics e tracking
- [ ] Caché de imágenes
- [ ] Optimistic UI updates

### Largo Plazo

- [ ] Chat en tiempo real (Socket.io)
- [ ] Videollamadas (WebRTC)
- [ ] Historial médico digital
- [ ] Integración con wearables
- [ ] IA para recomendaciones

## 📊 Performance

### Optimizaciones Implementadas

- Lazy loading de pantallas
- Memoización de componentes
- Optimistic updates
- Debouncing en búsquedas
- Image optimization con Expo

### Métricas Objetivo

- Time to Interactive: < 3s
- Bundle size: < 5MB
- FPS: 60fps constantes
- Memory usage: < 100MB

## 🔍 Debugging y Monitoreo

### Herramientas Disponibles

- **Expo Dev Tools** - Debugging en desarrollo
- **React DevTools** - Inspección de componentes
- **Flipper** - Debugging avanzado
- **Console Logs** - Logging estratégico

### Logs Implementados

- API request/response
- Navigation changes
- User actions
- Error tracking

## 📝 Convenciones de Código

### Naming Conventions

- **Components:** PascalCase (e.g., `LoginScreen.tsx`)
- **Hooks:** camelCase con prefijo "use" (e.g., `useAppointments.ts`)
- **Utils:** camelCase (e.g., `validateEmail`)
- **Constants:** SCREAMING_SNAKE_CASE (e.g., `API_URL`)
- **Types:** PascalCase (e.g., `User`, `Appointment`)

### File Organization

- Un componente por archivo
- Exports nombrados para utilities
- Default export para componentes y screens
- Index files para barrel exports

## 🤝 Integración con Backend

### API Endpoints Consumidos

- `POST /v1/api/user/sign-up` - Registro
- `POST /v1/api/user/sign-in` - Login
- `GET /v1/api/user/doctors` - Lista de doctores
- `POST /v1/api/appointments` - Crear cita
- `GET /v1/api/appointments/patient/{id}` - Citas de paciente
- `GET /v1/api/appointments/doctor/{id}` - Citas de doctor
- `PATCH /v1/api/appointments/{id}/cancel` - Cancelar cita

### Formato de Datos

- **Request:** JSON con Content-Type: application/json
- **Response:** JSON con estructura consistente
- **Dates:** ISO 8601 format
- **Errors:** Estructura estandarizada con mensajes

## 📄 Licencia y Derechos

- **Tipo:** Privado
- **Autor:** Medical App Team
- **Año:** 2024

---

**Última actualización:** Noviembre 2024
**Versión de documento:** 1.0.0
