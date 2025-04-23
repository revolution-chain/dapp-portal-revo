import { portal as portalMeta } from "./data/meta";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "en",
      },
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
        },
      ],
      meta: [
        {
          property: "og:image",
          content: portalMeta.previewImg.src,
        },
        {
          property: "og:image:alt",
          content: portalMeta.previewImg.alt,
        },
        {
          property: "og:image:type",
          content: "image/jpeg",
        },
        {
          property: "og:image:width",
          content: "1200",
        },
        {
          property: "og:image:height",
          content: "630",
        },
      ],
      script: [
        {
          src: "/config.js",
        },
        process.env.RUDDER_KEY
          ? {
              hid: "Rudder-JS",
              src: "https://cdn.rudderlabs.com/v1.1/rudder-analytics.min.js",
              defer: true,
            }
          : undefined,
      ],
    },
  },

  plugins: [],

  modules: [
    "@kevinmarrec/nuxt-pwa",
    "@pinia/nuxt", // https://pinia.vuejs.org/ssr/nuxt.html
    "@nuxtjs/eslint-module", // https://nuxt.com/modules/eslint
    "@nuxtjs/tailwindcss", // https://nuxt.com/modules/tailwindcss
  ],

  css: ["@/assets/css/tailwind.css", "@/assets/css/style.scss", "web3-avatar-vue/dist/style.css"],
  ssr: false,

  pinia: {
    storesDirs: ["./store/**"],
  },

  pwa: {
    meta: {
      name: portalMeta.title,
      description: portalMeta.description,
    },
    manifest: {
      name: portalMeta.title,
      short_name: "Portal",
    },
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  vite: {
    // Make listed envs public and accessible in the runtime
    define: Object.fromEntries(
      [
        "NODE_TYPE",
        "WALLET_CONNECT_PROJECT_ID",
        "ANKR_TOKEN",
        "SENTRY_DSN",
        "SENTRY_ENV",
        "SCREENING_API_URL",
        "RUDDER_KEY",
        "DATAPLANE_URL",
        "GIT_COMMIT_HASH",
        "GIT_REPO_URL",
        "ONRAMP_STAGING",
        "NETWORK_ID",
        "NETWORK_KEY",
        "NETWORK_NAME",
        "NETWORK_RPC_URL",
        "NETWORK_BLOCK_EXPLORER_URL",
        "NETWORK_BLOCK_EXPLORER_API",
        "L1_NETWORK",
      ].map((key) => [`process.env.${key}`, JSON.stringify(process.env[key])])
    ),
    css: {
      preprocessorOptions: {
        scss: {
          // eslint-disable-next-line quotes
          additionalData: '@use "@/assets/css/_mixins.scss" as *;',
        },
      },
    },
  },

  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      sentryDSN: process.env.SENTRY_DSN,
      sentryENV: process.env.SENTRY_ENV,
      networkId: process.env.NETWORK_ID,
      networkKey: process.env.NETWORK_KEY,
      networkName: process.env.NETWORK_NAME,
      networkRpcUrl: process.env.NETWORK_RPC_URL,
      networkBlockExplorerUrl: process.env.NETWORK_BLOCK_EXPLORER_URL,
      networkBlockExplorerApi: process.env.NETWORK_BLOCK_EXPLORER_API,
      l1Network: process.env.L1_NETWORK,
    },
  },
  compatibilityDate: "2025-03-24",
});
