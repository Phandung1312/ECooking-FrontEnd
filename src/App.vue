<template>
  <div>
    <router-view />
    <notifications> </notifications>
  </div>
</template>

<script></script>
<style>
.btn {
  transform: scale(1);
  transition: transform 0.3s ease;
}

.btn:hover {
  transform: scale(1.08);
}
</style>
