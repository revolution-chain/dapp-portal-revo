export default defineNuxtPlugin(() => {
  const script = document.createElement("script");
  script.async = false;
  script.src = "/set-custom-hyperchains-config.js";
  document.head.appendChild(script);
});
