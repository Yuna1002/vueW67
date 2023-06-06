<template>
  <div class="container">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <span class="navbar-brand text-primary">後台</span>
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
            <RouterLink to="/admin/products" class="nav-link"
              >產品列表</RouterLink
            >
            <RouterLink to="/admin/orders" class="nav-link"
              >訂單列表</RouterLink
            >
          </div>
          <div class="navbar-nav">
            <RouterLink to="/" class="nav-link">前往前台</RouterLink>
            <RouterLink to="/" class="nav-link">登出</RouterLink>
          </div>
        </div>
      </div>
    </nav>

    <hr />
    <RouterView />
  </div>
</template>
