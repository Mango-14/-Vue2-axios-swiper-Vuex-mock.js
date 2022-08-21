<template>
  <div>
    <TypeNav />
    <ListContianer />
    <Reconmend />
    <Rank />
    <Like />
    <Floor v-for="floor of floorList" :key="floor.id" :list="floor" />
    <Brand />
  </div>
</template>

<script>
import TypeNav from "@/components/TypeNav";
import ListContianer from "./ListContainer/index.vue";
import Reconmend from "./Reconmend/index.vue";
import Rank from "./Rank/index.vue";
import Like from "./Like/index.vue";
import Floor from "./Floor/index.vue";
import Brand from "./Brand/index.vue";
import { mapState } from "vuex";
export default {
  components: {
    TypeNav,
    ListContianer,
    Reconmend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch("home/floorList");
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
};
</script>


<style></style>