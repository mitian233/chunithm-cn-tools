<template>
  <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
    <n-loading-bar-provider>
      <n-dialog-provider>
        <n-notification-provider>
          <n-message-provider>
            <n-layout has-sider>
              <!-- 桌面端侧边栏 -->
              <n-layout-sider
                v-if="!isMobile"
                bordered
                collapse-mode="width"
                :collapsed-width="64"
                :width="240"
                :collapsed="collapsed"
                show-trigger
                @collapse="collapsed = true"
                @expand="collapsed = false"
              >
                <div class="logo-container">
                  <n-text v-if="!collapsed" class="logo-text">CHUNITHM CN Tools</n-text>
                  <n-text v-else class="logo-text-mini">CN</n-text>
                </div>
                <n-menu
                  :collapsed="collapsed"
                  :collapsed-width="64"
                  :collapsed-icon-size="22"
                  :options="menuOptions"
                  :value="currentKey"
                  @update:value="handleMenuUpdate"
                />
              </n-layout-sider>

              <!-- 移动端抽屉 -->
              <n-drawer v-model:show="drawerVisible" :width="240" placement="left">
                <n-drawer-content title="CHUNITHM CN Tools" :native-scrollbar="false">
                  <n-menu
                    :options="menuOptions"
                    :value="currentKey"
                    @update:value="handleMenuUpdateMobile"
                  />
                </n-drawer-content>
              </n-drawer>

              <n-layout>
                <n-layout-header bordered class="header">
                  <n-space justify="space-between" align="center" style="width: 100%">
                    <n-space align="center">
                      <n-button v-if="isMobile" quaternary @click="drawerVisible = true">
                        <template #icon>
                          <n-icon :component="MenuOutline" />
                        </template>
                      </n-button>
                      <n-text class="header-title">
                        {{ $route.meta.title }} - CHUNITHM 国服工具箱
                      </n-text>
                    </n-space>
                    <n-space>
                      <n-button text @click="jumpToProber">
                        <template #icon>
                          <n-icon><FishOutline /></n-icon>
                        </template>
                        <span v-if="!isMobile">水鱼查分器</span>
                      </n-button>
                      <n-button text @click="toggleTheme">
                        <template #icon>
                          <n-icon>
                            <MoonOutline v-if="!isDark" />
                            <SunnyOutline v-else />
                          </n-icon>
                        </template>
                        <span v-if="!isMobile">{{ isDark ? '浅色模式' : '深色模式' }}</span>
                      </n-button>
                    </n-space>
                  </n-space>
                </n-layout-header>
                <n-layout-content class="content" :class="{ 'content-mobile': isMobile }">
                  <router-view />
                </n-layout-content>
              </n-layout>
            </n-layout>
          </n-message-provider>
        </n-notification-provider>
      </n-dialog-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import { ref, computed, h, onMounted, onUnmounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { darkTheme, zhCN, dateZhCN } from 'naive-ui';
import { NIcon } from 'naive-ui';
import {
  HomeOutline,
  MusicalNotesOutline,
  CalculatorOutline,
  FlaskOutline,
  InformationCircleOutline,
  MoonOutline,
  SunnyOutline,
  FishOutline,
  MenuOutline,
} from '@vicons/ionicons5';

const router = useRouter();
const route = useRoute();
const collapsed = ref(false);
const isDark = ref(false);
const isMobile = ref(false);
const drawerVisible = ref(false);

const theme = computed(() => (isDark.value ? darkTheme : null));

const MOBILE_BREAKPOINT = 768;

function checkMobile() {
  isMobile.value = window.innerWidth < MOBILE_BREAKPOINT;
}

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menuOptions = [
  {
    label: '主页',
    key: '/',
    icon: renderIcon(HomeOutline),
  },
  {
    label: '歌曲列表',
    key: '/song',
    icon: renderIcon(MusicalNotesOutline),
  },
  {
    label: 'OP 计算器',
    key: '/op',
    icon: renderIcon(CalculatorOutline),
  },
  {
    label: 'Rating 计算器',
    key: '/rating',
    icon: renderIcon(CalculatorOutline),
  },
  {
    label: '实验室',
    key: '/labs',
    icon: renderIcon(FlaskOutline),
  },
  {
    label: '关于',
    key: '/about',
    icon: renderIcon(InformationCircleOutline),
  },
];

const currentKey = computed(() => {
  const path = route.path;
  if (path.startsWith('/song')) return '/song';
  return path;
});

function handleMenuUpdate(key) {
  router.push(key);
}

function handleMenuUpdateMobile(key) {
  router.push(key);
  drawerVisible.value = false;
}

function toggleTheme() {
  isDark.value = !isDark.value;
}

function jumpToProber() {
  window.open('https://www.diving-fish.com/maimaidx/prober/');
}

onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});
</script>

<style scoped>
.logo-container {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--n-border-color);
}

.logo-text {
  font-size: 16px;
  font-weight: 600;
}

.logo-text-mini {
  font-size: 18px;
  font-weight: 700;
}

.header {
  height: 64px;
  padding: 0 16px;
  display: flex;
  align-items: center;
}

@media (min-width: 768px) {
  .header {
    padding: 0 24px;
  }
}

.header-title {
  font-size: 14px;
  font-weight: 500;
}

@media (min-width: 768px) {
  .header-title {
    font-size: 16px;
  }
}

.content {
  padding: 16px;
  min-height: calc(100vh - 64px);
}

@media (min-width: 768px) {
  .content {
    padding: 24px;
  }
}
</style>
