<template>
  <div id="app">
    <transition>
      <Notification v-if="isNotification" :info="info"/>
    </transition>
    <Test @loadNotification="loadNotification"/>
  </div>
</template>

<script>
import Notification from './components/Notification.vue'
import Test from './components/Test.vue'

export default {
  name: 'App',
  components: {
    Test,
    Notification
  },
  data() {
    return {
      isNotification: false,
      info: null
    }
  },
  methods: {
    loadNotification(text) {
      this.info = text;
      this.isNotification = true;
      setTimeout(() => this.isNotification = false, 4000)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top: 60px;
  max-width: 600px;
  margin: 0 auto;
}

.v-enter, .v-leave-to {
  opacity: 0;
  transform: translateX(150px);
}

.v-enter-to, .v-leave {
  opacity: 1;
  transform: translateX(0);
}

.v-enter-active, .v-leave-active {
  transition: all .5s ease;
}

</style>
