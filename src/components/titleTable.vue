<template>
  <EasyDataTable :headers="headers" :items="titleList" :search-value="search" :loading="loading">
    <template #loading>
      <img
          src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
          style="width: 100px; height: 80px;"
      />
    </template>
    <template #empty-message>
      <p v-if="loading">正在加载……</p>
      <p v-else>没有找到相关称号</p>
    </template>
  </EasyDataTable>
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
