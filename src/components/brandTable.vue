<template>
  <EasyDataTable :headers="headers" :items="items" :search-value="search"/>
</template>

<script>
export default {
  props: {
    search: String,
    brandList: Object,
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
    for (let j = 0; j < this.brandList.music.length; j++) {
      this.items.push({
        id: idNumber,
        title: this.brandList.music[j].title,
        color: this.brandList.music[j].color,
        obtain: this.brandList.music[j].obtain,
        type: "乐曲称号",
      })
      idNumber++
    }
    for (let i = 0; i < this.brandList.nonmusic.length; i++) {
      this.items.push({
        id: idNumber,
        title: this.brandList.nonmusic[i].title,
        color: this.brandList.nonmusic[i].color,
        obtain: this.brandList.nonmusic[i].obtain,
        type: "非乐曲称号",
      })
      idNumber++
    }
  },
  name: "brandTable"
}
</script>

<style scoped>

</style>