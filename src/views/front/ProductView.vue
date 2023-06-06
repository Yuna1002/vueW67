<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <img class="img-fluid" :src="tempProduct.imageUrl" alt="" />
      </div>
      <div class="col-7">
        <h2>{{ tempProduct.title }}</h2>
      </div>
    </div>
  </div>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      tempProduct: {},
    };
  },
  methods: {
    getProduct() {
      const id = this.$route.params.id;
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/product/${id}`)
        .then((res) => {
          this.tempProduct = res.data.product;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getProduct();
  },
};
</script>
