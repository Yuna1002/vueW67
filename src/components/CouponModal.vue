<template>
  <div
    class="modal fade"
    id="couponModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="couponModal"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          {{ due_date }}
          <div class="mb-3">
            <label for="title">標題</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="tempCoupon.title"
              placeholder="請輸入標題"
            />
          </div>
          <div class="mb-3">
            <label for="coupon_code">優惠碼</label>
            <input
              type="text"
              class="form-control"
              id="coupon_code"
              v-model="tempCoupon.code"
              placeholder="請輸入優惠碼"
            />
          </div>
          <div class="mb-3">
            <label for="due_date">到期日</label>
            <input
              type="date"
              class="form-control"
              id="due_date"
              v-model="due_date"
            />
          </div>
          <div class="mb-3">
            <label for="price">折扣百分比</label>
            <input
              type="number"
              class="form-control"
              id="price"
              min="0"
              max="100"
              v-model.number="tempCoupon.percent"
              placeholder="請輸入折扣百分比"
            />
          </div>
          <div class="mb-3">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                :true-value="1"
                :false-value="0"
                v-model="tempCoupon.is_enabled"
                id="is_enabled"
              />
              <label class="form-check-label" for="is_enabled">
                是否啟用
              </label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button
            v-if="isNew"
            type="button"
            class="btn btn-primary"
            @click="$emit('addCoupon', tempCoupon)"
          >
            確定
          </button>
          <button
            v-else
            type="button"
            class="btn btn-primary"
            @click="$emit('editCoupon', tempCoupon)"
          >
            確定
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  props: ["isNew", "temp"],
  emits: ["addCoupon", "editCoupon"],
  data() {
    return {
      couponModal: {},
      tempCoupon: {},
      due_date: "",
    };
  },
  methods: {
    show() {
      this.couponModal.show();
    },
    hide() {
      this.couponModal.hide();
    },
  },
  watch: {
    temp() {
      this.tempCoupon = this.temp;
      this.due_date = this.temp.due_date;
    },
    due_date() {
      if (typeof this.due_date === "string") {
        //將格式"YYYY-MM-DD" 改為後端所需格式Number 0000000000
        this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);
      } else if (typeof this.due_date === "number") {
        //格式0000000000 轉成"YYYY-MM-DD"
        const time = new Date(this.due_date * 1000).toISOString().split("T");
        this.due_date = time[0];
      }
    },
  },
  mounted() {
    //modal實體化
    this.couponModal = new Modal(this.$refs.couponModal);
  },
};
</script>
