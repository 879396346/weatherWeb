<template>
  <!-- <div id="index" ref="appRef" class="index_home" :class="{ pageisScale: isScale }"> -->
  <ScaleScreen
    :width="1920"
    :height="1080"
    class="scale-wrap"
    :selfAdaption="$store.state.setting.isScale"
  >
    <div class="bg">
      <dv-loading v-if="loading">Loading...</dv-loading>
      <div v-else class="host-body">
        <!-- 头部 s -->
        <div class="d-flex jc-center title_wrap">
          <div class="zuojuxing"></div>
          <div class="youjuxing"></div>
          <div class="guang"></div>
          <div class="d-flex jc-center">
            <div class="title">
              <span class="title-time">{{ dateDay }}</span>
              <span class="title-text">空气质量监测</span>
              <span class="title-date">{{ dateYear }}</span>
            </div>
          </div>
        </div>
        <!-- 头部 e-->
        <!-- 内容  s-->
        <router-view></router-view>
        <!-- 内容 e -->
      </div>
    </div>
  </ScaleScreen>
  <!-- </div> -->
</template>

<script>
import { formatTime } from '../utils/index.js'
import ScaleScreen from '@/components/scale-screen/scale-screen.vue'
export default {
  components: { ScaleScreen },
  data() {
    return {
      timing: null,
      loading: true,
      dateDay: null,
      dateYear: null,
      dateWeek: null,
      weekday: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
    }
  },
  filters: {
    numsFilter(msg) {
      return msg || 0
    },
  },
  computed: {},
  created() {},
  mounted() {
    this.timeFn()
    this.cancelLoading()
  },
  beforeDestroy() {
    clearInterval(this.timing)
  },
  methods: {
    timeFn() {
      this.timing = setInterval(() => {
        this.dateDay = formatTime(new Date(), 'HH: mm: ss')
        this.dateYear = formatTime(new Date(), 'yyyy-MM-dd')
        this.dateWeek = this.weekday[new Date().getDay()]
      }, 1000)
    },
    cancelLoading() {
      let timer = setTimeout(() => {
        this.loading = false
        clearTimeout(timer)
      }, 500)
    },
  },
}
</script>

<style lang="scss">
@import './home.scss';
</style>
