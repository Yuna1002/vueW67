<template>
  <div class="container">
    <div class="row justify-content-center mt-5">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
      <div class="col-8">
        <form id="form" class="form-signin" @submit.prevent="login">
          <div class="form-floating mb-3">
            <input
              type="email"
              class="form-control"
              id="username"
              placeholder="name@example.com"
              required
              autofocus
              v-model="user.username"
            />
            <label for="username">Email address</label>
          </div>
          <div class="form-floating">
            <input
              type="password"
              class="form-control"
              id="password"
              placeholder="Password"
              required
              v-model="user.password"
            />
            <label for="password">Password</label>
          </div>
          <div class="d-flex align-items-center justify-content-between">
            <RouterLink to="/">返回首頁</RouterLink>
            <button class="btn btn-lg btn-primary mt-3 border" type="submit">
              登入
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_APP_URL } = import.meta.env;
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const data = {
        username: this.user.username,
        password: this.user.password,
      };
      this.$http
        .post(`${VITE_APP_URL}/admin/signin`, data)
        .then((res) => {
          alert(res.data.message);
          //將token、expired儲存在cookie
          document.cookie = `yunaToken=${res.data.token}; expires=${new Date(
            res.data.expired
          )}`;
          this.$router.push("/admin/products");
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
  },
};
</script>
