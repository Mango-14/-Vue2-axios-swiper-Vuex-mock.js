<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th7">款式</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cartInfo, index) of shopData"
          :key="cartInfo.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              v-model="cartInfo.isChecked"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cartInfo.imgUrl" />
            <div class="item-msg">
              {{ cartInfo.skuName }}
            </div>
          </li>
          <li class="cart-list-con3">
            <div class="item-txt">
              <span>颜色：{{ cartInfo.color }}</span
              ><br />
              <span>版本：{{ cartInfo.version }}</span>
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cartInfo.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', index)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              v-model="cartInfo.skuNum"
              minnum="1"
              class="itxt"
              onkeyup="value = value == '' ? 1 : value.replace(/^0*|[^\d]/g, '')"
              @change="handler('change', index)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', index)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum"
              >{{ cartInfo.skuNum * cartInfo.skuPrice }}.00</span
            >
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteShop(cartInfo.id)"
              >删除</a
            >
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          v-model="isAllChecked"
          @click="changeAllChecked()"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllShop">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}.00</i>
        </div>
        <div class="sumbtn">
          <button class="sum-btn" @click="isNull">结算</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getCartData();
  },
  computed: {
    ...mapGetters("cart", ["cartList", "isShopData"]),
    shopData: {
      get() {
        return this.cartList.shopData || [];
      },
      set(value) {
        this.cartList.shopData = value;
      },
    },
    //总价格
    totalPrice() {
      return this.shopData
        .filter((item) => item.isChecked == 1)
        .reduce((sum, item) => {
          return (sum += item.skuNum * item.skuPrice);
        }, 0);
    },
    //全选按钮
    isAllChecked: {
      get() {
        return this.shopData.every((item) => {
          return item.isChecked == 1;
        });
      },
      set(value) {
        this.changeAllChecked(value);
      },
    },
  },
  watch: {
    shopData: {
      deep: true,
      immediate: true,
      handler(newValue) {
        //选中的商品，用来判断购物车中有没有选中的商品或购物车中有没有添加进商品
        //没有则弹出提示框
        let isShopData =
          newValue.filter((item) => {
            return item.isChecked == 1;
          }) || [];
        this.$store.commit("cart/ISSHOPDATA", isShopData);
      },
    },
  },
  methods: {
    getCartData() {
      this.$store.dispatch("cart/cartList");
    },
    //全选按钮改变，将购物车中所有商品选项都改变
    changeAllChecked(value) {
      this.shopData.forEach((item) => {
        item.isChecked = value;
      });
    },
    //向服务器发请求改变商品数量
    handler(value, index) {
      if (value == "add") {
        this.shopData[index].skuNum++;
      } else if (value == "minus") {
        this.shopData[index].skuNum > 1
          ? this.shopData[index].skuNum--
          : (this.shopData[index].skuNum = 1);
      }
      this.$store.dispatch("cart/changeSkuNum", {
        id: this.shopData[index].id,
        skuNum: this.shopData[index].skuNum,
      });
    },
    //删除商品
    async deleteShop(id) {
      await this.$store.dispatch("cart/deleteShop", { id: id });
      this.getCartData();
    },
    //删除选中的商品
    deleteAllShop() {
      this.shopData.forEach((item, index) => {
        if (item.isChecked == true || item.isChecked == 1) {
          this.deleteShop(item.id);
        }
      });
    },
    open2() {
      this.$message({
        message: "请勾选商品或加入商品至购物车中",
        type: "warning",
      });
    },
    //有选中的商品就跳转
    isNull() {
      if (this.isShopData[0]) {
        this.$router.push("/Trade");
      } else {
        this.open2();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 13%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3 {
        width: 15%;
      }
      .cart-th4 {
        width: 10%;
      }
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }

      .cart-th7 {
        width: 12%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 4.1667%;
        }

        .cart-list-con2 {
          width: 25%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 20.8333%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 12.5%;
        }

        .cart-list-con5 {
          width: 12.5%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12.5%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 12.5%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        .sum-btn {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>