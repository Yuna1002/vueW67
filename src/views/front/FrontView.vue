<template>
  <h2>這是前台</h2>
  <nav>
    <RouterLink to="/">首頁</RouterLink>
    <RouterLink to="/products">產品列表</RouterLink>
  </nav>
  <hr />
  <RouterView />
</template>
<script>
import { RouterLink, RouterView } from "vue-router";
export default {
  components: {
    RouterLink,
    RouterView,
  },
};
</script>
