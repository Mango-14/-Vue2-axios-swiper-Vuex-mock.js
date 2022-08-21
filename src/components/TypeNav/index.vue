<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @mouseenter="enterShow" @mouseleave="leaveShow">
      <h2 class="all">全部商品分类</h2>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
      <transition
        name="animate__animated animate__bounce"
        enter-active-class="animate__fadeInUp"
        leave-active-class="animate__fadeOut"
      >
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2">
            <!-- 事件委派gotosearch -->
            <div
              class="item"
              v-for="(c1, index) of categoryList"
              :key="c1.categoryid"
              @click="gotoSearch($event)"
            >
              <h3
                :class="{ cur: currentIndex == index }"
                @mouseenter="changeIndex(index)"
              >
                <a
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                >
              </h3>
              <!-- 二三级列表 -->
              <div class="item-list clearfix" v-show="currentIndex == index">
                <div
                  class="subitem"
                  v-for="c2 of c1.categoryChild"
                  :key="c2.categoryId"
                >
                  <dl class="fore">
                    <dt>
                      <a
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                      >
                    </dt>
                    <dd>
                      <em v-for="c3 of c2.categoryChild" :key="c3.categoryId">
                        <a
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                        >
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
//lodash防抖节流
import { throttle, debounce } from "lodash";
import "animate.css";

export default {
  name: "TypeNav",
  data() {
    return {
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    //跳转路由时非home组件自动隐藏TypeNav组件
    if (this.$route.path != "/home") {
      this.isShow = false;
    }
  },
  computed: {
    ...mapState("home", ["categoryList"]),
  },
  methods: {
    //节流
    //控制二三级列表出现
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    //控制三级联动在home中展示，在search中隐藏
    enterShow() {
      this.isShow = true;
    },
    //防抖
    leaveShow: debounce(function () {
      this.currentIndex = -1;
      if (this.$route.name != "Home") {
        this.isShow = false;
      }
    }, 50),
    //事件委派，点击a标签才路由跳转Search
    gotoSearch(e) {
      //自定义属性，浏览器在解析时会去掉前方的data-，同时将字母全部小写
      let { categoryname, category1id, category2id, category3id } =
        e.target.dataset;
      if (categoryname) {
        let location = { name: "Search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //当前有params参数带上一起跳转
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        location.query = query;
        this.$router.push(location);
      }
    },
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 27px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            //display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }

        .cur {
          background-color: pink;
        }
      }
    }
  }
}
</style>