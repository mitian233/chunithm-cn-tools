<template>
  <v-data-table :headers="headers" :items="titleList" :search="search" :loading="loading">
    <template #loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>
  </v-data-table>
</template>

<script>
export default {
  props: {
    search: String,
    titleList: Object,
    loading: Boolean,
    headers: Array,
  },
  data: () => {
    return {
    }
  },
  created() {
  },
  name: "titleTable"
}
</script>

<style scoped>

</style>
