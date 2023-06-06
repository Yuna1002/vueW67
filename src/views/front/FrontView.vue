<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <span class="navbar-brand text-primary">前台</span>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav me-auto">
            <RouterLink to="/" class="nav-link">首頁</RouterLink>
            <RouterLink to="/products" class="nav-link">產品列表</RouterLink>
            <RouterLink to="/carts" class="nav-link">購物車</RouterLink>
          </div>
          <div class="navbar-nav">
            <RouterLink to="/login" class="nav-link">登入後台</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <hr />
    <RouterView />
  </div>
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
