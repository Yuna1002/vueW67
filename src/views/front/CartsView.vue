<template>
  <h2 class="text-center mb-5">購物車</h2>
  <table class="table align-middle">
    <thead>
      <tr>
        <th></th>
        <th>品名</th>
        <th style="width: 150px">數量/單位</th>
        <th class="text-end">單價</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="carts">
        <tr v-for="cart in carts" :key="cart.id">
          <td>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm"
              @click="delCart(cart.id)"
              :disabled="loadingItem === cart.id"
            >
              <i
                class="fas fa-spinner fa-pulse"
                v-if="loadingItem === cart.id"
              ></i>
              x
            </button>
          </td>
          <td>
            {{ cart.product.title }}
          </td>
          <td>
            <div class="input-group input-group-sm">
              <div class="input-group mb-3">
                <select
                  class="form-select"
                  name="qty"
                  v-model="cart.qty"
                  @change="updateCart(cart.id, cart.product_id, cart.qty)"
                  :disabled="loadingItem === cart.id"
                >
                  <option v-for="i in 10" :key="i" :value="i">
                    {{ i }}
                  </option>
                </select>
                <span class="input-group-text" id="basic-addon2">顆</span>
              </div>
            </div>
          </td>
          <td class="text-end">
            {{ cart.final_total }}
          </td>
        </tr>
      </template>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3" class="text-end">總計</td>
        <td class="text-end">{{ total }}</td>
      </tr>
    </tfoot>
  </table>
  <!-- 表單 -->
  <div class="my-5 row justify-content-center">
    <v-form
      ref="form"
      class="col-md-6"
      v-slot="{ errors }"
      @submit="submitOrder"
    >
      <div class="mb-3">
        <label for="email" class="form-label me-1">Email</label>
        <span class="badge text-danger">*必填</span>
        <v-field
          id="email"
          name="email"
          type="email"
          class="form-control"
          :class="{ 'is-invalid': errors['email'] }"
          placeholder="請輸入 Email"
          rules="email|required"
          v-model="form.user.email"
        ></v-field>
        <error-message name="email" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">收件人姓名</label>
        <span class="badge text-danger">*必填</span>
        <v-field
          id="name"
          name="姓名"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['姓名'] }"
          placeholder="請輸入姓名"
          rules="required"
          v-model="form.user.name"
        ></v-field>
        <error-message name="姓名" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">電話</label>
        <span class="badge text-danger">*必填</span>
        <v-field
          id="tel"
          name="電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['電話'] }"
          placeholder="請輸入電話"
          v-model="form.user.tel"
          rules="required|min:8|max:10"
        ></v-field>
        <!-- 電話規則 最小8碼最多12碼 -->
        <error-message name="電話" class="invalid-feedback"></error-message>
      </div>
      <!-- 行動電話自訂規則 09開頭+8碼 -->
      <div class="mb-3">
        <label for="mobile" class="form-label">行動電話</label>
        <v-field
          id="mobile"
          name="行動電話"
          type="tel"
          class="form-control"
          :class="{ 'is-invalid': errors['行動電話'] }"
          placeholder="請輸入行動電話"
          v-model="form.user.mobile"
          :rules="checkMobile"
        ></v-field>
        <error-message name="行動電話" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">收件人地址</label>
        <span class="badge text-danger">*必填</span>
        <v-field
          id="address"
          name="地址"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors['地址'] }"
          placeholder="請輸入地址"
          rules="required"
          v-model="form.user.address"
        ></v-field>
        <error-message name="地址" class="invalid-feedback"></error-message>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="form.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button type="submit" class="btn btn-danger">送出訂單</button>
      </div>
    </v-form>
  </div>
</template>
<script>
const { VITE_APP_URL, VITE_APP_PATH } = import.meta.env;
export default {
  data() {
    return {
      carts: [],
      total: 0,
      loadingItem: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  methods: {
    getCarts() {
      this.$http
        .get(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart`)
        .then((res) => {
          console.log("購物車", res.data.data.carts);
          this.carts = res.data.data.carts;
          this.total = res.data.data.total;
        })
        .catch((err) => {
          console.log(err.data);
        });
    },
    delCart(id) {
      this.loadingItem = id;
      this.$http
        .delete(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${id}`)
        .then((res) => {
          alert(res.data.message);
          this.loadingItem = "";
          this.getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    updateCart(id, product_id, qty) {
      this.loadingItem = id;
      const data = {
        product_id,
        qty,
      };
      this.$http
        .put(`${VITE_APP_URL}/api/${VITE_APP_PATH}/cart/${id}`, { data })
        .then((res) => {
          alert(res.data.message);
          this.loadingItem = "";
          this.getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    submitOrder() {
      const data = this.form;
      this.$http
        .post(`${VITE_APP_URL}/api/${VITE_APP_PATH}/order`, { data })
        .then((res) => {
          alert(res.data.message);
          this.$refs.form.resetForm();
          this.getCarts();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    checkMobile(value) {
      if (!value) {
        //加入空值即非必填
        return true;
      }
      const mobile = /^(09)[0-9]{8}$/;
      return mobile.test(value) ? true : "行動電話格式有誤";
    },
  },
  mounted() {
    this.getCarts();
  },
};
</script>
