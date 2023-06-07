<template>
  <div
    ref="modal"
    id="productModal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span>新增產品</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-5">
                <h4>主圖</h4>
                <div class="mb-3">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                  <input type="file" @change="upload" ref="fileInput" />
                </div>
                <img
                  class="img-fluid"
                  :src="tempProduct.imageUrl"
                  alt="tempProduct.title"
                />
              </div>
              <!-- 多圖新增 -->
              <div>
                <h4 class="mb-3">多圖新增</h4>
                <!-- 判斷tempProduct.imagesUrl是一個陣列(有值)，是的話顯示 -->
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <template
                    v-for="(img, key) in tempProduct.imagesUrl"
                    :key="key"
                  >
                    <label class="form-label"
                      ><strong>{{ `圖片${key + 1}` }}</strong></label
                    >
                    <input
                      type="text"
                      v-model="tempProduct.imagesUrl[key]"
                      class="form-control"
                      placeholder="請輸入圖片網址"
                    />
                    <img class="img-fluid mb-4" :src="img" alt="" />
                  </template>
                  <!-- v-if＝images是空(沒有長度)的或欄位有值時-->
                  <button
                    v-if="
                      !tempProduct.imagesUrl.length ||
                      tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                    "
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    (內層)新增圖片
                  </button>
                  <button
                    v-else
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop('')"
                  >
                    刪除圖片
                  </button>
                </div>
                <!-- 外層按鈕 -->
                <div v-else>
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="createImages"
                  >
                    (外層)新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input
                  id="title"
                  type="text"
                  class="form-control"
                  placeholder="請輸入標題"
                  v-model="tempProduct.title"
                />
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input
                    id="category"
                    type="text"
                    class="form-control"
                    placeholder="請輸入分類"
                    v-model="tempProduct.category"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    id="unit"
                    type="text"
                    class="form-control"
                    placeholder="請輸入單位"
                    v-model="tempProduct.unit"
                  />
                </div>
              </div>

              <div class="row">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input
                    id="origin_price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入原價"
                    v-model.number="tempProduct.origin_price"
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input
                    id="price"
                    type="number"
                    min="0"
                    class="form-control"
                    placeholder="請輸入售價"
                    v-model.number="tempProduct.price"
                  />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入產品描述"
                  v-model="tempProduct.description"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea
                  id="description"
                  type="text"
                  class="form-control"
                  placeholder="請輸入說明內容"
                  v-model="tempProduct.content"
                >
                </textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input
                    id="is_enabled"
                    class="form-check-input"
                    type="checkbox"
                    :true-value="1"
                    :false-value="0"
                    v-model="tempProduct.is_enabled"
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
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
            class="btn btn-primary"
            v-if="isNew"
            @click="$emit('addProduct', tempProduct)"
          >
            確認
          </button>
          <button
            type="button"
            class="btn btn-primary"
            v-else
            @click="$emit('editProduct', tempProduct.id, tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  props: ["isNew", "editItem"],
  emits: ["addProduct", "editProduct"],
  data() {
    return {
      productModal: {},
      tempProduct: {
        imagesUrl: [],
      },
    };
  },
  methods: {
    show() {
      this.productModal.show();
    },
    hide() {
      this.productModal.hide();
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    upload() {
      //將檔案取出
      const file = this.$refs.fileInput.files[0];
      //api上傳格式為formData
      const formData = new FormData();
      formData.append("file-to-upload", file);
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/admin/upload`, formData)
        .then((res) => {
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$refs.fileInput.value = "";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  watch: {
    editItem() {
      this.tempProduct = this.editItem;
    },
  },
  mounted() {
    //modal實體化
    this.productModal = new Modal(
      this.$refs.modal //使用templata裡的ref=modal作為動元素使用
    );
  },
};
</script>
