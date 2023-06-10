<template>
  <div class="text-end mt-4">
    <button class="btn btn-primary" type="button" @click="openModal('new')">
      建立新的優惠券
    </button>
  </div>
  <table class="table mt-4">
    <thead>
      <tr>
        <th>名稱</th>
        <th>折扣百分比</th>
        <th>到期日</th>
        <th>是否啟用</th>
        <th>編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="coupon in coupons" :key="coupon.id">
        <td>{{ coupon.title }}</td>
        <td>{{ coupon.percent }}%</td>
        <td>{{ $filters.date(coupon.due_date) }}</td>
        <td>
          <span v-if="coupon.is_enabled === 1" class="text-success">啟用</span>
          <span v-else class="text-muted">未啟用</span>
        </td>
        <td>
          <div class="btn-group">
            <button
              class="btn btn-outline-primary btn-sm"
              @click="openModal('edit', coupon)"
            >
              編輯
            </button>
            <button
              class="btn btn-outline-danger btn-sm"
              @click="openModal('del', coupon)"
            >
              刪除
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  <DelModal ref="delModal" :temp="temp" @del="delCoupon"></DelModal>
  <CouponModal
    ref="CouponModal"
    :isNew="isNew"
    :temp="temp"
    @add-coupon="addCoupon"
    @edit-coupon="editCoupon"
  ></CouponModal>
</template>
<script>
import DelModal from "../../components/DelModal.vue";
import CouponModal from "../../components/couponModal.vue";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      coupons: [],
      temp: {},
      isNew: true,
    };
  },
  components: {
    DelModal,
    CouponModal,
  },
  methods: {
    getCoupons() {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupons`)
        .then((res) => {
          this.coupons = res.data.coupons;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    openModal(type, item) {
      if (type === "del") {
        this.temp = { ...item };
        this.$refs.delModal.show();
      } else if (type === "new") {
        this.temp = { is_enabled: 0 };
        this.isNew = true;
        this.$refs.CouponModal.show();
      } else if (type === "edit") {
        this.temp = { ...item };
        this.isNew = false;
        this.$refs.CouponModal.show();
      }
    },
    addCoupon(tempCoupon) {
      //console.log(tempCoupon);
      const data = tempCoupon;
      console.log(data);
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon`, { data })
        .then((res) => {
          alert(res.data.message);
          this.$refs.CouponModal.hide();
          this.getCoupons();
        })
        .catch((err) => {
          console.dir(err);
        });
    },
    delCoupon(id) {
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${id}`)
        .then((res) => {
          console.log(res);
          alert(res.data.message);
          this.$refs.delModal.hide();
          this.getCoupons();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editCoupon(coupon) {
      const data = coupon;
      this.$http
        .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/coupon/${coupon.id}`, {
          data,
        })
        .then((res) => {
          alert(res.data.message);
          this.$refs.CouponModal.hide();
          this.getCoupons();
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.getCoupons();
  },
};
</script>
