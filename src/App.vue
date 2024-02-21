<template>
  <v-app>
    <div v-if="ISDEV===true">
      <v-system-bar>DEV VERSION</v-system-bar>
    </div>
    <v-navigation-drawer v-model="homestore.drawer" temporary app>
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
      <v-app-bar-nav-icon @click.stop="homestore.drawer = !homestore.drawer" />
      <v-app-bar-title>{{$route.meta.title}} - CHUNITHM 国服工具箱</v-app-bar-title>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
        </template>
        <v-list>
          <v-list-item title="水鱼查分器" prepend-icon="mdi-fishbowl" @click="jumpToProber()"/>
          <v-list-item title="切换深色模式" prepend-icon="mdi-theme-light-dark" @click="this.toggleTheme()"/>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view />
<!--        <google-adsense />-->
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
import { homestore } from "./store"
import { useTheme } from 'vuetify'
import GoogleAdsense from "./components/googleAdsense.vue";
import NotifyBar from "./components/notifyBar.vue";
const ISDEV = false
export default {
  components: {NotifyBar, GoogleAdsense},
  setup() {
    const theme = useTheme()
    return {
      theme,
      toggleTheme: () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';

      }
    }
  },
  data() {
    return {
      homestore,
      ISDEV: ISDEV,
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
          link: '/title',
        },
        {
          name: 'OP 计算器',
          icon: 'mdi-calculator',
          link: '/op',
        },
        {
          name: 'Rating 计算器',
          icon: 'mdi-calculator',
          link: '/rating',
        },
        {
          name: '实验室',
          icon: 'mdi-flask-outline',
          link: '/labs',
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
      this.toggleTheme(matchMedia.matches)
    });
    this.darkTheme = localStorage.darkTheme
  }
}
</script>

<style>
</style>
