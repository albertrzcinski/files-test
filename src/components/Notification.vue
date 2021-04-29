<template>
    <div class="info-wrapper" :key="info">
        <div class="info-text">
        {{ info }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Notification',
    props: ['info']
}
</script>

<style>
.info-wrapper {
  position: absolute;
  top: 20px;
  right: 20px;
  background:#5481f0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.info-text {
    padding: 20px 30px;
    color: #fff;
}
</style>