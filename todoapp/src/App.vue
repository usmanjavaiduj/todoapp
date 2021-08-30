<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import {mapActions} from "vuex"
export default {
  methods:{
    ...mapActions("settings", ["get_settings"]),
    ...mapActions("auth", ["handle_auth_state_change"])
  },
  mounted() {
    this.get_settings()
    this.handle_auth_state_change()
  }
}
</script>
