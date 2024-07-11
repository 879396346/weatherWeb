<template>
  <Echart id="leftCenterTop" :options="options" v-if="pageflag" ref="charts" />
  <Reacquire v-else @onclick="getData" line-height="150px">
    重新获取
  </Reacquire>
</template>

<script>
import * as echarts from 'echarts'
export default {
  props: {
    historyHumi: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        tooltip: {
          trigger: 'axis',
        },
        grid: {
          left: '2%',
          right: '2%',
          top: '5%',
          bottom: '10%',
          containLabel: true,
        },
        xAxis: {
          data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时'],
          axisLabel: {
            color: '#ccc',
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
          },
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
        },
        yAxis: {
          max: 100,
          min: 0,
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: '#fff',
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#192057',
            },
          },
        },
        dataZoom: [
          {
            type: 'inside',
          },
        ],
        series: [
          {
            type: 'bar',
            showBackground: true,
            barWidth: 10,
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#4deaf5' },
                { offset: 1, color: '#4389cf' },
              ]),
              borderRadius: [10, 10, 0, 0],
            },

            data: [],
          },
        ],
      },
      pageflag: true,
      timer: null,
    }
  },
  watch: {
    historyHumi: {
      handler(val) {
        this.options.series[0].data = val
        // this.getData()
      }
    }
  },
  created() {
    this.getData()
  },
  mounted() {},
  beforeDestroy() {
    this.clearData()
  },
  methods: {
    clearData() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    getData() {
      this.pageflag = true
    },
  },
}
</script>
<style lang="scss" scoped></style>
