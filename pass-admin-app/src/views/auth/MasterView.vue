<script setup>
import { ref } from "vue";
import { Unlock } from "@element-plus/icons-vue";

const input = ref("");
</script>

<template>
  <div class="master-password-main">
    <el-input
      v-model="input"
      style="width: 240px"
      type="password"
      placeholder="Please input password"
      show-password
    />
    <el-button :icon="Unlock" />
  </div>
</template>

<style scoped lang="scss">
.master-password-main {
  -webkit-app-region: drag;
  display: flex;
  justify-content: center;
}
</style>
