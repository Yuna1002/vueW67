import{_ as g,r as b,o as n,c as l,b as t,F as r,f,t as i,d as P,w as V,e as u,g as y}from"./index-ce484b6b.js";const{VITE_APP_URL:_,VITE_APP_PATH:h}={VITE_APP_URL:"https://vue3-course-api.hexschool.io/v2",VITE_APP_PATH:"yuna1002",BASE_URL:"/vueW67/",MODE:"production",DEV:!1,PROD:!0,SSR:!1},I={data(){return{products:[],loadingItem:""}},methods:{getProducts(){this.$http.get(`${_}/api/${h}/products`).then(s=>{this.products=s.data.products})},addToCart(s,d){this.loadingItem=s;const c={product_id:s,qty:d};this.$http.post(`${_}/api/${h}/cart`,{data:c}).then(o=>{alert(o.data.message),this.loadingItem=""}).catch(o=>{console.log(o)})}},mounted(){this.getProducts()}},T=t("h2",{class:"text-center mb-5"},"產品列表",-1),k={class:"table align-middle"},v=t("thead",null,[t("tr",null,[t("th",null,"圖片"),t("th",null,"商品名稱"),t("th",null,"價格"),t("th")])],-1),x={style:{width:"200px"}},E=["src"],$={class:"h6"},A={class:"h5"},C={class:"btn-group btn-group-sm"},R=["onClick","disabled"],L={key:0,class:"fas fa-spinner fa-pulse"};function w(s,d,c,o,a,p){const m=b("RouterLink");return n(),l(r,null,[T,t("table",k,[v,t("tbody",null,[(n(!0),l(r,null,f(a.products,e=>(n(),l("tr",{key:e.id},[t("td",x,[t("div",null,[t("img",{class:"img-fluid",src:e.imageUrl,alt:"product.title"},null,8,E)])]),t("td",null,i(e.title),1),t("td",null,[t("del",$,"原價 "+i(e.origin_price)+" 元",1),t("div",A,"現在只要 "+i(e.price)+" 元",1)]),t("td",null,[t("div",C,[P(m,{to:`/product/${e.id}`,type:"button",class:"btn btn-outline-secondary me-3"},{default:V(()=>[u(" 查看更多 ")]),_:2},1032,["to"]),t("button",{type:"button",class:"btn btn-outline-danger",onClick:B=>p.addToCart(e.id,1),disabled:a.loadingItem===e.id},[a.loadingItem===e.id?(n(),l("i",L)):y("",!0),u(" 加到購物車 ")],8,R)])])]))),128))])])],64)}const N=g(I,[["render",w]]);export{N as default};
