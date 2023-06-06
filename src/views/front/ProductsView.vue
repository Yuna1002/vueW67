<template>
  <h2 class="text-center mb-5">產品列表</h2>
  <table class="table align-middle">
    <thead>
      <tr>
        <th>圖片</th>
        <th>商品名稱</th>
        <th>價格</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td style="width: 200px">
          <div>
            <img
              class="img-fluid"
              :src="product.imageUrl"
              alt="product.title"
            />
          </div>
        </td>
        <td>{{ product.title }}</td>
        <td>
          <del class="h6">原價 {{ product.origin_price }} 元</del>
          <div class="h5">現在只要 {{ product.price }} 元</div>
        </td>
        <td>
          <div class="btn-group btn-group-sm">
            <RouterLink
              :to="`/product/${product.id}`"
              type="button"
              class="btn btn-outline-secondary me-3"
            >
              查看更多
            </RouterLink>
            <button
              type="button"
              class="btn btn-outline-danger"
              @click="addToCart(product.id, 1)"
              :disabled="loadingItem === product.id"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="loadingItem === product.id"
              ></i>
              加到購物車
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      loadingItem: "",
    };
  },
  methods: {
    getProducts() {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/products`)
        .then((res) => {
          this.products = res.data.products;
        });
    },
    addToCart(product_id, qty) {
      this.loadingItem = product_id;
      const data = { product_id, qty };
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`, { data })
        .then((res) => {
          alert(res.data.message);
          this.loadingItem = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
