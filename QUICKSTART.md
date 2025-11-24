# 🚀 Guía de Inicio Rápido

## Configuración en 5 Pasos

### 1️⃣ Instalar Dependencias

```bash
npm install
```

### 2️⃣ Configurar URL del Backend

Abre `src/services/api.ts` y configura la URL:

```typescript
// Para iOS Simulator o Android Emulator
const API_URL = 'http://localhost:8080/v1/api';

// Para dispositivo físico (usa tu IP local)
const API_URL = 'http://192.168.1.XXX:8080/v1/api';
```

**¿Cómo obtener tu IP local?**

**macOS/Linux:**

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**Windows:**

```bash
ipconfig
```

### 3️⃣ Iniciar el Backend

```bash
cd ../medical-booking-backend
./gradlew bootRun
```

Verifica que esté corriendo en: http://localhost:8080

### 4️⃣ Iniciar la App

```bash
npm start
```

### 5️⃣ Ejecutar en Dispositivo

- **Presiona `i`** para iOS Simulator
- **Presiona `a`** para Android Emulator
- **Escanea el QR** con Expo Go en tu teléfono

---

## ⚠️ Problemas Comunes

### "Network Error" al hacer login

**Solución:**

1. Verifica que el backend esté corriendo
2. Si usas dispositivo físico, cambia `localhost` por tu IP local en `api.ts`
3. Asegúrate de estar en la misma red WiFi

### Backend no responde

**Verifica:**

```bash
curl http://localhost:8080/v1/api/user/sign-in
```

Debe responder con error 400 o 401 (es normal sin credenciales)

### No aparecen doctores al crear cita

**Solución:**

1. Registra al menos un usuario con rol DOCTOR
2. O usa los datos mock que ya están en el código

---

## 📱 Usuarios de Prueba

Puedes crear usuarios desde la app o usar estos (si existen en el backend):

**Doctor:**

```
Email: doctor@test.com
Password: password123
```

**Paciente:**

```
Email: patient@test.com
Password: password123
```

---

## 🎯 Flujo de Prueba Completo

1. **Registrarse como Doctor**

   - Nombre: Dr. Juan García
   - Email: doctor@test.com
   - Password: password123
   - Rol: DOCTOR

2. **Cerrar sesión**

3. **Registrarse como Paciente**

   - Nombre: María López
   - Email: patient@test.com
   - Password: password123
   - Rol: PATIENT

4. **Crear una cita**

   - Selecciona doctor: Dr. Juan García
   - Elige fecha y hora
   - Confirmar

5. **Ver la cita creada** en el dashboard

6. **Cancelar la cita** (opcional)

7. **Cerrar sesión e iniciar como Doctor**
   - Ver la cita en el dashboard del doctor

---

## 🔄 Actualizar la App

Si haces cambios en el código:

1. La app se recargará automáticamente
2. Si no, presiona `r` en la terminal de Expo
3. O sacude el dispositivo y presiona "Reload"

---

## 📞 ¿Necesitas Ayuda?

1. Revisa el `README.md` completo
2. Revisa la consola de Expo para ver errores
3. Verifica los logs del backend

---

**¡Listo! Ahora puedes empezar a usar la app 🎉**
