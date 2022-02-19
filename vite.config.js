import { VitePWA } from "vite-plugin-pwa";

let hmr = {};
if (process.env.GITPOD_GIT_USER_EMAIL) {
  hmr = { port: 443 };
}

export default {
  root: "src",
  public: "src",
  build: {
    outDir: "../dist",
    emptyOutDir: true,
  },
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },
  server: {
    hmr: hmr,
  },
  plugins: [
    VitePWA({
      includeAssets: [
        "favicon.ico",
        "robots.txt",
        "apple-touch-icon.png",
        "android-chrome-192x192.png",
        "android-chrome-512x512.png",
        "maskable_icon_x192.png",
      ],
      manifest: {
        name: "Guitar grid composer",
        short_name: "Guitar Grid",
        description: "Application to create chord grids for guitar backing track",
        theme_color: "#121212",
        background_color: "#121212",
        display: "standalone",
        icons: [
          {
            src: "android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "maskable_icon_x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
        ],
        file_handlers: [
          {
            action: "/",
            accept: {
              "application/vnd.grid+text": [".grid"],
            },
          },
        ],
      },
    }),
  ],
};
