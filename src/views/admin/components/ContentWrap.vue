<template>
  <div class="admin_content ">
    <slot />
  </div>
</template>

<style scoped>
.admin_content {
  position: relative;
  /* top: 8rem; */
  padding: 1.25rem;
  height: auto;
  min-height: 100dvh;
  overflow: auto;
}
</style>
