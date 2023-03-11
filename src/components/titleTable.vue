<template>
  <EasyDataTable :headers="headers" :items="titleList" :search-value="search" :loading="loading">
    <template #loading>
      <img
          src="https://i.pinimg.com/originals/94/fd/2b/94fd2bf50097ade743220761f41693d5.gif"
          style="width: 100px; height: 80px;"
      />
    </template>
    <template #empty-message>
      <p>正在加载……</p>
    </template>
  </EasyDataTable>
</template>

<script>
export default {
  props: {
    search: String,
    titleList: Object,
    loading: Boolean,
  },
  data: () => {
    return {
      headers: [
        {text:"编号",value:"id"},
        {text:"标题",value:"title"},
        {text:"颜色",value:"color"},
        {text:"获取条件",value:"obtain"},
      ],
    }
  },
  created() {
  },
  name: "titleTable"
}
</script>

<style scoped>

</style>