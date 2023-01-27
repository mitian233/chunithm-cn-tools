<template>
  <EasyDataTable :headers="headers" :items="items" :search-value="search"/>
</template>

<script>
export default {
  props: {
    search: String,
    titleList: Object,
  },
  data: () => {
    return {
      headers: [
        {text:"编号",value:"id"},
        {text:"标题",value:"title"},
        {text:"颜色",value:"color"},
        {text:"获取条件",value:"obtain"},
        {text:"类型",value:"type"},
      ],
      items: [],
    }
  },
  created() {
    let idNumber = 1;
    for (let j = 0; j < this.titleList.music.length; j++) {
      this.items.push({
        id: idNumber,
        title: this.titleList.music[j].title,
        color: this.titleList.music[j].color,
        obtain: this.titleList.music[j].obtain,
        type: "乐曲称号",
      })
      idNumber++
    }
    for (let i = 0; i < this.titleList.nonmusic.length; i++) {
      this.items.push({
        id: idNumber,
        title: this.titleList.nonmusic[i].title,
        color: this.titleList.nonmusic[i].color,
        obtain: this.titleList.nonmusic[i].obtain,
        type: "非乐曲称号",
      })
      idNumber++
    }
  },
  name: "titleTable"
}
</script>

<style scoped>

</style>