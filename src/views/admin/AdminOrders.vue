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
            <button
              class="btn btn-outline-primary btn-sm"
              type="button"
              @click="openModal('preview', order)"
            >
              檢視
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              type="button"
              @click="openModal('del', order)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationCpmponent
    :pages="pages"
    @get-data="getOrders"
  ></PaginationCpmponent>
  <DelModal ref="delOrderModal" :temp="temp" @del="delOrder"></DelModal>
  <OrderModal
    ref="OrderModal"
    :temp="temp"
    @update-paid="updatePaid"
  ></OrderModal>
</template>

<script>
import PaginationCpmponent from "../../components/PaginationCpmponent.vue";
import DelModal from "../../components/DelModal.vue";
import OrderModal from "../../components/OrderModal.vue";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      orders: [],
      pages: {},
      temp: {},
    };
  },
  components: {
    PaginationCpmponent,
    DelModal,
    OrderModal,
  },
  methods: {
    getOrders(page = 1) {
      //page=1 預設第一頁
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/orders/?page=${page}`)
        .then((res) => {
          console.log("訂單", res.data);
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
          this.$refs.OrderModal.hide();
          this.getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    delOrder(id) {
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/order/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.$refs.delOrderModal.hide();
          this.getOrders();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(type, order) {
      this.temp = { ...order };
      if (type === "del") {
        this.$refs.delOrderModal.show();
      } else {
        this.$refs.OrderModal.show();
      }
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
