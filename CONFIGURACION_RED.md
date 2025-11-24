# 🌐 Guía de Configuración de Red

## ❓ ¿Por qué necesito configurar la URL?

La aplicación móvil necesita comunicarse con el backend. La URL que uses depende de **dónde estés ejecutando la app**.

---

## 📱 Opciones de Configuración

### 1️⃣ iOS Simulator (Mac)

✅ **Usar:** `http://localhost:8080/v1/api`

```typescript
// src/services/config.ts
export const API_URL = 'http://localhost:8080/v1/api';
```

**Razón:** El simulador de iOS comparte la red con tu Mac.

---

### 2️⃣ Android Emulator

✅ **Usar:** `http://10.0.2.2:8080/v1/api`

```typescript
// src/services/config.ts
export const API_URL = 'http://10.0.2.2:8080/v1/api';
```

**Razón:** `10.0.2.2` es la IP especial del emulador de Android que apunta a `localhost` de tu computadora.

---

### 3️⃣ Dispositivo Físico (iPhone/Android Real)

✅ **Usar:** `http://TU-IP-LOCAL:8080/v1/api`

**Paso 1: Obtén tu IP local**

**En Mac/Linux:**

```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

**En Windows:**

```bash
ipconfig
```

Busca algo como: `192.168.1.100` o `192.168.0.50`

**Paso 2: Configura la URL**

```typescript
// src/services/config.ts
export const API_URL = 'http://192.168.1.100:8080/v1/api';
```

**Paso 3: Verifica conectividad**

Desde tu teléfono, abre el navegador y visita:

```
http://192.168.1.100:8080
```

Deberías ver un error del backend (es normal, significa que está accesible).

**⚠️ Importante:**

- Tu teléfono y computadora deben estar en la **misma red WiFi**
- Puede que necesites desactivar el firewall temporalmente

---

### 4️⃣ Expo Web (Navegador)

✅ **Usar:** `http://localhost:8080/v1/api`

```typescript
// src/services/config.ts
export const API_URL = 'http://localhost:8080/v1/api';
```

---

## 🔍 Cómo Verificar que Funciona

### Prueba 1: Backend está corriendo

```bash
curl http://localhost:8080/v1/api/user/sign-in
```

**Respuesta esperada:**

```json
{
  "timestamp": "...",
  "status": 400,
  "message": "..."
}
```

Si ves esto, ¡el backend está corriendo! ✅

### Prueba 2: Desde tu dispositivo móvil

Abre el navegador de tu teléfono y visita:

```
http://TU-IP:8080
```

Deberías ver alguna respuesta del servidor (aunque sea un error).

---

## 🛠️ Archivo de Configuración

El archivo `src/services/config.ts` se ve así:

```typescript
// ⚠️ IMPORTANTE: Configuración del Backend
//
// Cambia esta URL dependiendo de dónde estés probando la app:

// 1. Para iOS Simulator o Web
export const API_URL = 'http://localhost:8080/v1/api';

// 2. Para Android Emulator (usa esta IP especial de Android)
// export const API_URL = 'http://10.0.2.2:8080/v1/api';

// 3. Para dispositivo físico (reemplaza con tu IP local)
// export const API_URL = 'http://192.168.1.XXX:8080/v1/api';
```

**Solo descomenta la línea que necesites.**

---

## 🚨 Problemas Comunes

### Error: "Network Error" o "Request Failed"

**Posibles causas:**

1. Backend no está corriendo
2. URL incorrecta en config.ts
3. Firewall bloqueando el puerto 8080
4. No estás en la misma red WiFi (dispositivo físico)

**Soluciones:**

1. **Verifica que el backend esté corriendo:**

   ```bash
   cd medical-booking-backend
   ./gradlew bootRun
   ```

2. **Verifica la URL en config.ts**

3. **Desactiva el firewall temporalmente:**

   **macOS:**

   ```bash
   sudo pfctl -d  # Desactivar
   sudo pfctl -e  # Activar
   ```

   **Windows:**

   - Panel de Control → Firewall → Desactivar (temporal)

4. **Verifica que estén en la misma WiFi:**
   - Tu computadora y teléfono deben estar conectados a la misma red

---

## 📋 Checklist de Configuración

- [ ] Backend corriendo en `localhost:8080`
- [ ] Archivo `config.ts` editado con la URL correcta
- [ ] Si uso dispositivo físico, obtuve mi IP local
- [ ] Si uso dispositivo físico, estoy en la misma WiFi
- [ ] Probé la URL desde el navegador
- [ ] Reinicié la app de Expo después de cambiar config

---

## 🎯 Configuración Recomendada por Caso

| Escenario                          | URL a usar                       | Notas                  |
| ---------------------------------- | -------------------------------- | ---------------------- |
| **Desarrollo en iOS Simulator**    | `http://localhost:8080/v1/api`   | Más fácil              |
| **Desarrollo en Android Emulator** | `http://10.0.2.2:8080/v1/api`    | IP especial de Android |
| **Testing en iPhone físico**       | `http://192.168.X.X:8080/v1/api` | Misma WiFi requerida   |
| **Testing en Android físico**      | `http://192.168.X.X:8080/v1/api` | Misma WiFi requerida   |
| **Expo Web**                       | `http://localhost:8080/v1/api`   | Navegador              |

---

## 💡 Tip Pro

Crea múltiples archivos de configuración:

```typescript
// config.dev.ts
export const API_URL = 'http://localhost:8080/v1/api';

// config.device.ts
export const API_URL = 'http://192.168.1.100:8080/v1/api';
```

Y cambia el import según necesites.

---

## ✅ Verificación Final

Una vez configurado:

1. Inicia el backend
2. Inicia la app móvil
3. Intenta hacer login
4. Si recibes error de credenciales (no network error), ¡está funcionando! ✅

---

**¿Aún tienes problemas?**

1. Revisa los logs de Expo en la terminal
2. Verifica los logs del backend
3. Usa una herramienta como Postman para probar la API directamente

---

**¡Buena suerte! 🚀**
