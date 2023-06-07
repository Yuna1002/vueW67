<template>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>購買時間</th>
        <th>Email</th>
        <th>購買款項</th>
        <th>應付金額</th>
        <th>是否付款</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <!-- v-if="orders.length" -->
      <tr
        v-for="order in orders"
        :key="order.id"
        :class="{ 'text-secondary': !order.is_paid }"
      >
        <td>{{ $filters.date(order.create_at) }}</td>
        <!-- {{ $filters.date(order.create_at) }} -->
        <!-- <span v-text="order.user.email" v-if="order.user"></span> -->
        <td>{{ order.user.email }}</td>
        <td>
          <ul class="list-unstyled">
            <li v-for="product in order.products" :key="product.id">
              {{ product.product.title }} -數量：{{ product.qty }}
            </li>
          </ul>
        </td>
        <td class="text-right">{{ order.total }}</td>
        <td>
          <div class="form-check form-switch">
            <input
              class="form-check-input"
              type="checkbox"
              :id="order.id"
              v-model="order.is_paid"
              @change="updatePaid(order)"
            />
            <label class="form-check-label" :for="order.id">
              <span v-if="order.is_paid">已付款</span>
              <span v-else>未付款</span>
            </label>
          </div>
        </td>
        <td>
          <div class="btn-group">
            <!-- <button
                class="btn btn-outline-primary btn-sm"
                type="button"
                @click="openModal(order)"
              >
                檢視
              </button> -->
            <!-- <button
                class="btn btn-outline-danger btn-sm"
                type="button"
                @click="openDelOrderModal(order)"
              >
                刪除
              </button> -->
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationCpmponent
    :pages="pages"
    @get-data="getOrders"
  ></PaginationCpmponent>
</template>

<script>
import PaginationCpmponent from "../../components/PaginationCpmponent.vue";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      pages: {},
    };
  },
  components: {
    PaginationCpmponent,
  },
  methods: {
    getOrders(page = 1) {
      //page=1 預設第一頁
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          console.log(res.data);
          this.orders = res.data.orders;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          alert(err.data.message);
        });
    },
    updatePaid(order) {
      const data = {
        is_paid: order.is_paid,
      };
      this.$http
        .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${order.id}`, {
          data,
        })
        .then((res) => {
          alert(res.data.message);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
