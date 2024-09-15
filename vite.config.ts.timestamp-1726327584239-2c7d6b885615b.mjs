// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "file:///D:/__pirvate__/beer-sys/node_modules/vite/dist/node/index.js";
import vue from "file:///D:/__pirvate__/beer-sys/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vueJsx from "file:///D:/__pirvate__/beer-sys/node_modules/@vitejs/plugin-vue-jsx/dist/index.mjs";
import AutoImport from "file:///D:/__pirvate__/beer-sys/node_modules/unplugin-auto-import/dist/vite.js";
import tailwind from "file:///D:/__pirvate__/beer-sys/node_modules/tailwindcss/lib/index.js";
import autoprefixer from "file:///D:/__pirvate__/beer-sys/node_modules/autoprefixer/lib/autoprefixer.js";
var __vite_injected_original_import_meta_url = "file:///D:/__pirvate__/beer-sys/vite.config.ts";
var vite_config_default = defineConfig({
  plugins: [
    "lucide-vue-next",
    vue(),
    vueJsx(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: false
    })
  ],
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()]
    }
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url))
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxfX3BpcnZhdGVfX1xcXFxiZWVyLXN5c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcX19waXJ2YXRlX19cXFxcYmVlci1zeXNcXFxcdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L19fcGlydmF0ZV9fL2JlZXItc3lzL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHtmaWxlVVJMVG9QYXRoLCBVUkx9IGZyb20gJ25vZGU6dXJsJ1xuXG5pbXBvcnQge2RlZmluZUNvbmZpZ30gZnJvbSAndml0ZSdcbmltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xuaW1wb3J0IHZ1ZUpzeCBmcm9tICdAdml0ZWpzL3BsdWdpbi12dWUtanN4J1xuaW1wb3J0IEF1dG9JbXBvcnQgZnJvbSAndW5wbHVnaW4tYXV0by1pbXBvcnQvdml0ZSdcbmltcG9ydCB0YWlsd2luZCBmcm9tICd0YWlsd2luZGNzcydcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuXG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICAgICdsdWNpZGUtdnVlLW5leHQnLFxuICAgICAgICB2dWUoKSxcbiAgICAgICAgdnVlSnN4KCksXG4gICAgICAgIEF1dG9JbXBvcnQoe1xuICAgICAgICAgICAgaW1wb3J0czogWyd2dWUnLCAndnVlLXJvdXRlciddLFxuICAgICAgICAgICAgZHRzOiBmYWxzZSxcbiAgICAgICAgfSksXG4gICAgXSxcbiAgICBjc3M6IHtcbiAgICAgICAgcG9zdGNzczoge1xuICAgICAgICAgICAgcGx1Z2luczogW3RhaWx3aW5kKCksIGF1dG9wcmVmaXhlcigpXSxcbiAgICAgICAgfSxcbiAgICB9LFxuICAgIHJlc29sdmU6IHtcbiAgICAgICAgYWxpYXM6IHtcbiAgICAgICAgICAgICdAJzogZmlsZVVSTFRvUGF0aChuZXcgVVJMKCcuL3NyYycsIGltcG9ydC5tZXRhLnVybCkpXG4gICAgICAgIH1cbiAgICB9LFxuXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE2UCxTQUFRLGVBQWUsV0FBVTtBQUU5UixTQUFRLG9CQUFtQjtBQUMzQixPQUFPLFNBQVM7QUFDaEIsT0FBTyxZQUFZO0FBQ25CLE9BQU8sZ0JBQWdCO0FBQ3ZCLE9BQU8sY0FBYztBQUNyQixPQUFPLGtCQUFrQjtBQVBrSSxJQUFNLDJDQUEyQztBQVU1TSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTO0FBQUEsSUFDTDtBQUFBLElBQ0EsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLElBQ1AsV0FBVztBQUFBLE1BQ1AsU0FBUyxDQUFDLE9BQU8sWUFBWTtBQUFBLE1BQzdCLEtBQUs7QUFBQSxJQUNULENBQUM7QUFBQSxFQUNMO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDRCxTQUFTO0FBQUEsTUFDTCxTQUFTLENBQUMsU0FBUyxHQUFHLGFBQWEsQ0FBQztBQUFBLElBQ3hDO0FBQUEsRUFDSjtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0gsS0FBSyxjQUFjLElBQUksSUFBSSxTQUFTLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0o7QUFFSixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
