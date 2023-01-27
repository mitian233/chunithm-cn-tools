<template>
  <v-app>
    <v-system-bar app >
      DEV VERSION
    </v-system-bar>
    <v-navigation-drawer v-model="drawer" temporary app>
      <v-list-item>
        <v-list-item-title class="title grey--text text--darken-2">
          CHUNITHM CN Tools
        </v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list density="compact" nav v-for="nav_list in nav_lists">
        <v-list-item :prepend-icon="nav_list.icon" :title="nav_list.name" :to="nav_list.link" :key="nav_list.name" />
      </v-list>
    </v-navigation-drawer>
    <v-app-bar color="primary" density="comfortable">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-app-bar-title>CHUNITHM 国服工具箱 - {{$route.meta.title}}</v-app-bar-title>
      <v-spacer/>
      <v-btn icon="mdi-fishbowl" @click="jumpToProber()"/>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item title="切换深色模式" prepend-icon="mdi-theme-light-dark" @click="this.toggleTheme()"/>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
    <!--<v-bottom-navigation>
      <v-btn value="recent">
        <v-icon>mdi-content-save-all</v-icon>
        Save All
      </v-btn>
      <v-btn value="favorites">
        <v-icon>mdi-heart</v-icon>
        Favorites
      </v-btn>
    </v-bottom-navigation>-->
  </v-app>
</template>

<script>
import { useTheme } from 'vuetify'
export default {
  setup() {
    const theme = useTheme()
    return {
      theme,
      toggleTheme: () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
      }
    }
  },
  data() {
    return {
      drawer: false,
      nav_lists: [
        {
          name: '主页',
          icon: 'mdi-home-outline',
          link: '/',
        },
        {
          name: '歌曲列表',
          icon: 'mdi-music-note',
          link: '/song',
        },
        {
          name: '称号列表',
          icon: 'mdi-list-box-outline',
          link: '/brand',
        },
        {
          name: 'OP 计算器',
          icon: 'mdi-calculator',
          link: '/op',
        },
        {
          name: '关于',
          icon: 'mdi-information',
          link: '/about',
        },
      ],
    }
  },
  methods:{
    jumpToProber: function(){
      window.open('https://www.diving-fish.com/maimaidx/prober/')
    },
  },
  beforeCreate() {
    localStorage.darkTheme = +window.matchMedia("(prefers-color-scheme: dark)").matches
  },
  created() {
    let matchMedia = window.matchMedia("(prefers-color-scheme: dark)")
    matchMedia.addEventListener("change", () => {
      this.darkTheme = matchMedia.matches
      this.toggleTheme(matchMedia.matches);
    });
    this.darkTheme = localStorage.darkTheme;
  }
}
</script>

<style>
</style>
