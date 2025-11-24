# 📱 Medical App Mobile - React Native (Expo)

Aplicación móvil para el sistema de gestión de citas médicas, desarrollada con **React Native** y **Expo**.

## 🚀 Características

### Para Pacientes

- ✅ Registro y login
- ✅ Ver listado de citas médicas
- ✅ Agendar nuevas citas con doctores
- ✅ Cancelar citas existentes
- ✅ Ver detalles de cada cita

### Para Doctores

- ✅ Login
- ✅ Ver todas las citas agendadas
- ✅ Estadísticas de citas activas y canceladas
- ✅ Información de pacientes

## 🛠️ Tecnologías

- **React Native** 0.81
- **Expo** SDK 52
- **TypeScript** (con strict mode)
- **React Navigation** v6
- **Axios** para comunicación con API
- **AsyncStorage** para persistencia local
- **Context API** para manejo de estado
- **Jest** + **React Native Testing Library** para testing

## 🆕 Mejoras Recientes (Nov 2025)

### ✅ TypeScript Strict Mode

- Validación estricta de tipos habilitada
- Mayor seguridad y detección temprana de errores
- Mejor experiencia de desarrollo con autocompletado

### ✅ Variables de Entorno

- Configuración dinámica multi-entorno
- Detección automática de plataforma
- Fácil cambio entre desarrollo/producción

### ✅ Validaciones Completas

- Validación de fechas futuras (+1 hora mínimo)
- Horario laboral (8 AM - 6 PM)
- Solo días laborables (Lun-Vie)
- Máximo 3 meses de anticipación
- Mensajes de error específicos

### ✅ Framework de Testing

- Jest configurado
- Tests unitarios implementados
- Cobertura de código disponible
- Scripts npm para testing

## 📦 Instalación

### Prerrequisitos

- Node.js >= 20.9.0
- npm o yarn
- Expo CLI (opcional, pero recomendado)

### Pasos

1. **Clonar el repositorio** (si aplica)

   ```bash
   git clone <tu-repo>
   cd medical-app-mobile
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   ```

3. **Configurar la URL del backend**

   Edita el archivo `src/services/api.ts` y cambia la URL del backend:

   ```typescript
   // Para desarrollo local
   const API_URL = 'http://localhost:8080/v1/api';

   // Para dispositivo físico, usa tu IP local
   const API_URL = 'http://192.168.1.XXX:8080/v1/api';

   // Para emulador Android
   const API_URL = 'http://10.0.2.2:8080/v1/api';
   ```

4. **Iniciar el backend**

   Asegúrate de que el backend Spring Boot esté corriendo en `localhost:8080`

   ```bash
   cd ../medical-booking-backend
   ./gradlew bootRun
   ```

5. **Iniciar la aplicación**

   ```bash
   npm start
   ```

   O directamente:

   ```bash
   # iOS
   npm run ios

   # Android
   npm run android

   # Web
   npm run web
   ```

## 📱 Probando la Aplicación

### 1. Registro de Usuario

Puedes registrarte como **Paciente** o **Doctor**:

- **Paciente**: Puede ver, crear y cancelar citas
- **Doctor**: Puede ver todas las citas agendadas con él

### 2. Login

Usa las credenciales creadas durante el registro.

### 3. Usuarios de Prueba

Si ya tienes usuarios en el backend, puedes usar:

```
Email: doctor@test.com
Password: password123
Role: DOCTOR

Email: patient@test.com
Password: password123
Role: PATIENT
```

## 📂 Estructura del Proyecto

```
medical-app-mobile/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Loading.tsx
│   │   └── ErrorMessage.tsx
│   │
│   ├── context/              # Context API
│   │   └── AuthContext.tsx   # Autenticación global
│   │
│   ├── navigation/           # React Navigation
│   │   └── AppNavigator.tsx  # Configuración de rutas
│   │
│   ├── screens/              # Pantallas de la app
│   │   ├── LoginScreen.tsx
│   │   ├── RegisterScreen.tsx
│   │   ├── PatientHomeScreen.tsx
│   │   ├── NewAppointmentScreen.tsx
│   │   └── DoctorHomeScreen.tsx
│   │
│   ├── services/             # Servicios API
│   │   ├── api.ts            # Cliente Axios
│   │   ├── authService.ts    # Endpoints de autenticación
│   │   └── appointmentService.ts
│   │
│   └── types/                # TypeScript types
│       └── index.ts
│
├── App.tsx                   # Punto de entrada
├── package.json
├── tsconfig.json
└── README.md
```

## 🔐 Autenticación

La app utiliza **JWT (JSON Web Tokens)** para autenticación:

1. Al hacer login, se recibe un token del backend
2. El token se guarda en AsyncStorage
3. Todas las peticiones subsiguientes incluyen el token en el header `Authorization`
4. El token expira en 24 horas

## 🌐 Endpoints Utilizados

### Autenticación

- `POST /v1/api/user/sign-up` - Registro
- `POST /v1/api/user/sign-in` - Login

### Citas Médicas (Requieren autenticación)

- `GET /v1/api/appointments/patient/{id}` - Listar citas de paciente
- `POST /v1/api/appointments` - Crear cita
- `PATCH /v1/api/appointments/{id}/cancel` - Cancelar cita

## 📱 Pantallas

### LoginScreen

- Formulario de login con validación
- Navegación a registro
- Guarda el token y usuario en AsyncStorage

### RegisterScreen

- Formulario de registro
- Selección de rol (Paciente/Doctor)
- Validación de contraseñas
- Login automático después del registro

### PatientHomeScreen

- Lista de citas del paciente
- Pull to refresh
- Botón para crear nueva cita
- Botón para cancelar citas

### NewAppointmentScreen

- Selección de doctor
- Selección de fecha y hora
- Resumen antes de confirmar
- Validaciones

### DoctorHomeScreen

- Lista de citas del doctor
- Estadísticas de citas
- Pull to refresh

## 🎨 Diseño

- **Colores principales:**

  - Primary: `#007AFF` (Azul iOS)
  - Secondary: `#5856D6` (Púrpura)
  - Danger: `#FF3B30` (Rojo)
  - Background: `#f5f5f5` (Gris claro)

- **Componentes:**
  - Cards con sombras
  - Botones con estados (loading, disabled)
  - Inputs con validación visual
  - Badges de estado (Activa/Cancelada)

## 🔧 Configuración Adicional

### Cambiar Puerto del Backend

Edita `src/services/api.ts`:

```typescript
const API_URL = 'http://localhost:PUERTO/v1/api';
```

### Agregar Nuevos Endpoints

1. Define el tipo en `src/types/index.ts`
2. Crea la función en el servicio correspondiente
3. Usa el servicio en el screen

Ejemplo:

```typescript
// src/services/appointmentService.ts
export const appointmentService = {
  updateAppointment: async (id: number, data: any) => {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  },
};
```

## 🐛 Troubleshooting

### El backend no responde

1. Verifica que el backend esté corriendo:

   ```bash
   curl http://localhost:8080/v1/api/user/sign-in
   ```

2. Si usas dispositivo físico, asegúrate de usar tu IP local en lugar de `localhost`

3. Verifica que no haya firewall bloqueando el puerto 8080

### Error de CORS

Si ves errores de CORS, verifica que el backend tenga CORS habilitado para tu IP.

En `SecurityConfig.java`:

```java
config.setAllowedOriginPatterns(List.of("http://192.168.*.*:*"));
```

### Token expirado

El token JWT expira en 24 horas. Si ves error 401, cierra sesión y vuelve a iniciar.

### Error al crear cita

Verifica que:

1. El doctor seleccionado exista en el backend
2. El usuario esté autenticado
3. La fecha sea futura
4. No haya otra cita para ese doctor a esa hora

## 📝 Próximas Mejoras

- [ ] Notificaciones push
- [ ] Recordatorios de citas
- [ ] Chat entre doctor y paciente
- [ ] Historial médico
- [ ] Recetas médicas
- [ ] Búsqueda de doctores por especialidad
- [ ] Calificación de doctores
- [ ] Dark mode

## 👨‍💻 Desarrollo

### Scripts Disponibles

```bash
npm start          # Inicia Expo Dev Server
npm run android    # Inicia en emulador Android
npm run ios        # Inicia en simulador iOS
npm run web        # Inicia en navegador web
```

### Agregar Nueva Pantalla

1. Crea el archivo en `src/screens/`
2. Agrégalo al navegador en `src/navigation/AppNavigator.tsx`
3. Navega usando `navigation.navigate('ScreenName')`

### Agregar Nuevo Componente

1. Crea el archivo en `src/components/`
2. Exporta el componente
3. Impórtalo donde lo necesites

## 📄 Licencia

Este proyecto es de uso educativo.

## 🙏 Créditos

- Backend: Spring Boot + MySQL
- Frontend: React Native + Expo
- Diseño: iOS Human Interface Guidelines

---

**¡Listo para usar! 🎉**

Para cualquier duda, revisa la documentación del backend en `../medical-booking-backend/README.md`
