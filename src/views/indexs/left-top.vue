<template>
  <Echart id="leftTop" :options="options" v-if="pageflag" ref="charts"/>
  <Reacquire v-else @onclick="getData" line-height="150px">
    重新获取
  </Reacquire>
</template>

<script>
export default {
  props: {
    historyTemp: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      options: {
        // title: {
        //   text: '222',
        //   textAlign: 'center'
        // },
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
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['0时', '1时', '2时', '3时', '4时', '5时', '6时', '7时', '8时', '9时', '10时', '11时'],
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
        ],
        yAxis: [
          {
            name: '单位：°C',
            nameTextStyle: {
              color: '#fff'
            },
            type: 'value',
            max: 40,
            min: 0,
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#192057',
              },
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              textStyle: {
                color: '#fff',
              },
            },
          },
        ],
        series: [
          {
            name: '温度',
            type: 'line',
            smooth: true,
            lineStyle: {
              color: '#91b6f3',
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
    historyTemp: {
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
      this.options.series[0].data = this.historyTemp
    },
  },
}
</script>
<style lang="scss" scoped></style>
