<script setup lang="ts">
import { getCurrentInstance } from "vue";
import DynDirective from "../src";

// 使用 Vue 的全局 API 注册自定义指令
const app = getCurrentInstance()!.appContext.app;
app.directive("dyn-directive", DynDirective);

const onClickOutside = () => {
  console.log("click outside");
};
</script>

<template>
  <h1>outside</h1>
  <main class="dyn-container" v-dyn-directive="onClickOutside">
    self <span>self children</span>
  </main>
</template>

<style lang="scss" scoped>
.dyn-container {
}
</style>
