<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td class="text-end">{{ product.origin_price }}</td>
        <td class="text-end">{{ product.price }}</td>
        <td>
          <span class="text-success" v-if="product.is_enabled">啟用</span>
          <span v-else>未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              type="button"
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', product)"
            >
              編輯
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="openModal('del', product)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <ProductModal
    ref="productModal"
    :is-new="isNew"
    :edit-item="editItem"
    @add-product="addProduct"
    @edit-product="editProduct"
  ></ProductModal>
  <DelModal ref="delProductModal" :temp="editItem" @del="delProduct"></DelModal>
  <PaginationCpmponent
    :pages="pages"
    @get-data="getProducts"
  ></PaginationCpmponent>
</template>

<script>
import ProductModal from "../../components/ProductModal.vue";
import DelModal from "../../components/DelModal.vue";
import PaginationCpmponent from "../../components/PaginationCpmponent.vue";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      products: [],
      isNew: true, //判斷modal裡的確認鍵是新增/編輯
      editItem: {},
      pages: {},
    };
  },
  components: {
    ProductModal,
    DelModal,
    PaginationCpmponent,
  },
  methods: {
    getProducts(page = 1) {
      //page=1 預設第一頁
      this.$http
        .get(
          `${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/products/?page=${page}`
        )
        .then((res) => {
          this.products = res.data.products;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    openModal(state, item) {
      if (state === "new") {
        this.editItem = {};
        this.isNew = true;
        this.$refs.productModal.show(); //$refs 外層取用內層方法
      } else if (state === "edit") {
        this.editItem = { ...item };
        this.isNew = false;
        this.$refs.productModal.show();
      } else if (state === "del") {
        this.editItem = { ...item };
        this.$refs.delProductModal.show();
      }
    },
    addProduct(tempProduct) {
      const data = tempProduct;
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product`, { data })
        .then((res) => {
          alert(res.data.message);
          this.$refs.productModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          console.log(err.data.message);
        });
    },
    editProduct(id, tempProduct) {
      const data = tempProduct;
      this.$http
        .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${id}`, {
          data,
        })
        .then((res) => {
          alert(res.data.message);
          this.$refs.productModal.hide();
          this.getProducts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delProduct(id) {
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/product/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.$refs.delProductModal.hide();
          this.getProducts();
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
