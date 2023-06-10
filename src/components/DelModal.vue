<template>
  <div
    ref="delModal"
    id="delProductModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="delProductModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span v-if="temp.create_at">刪除訂單</span>
            <span v-else-if="temp.due_date">刪除優惠券</span>
            <span v-else>刪除產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          是否刪除
          <span v-if="temp.create_at"
            ><strong class="text-danger">{{ temp.id }}</strong
            >訂單(刪除後將無法恢復)</span
          >
          <span v-else
            ><strong class="text-danger">{{ temp.title }}</strong
            >(刪除後將無法恢復)</span
          >
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-danger"
            @click="$emit('del', temp.id)"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  props: ["temp"],
  emits: ["del"],
  data() {
    return {
      delModal: {},
    };
  },
  methods: {
    show() {
      this.delModal.show();
    },
    hide() {
      this.delModal.hide();
    },
  },
  mounted() {
    //modal實體化
    this.delModal = new Modal(
      this.$refs.delModal //使用templata裡的ref=modal作為動元素使用
    );
  },
};
</script>
