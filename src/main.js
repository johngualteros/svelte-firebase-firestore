import App from "./App.svelte";
import "bootswatch/dist/quartz/bootstrap.min.css";
import "toastify-js/src/toastify.css";
const app = new App({
  target: document.body,
  props: {
    name: "world",
  },
});

export default app;
