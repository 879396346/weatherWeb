<template>
  <Echart id="leftCenterTop" :options="options" v-if="pageflag" ref="charts" />
  <Reacquire v-else @onclick="getData" line-height="150px">
    重新获取
  </Reacquire>
</template>

<script>
import * as echarts from 'echarts'
export default {
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
          data: ['01/12', '01/12', '01/12', '01/12', '01/12', '01/12', '01/12'],
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

            data: [220, 182, 191, 234, 1000, 566, 666],
          },
        ],
      },
      pageflag: true,
      timer: null,
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
