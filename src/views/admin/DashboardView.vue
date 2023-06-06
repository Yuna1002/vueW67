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
            <a href="" class="nav-link" @click.prevent="logout">登出</a>
          </div>
        </div>
      </div>
    </nav>

    <hr />
    <RouterView v-if="successCheck" />
  </div>
</template>
<script>
const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      successCheck: false,
    };
  },
  methods: {
    checkAccount() {
      //從cookie取出token
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)yunaToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      if (token) {
        //將token放置hearders
        this.$http.defaults.headers.common["Authorization"] = token;
        this.$http
          .post(`${VITE_APP_URL}/api/user/check`)
          .then(() => {
            this.successCheck = true;
          })
          .catch((err) => {
            alert(err.response.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("請先登入");
        this.$router.push("/login");
      }
    },
    logout() {
      document.cookie = "yunaToken=;expires=;";
      this.$http.post(`${VITE_APP_URL}/logout`).then((res) => {
        alert(res.data.message);
        this.$router.push("/");
      });
    },
  },
  mounted() {
    this.checkAccount();
  },
};
</script>
