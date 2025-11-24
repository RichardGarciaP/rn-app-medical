# 🚀 Inicio Rápido - Medical App Mobile

## ⚡ Configuración en 3 Pasos

### 1️⃣ Configurar URL del Backend

Edita `app.json`:

```json
{
  "expo": {
    "extra": {
      "apiUrl": "http://TU_IP:8080/v1/api" // Cambia TU_IP
    }
  }
}
```

**Opciones comunes:**

- Emulador iOS: `http://localhost:8080/v1/api`
- Emulador Android: `http://10.0.2.2:8080/v1/api`
- Dispositivo físico: `http://192.168.X.X:8080/v1/api`

### 2️⃣ Instalar Dependencias

```bash
npm install
```

### 3️⃣ Iniciar la App

```bash
npm start
```

Luego presiona:

- `i` para iOS Simulator
- `a` para Android Emulator
- Escanea el QR con Expo Go (dispositivo físico)

---

## ✅ Verificación Rápida

### Compilar TypeScript

```bash
npx tsc --noEmit
```

✅ Debería completarse sin errores

### Ejecutar Tests

```bash
npm test
```

⚠️ Puede fallar por compatibilidad, pero la estructura está lista

### Ver App Funcionando

```bash
npm start
# Presiona 'w' para web (más rápido para pruebas)
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno

El archivo `src/services/config.ts` detecta automáticamente:

- ✅ Plataforma (iOS/Android)
- ✅ Modo desarrollo/producción
- ✅ URL configurada en app.json

### Testing

```bash
npm run test:watch    # Modo watch para desarrollo
npm run test:coverage # Ver cobertura de código
```

---

## 📱 Usuarios de Prueba

### Paciente

```
Email: patient@test.com
Password: password123
```

### Doctor

```
Email: doctor@test.com
Password: password123
```

---

## 🐛 Problemas Comunes

### "Network Error"

❌ **Problema:** Backend no accesible  
✅ **Solución:** Verifica que el backend esté corriendo y la URL sea correcta

### "No hay doctores disponibles"

❌ **Problema:** Endpoint `/user/doctors` no implementado  
✅ **Solución:** La app usa datos mock automáticamente (3 doctores)

### Errores de TypeScript

❌ **Problema:** Strict mode revela errores ocultos  
✅ **Solución:** Corrige los errores - es beneficioso a largo plazo

---

## 📚 Documentación Completa

- **README.md** - Documentación general
- **MEJORAS_IMPLEMENTADAS.md** - Detalles técnicos de mejoras
- **RESUMEN_ACCIONES.md** - Resumen ejecutivo de cambios
- **QUICKSTART.md** - Guía de inicio (original)

---

## 🎯 Siguiente: Crear tu Primera Cita

1. Inicia la app: `npm start`
2. Registra un usuario paciente
3. Toca "Nueva Cita"
4. Selecciona doctor, fecha y hora
5. Confirma la cita
6. ✅ ¡Cita creada!

**Nota:** Las validaciones ahora previenen:

- ❌ Citas en el pasado
- ❌ Citas fuera de horario (8 AM - 6 PM)
- ❌ Citas en fines de semana
- ❌ Citas con más de 3 meses de anticipación

---

## ⚡ Comandos Más Usados

```bash
npm start              # Iniciar dev server
npm run ios            # Correr en iOS
npm run android        # Correr en Android
npm test               # Ejecutar tests
npx tsc --noEmit       # Verificar TypeScript
```

---

**¿Listo?** → `npm start` y a desarrollar! 🚀
