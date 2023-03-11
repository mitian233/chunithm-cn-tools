<template>
  <v-card>
    <v-card-title>关于工具箱</v-card-title>
    <v-container>
      <v-list>
        <v-list-item>
          <v-list-item-title>版本</v-list-item-title>
          <v-list-item-subtitle>Version</v-list-item-subtitle>
          <v-list>
            <v-list-item>
              <v-list-item-title>0.1.3</v-list-item-title>
              <v-list-item-subtitle>更新日期：2023年3月11日</v-list-item-subtitle>
              <p>添加称号分类方式。</p>
            </v-list-item>
          </v-list>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>

  <v-card style="margin-top: 10px">
    <v-card-title>贡献</v-card-title>
    <v-container>
      <v-list>
        <v-list-item>
          <v-list-item-title>开发者</v-list-item-title>
          <v-list-item-subtitle>Developer</v-list-item-subtitle>
          <p>Mikan</p>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>称号数据</v-list-item-title>
          <v-list-item-subtitle>Title Data</v-list-item-subtitle>
          <p>losffa</p>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>歌曲数据</v-list-item-title>
          <v-list-item-subtitle>Song Data</v-list-item-subtitle>
          <p>Diving-Fish 查分器 API</p>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>还有……</v-list-item-title>
          <v-list-item-subtitle>And...</v-list-item-subtitle>
          <p>您</p>
        </v-list-item>
        <v-list-item>
          <v-list-item-title>项目地址</v-list-item-title>
          <v-list-item-subtitle>Repository</v-list-item-subtitle>
          <p><a href="https://github.com/mitian233/chunithm-cn-tools">https://github.com/mitian233/chunithm-cn-tools</a></p>
        </v-list-item>
      </v-list>
    </v-container>
  </v-card>
</template>

<script>
export default {
  name: "aboutView"
}
</script>

<style scoped>

</style>