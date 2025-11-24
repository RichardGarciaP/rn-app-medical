/**
 * Metro Bundler Configuration
 *
 * Metro es el JavaScript bundler para React Native que:
 * - Transpila código moderno (TypeScript, JSX) a JavaScript compatible
 * - Empaqueta módulos y dependencias en bundles optimizados
 * - Resuelve imports y exports entre archivos
 * - Transforma assets (imágenes, fuentes, etc.)
 * - Habilita Fast Refresh (hot reload) durante desarrollo
 *
 * Esta configuración usa los defaults de Expo que incluyen:
 * ✅ Soporte completo para TypeScript y TSX
 * ✅ Transformación de JSX/React
 * ✅ Asset resolution optimizado
 * ✅ Source maps para debugging
 * ✅ Minificación y tree-shaking en producción
 * ✅ Fast Refresh para desarrollo
 *
 * SWR (Stale-While-Revalidate):
 * No requiere configuración especial en Metro ya que es una librería
 * de React pura que se bundlea normalmente como cualquier dependencia.
 *
 * @see https://docs.expo.dev/guides/customizing-metro/
 */

const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
