import "./assets/style/all.scss";
import "bootstrap/dist/js/bootstrap.min.js";
import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import axios from "axios";
import VueAxios from "vue-axios";
import { Field, Form, ErrorMessage, defineRule, configure } from "vee-validate";
import AllRules from "@vee-validate/rules";
import { localize, setLocale } from "@vee-validate/i18n";
import zhTW from "@vee-validate/i18n/dist/locale/zh_TW.json";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});
configure({
  generateMessage: localize({ zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證，拿掉的話預設是送出時判斷
});
setLocale("zh_TW"); // 設定預設語系 繁體中文

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);

app
  .component("VForm", Form)
  .component("VField", Field)
  .component("ErrorMessage", ErrorMessage);

app.mount("#app");
