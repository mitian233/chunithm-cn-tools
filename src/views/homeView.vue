<template>
  <v-card>
    <div class="d-flex flex-column justify-center align-center" style="text-align: center">
      <img src="../assets/logo.png" alt="new-plus-logo" style="width: 300px;margin-top: 90px;">
      <h1 style="margin-top: 40px">国服工具箱</h1>
      <v-btn style="margin-top: 30px;margin-bottom: 40px" icon="mdi-arrow-right" color="primary" @click="goToSong()"></v-btn>
    </div>
  </v-card>
</template>
<script>
import { store } from "../store";
export default {
  methods: {
    goToSong() {
      store.drawer = true
    }
  },
  name: 'HomeView',
}
</script>
