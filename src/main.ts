import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import { MotionPlugin } from "motion-v";
import "./style.css";
import App from "./App.vue";

const app = createApp(App);
const head = createHead();

app.use(head);
app.use(MotionPlugin);
app.mount("#app");
