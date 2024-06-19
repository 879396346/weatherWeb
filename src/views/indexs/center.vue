<template>
  <div class="center">
    <div class="center-top">
      <div class="center-top-item">一楼</div>
      <div class="center-top-item">二楼</div>
      <div class="center-top-item">地下室</div>
    </div>
    <dv-border-box-13 class="center-bottom">
      <Echart id="center" :options="options" ref="charts" />
    </dv-border-box-13>
  </div>
</template>

<script>
const getLinearGradient = (color1, color2) => {
  return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
    {
      offset: 0,
      color: color2,
    },
    {
      offset: 0.5,
      color: color1,
    },
    {
      offset: 1,
      color: color1,
    },
  ])
}
import * as echarts from 'echarts'
export default {
  data() {
    return {
      options: {
        series: [
          {
            type: 'gauge',
            startAngle: 225,
            endAngle: 315,
            center: ['50%', '50%'],
            radius: '50%',
            min: 0,
            max: 300,
            splitNumber: 12,
            axisLine: {
              lineStyle: {
                width: 6,
                color: [
                  [0.1666666667, getLinearGradient('#0bfa7c', '#ffff00')],
                  [0.3333333333, getLinearGradient('#ffff00', '#ffa500')],
                  [0.5, getLinearGradient('#ffa500', '#ff0000')],
                  [0.6666666667, getLinearGradient('#8b008b', '#ff0000')],
                  [0.8333333333, getLinearGradient('#a52a2a', '#8b008b')],
                  [1, '#a52a2a'],
                ],
              },
            },
            pointer: {
              icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
              length: '12%',
              width: 20,
              offsetCenter: [0, '-60%'],
              itemStyle: {
                color: 'auto',
              },
            },
            axisTick: {
              length: 12,
              lineStyle: {
                color: 'auto',
                width: 2,
              },
            },
            splitLine: {
              length: 20,
              lineStyle: {
                color: 'auto',
                width: 5,
              },
            },
            title: {
              offsetCenter: [0, '80%'],
              fontSize: 20,
            },
            detail: {
              fontSize: 50,
              fontWeight: 200,
              offsetCenter: [0, 0],
              valueAnimation: true,
              color: 'white',
            },
            data: [
              {
                value: 31,
                name: '',
              },
            ],
          },
        ],
      },
    }
  },
  created() {
    let name = this.getLevel(this.options.series[0].data[0].value)
    this.options.series[0].data[0].name = name
  },

  mounted() {},
  methods: {
    getLevel(value) {
      if (value <= 50) {
        return '优'
      } else if (value <= 100) {
        return '良'
      } else if (value <= 150) {
        return '轻度污染'
      } else if (value <= 200) {
        return '中度污染'
      } else if (value <= 250) {
        return '重度污染'
      } else if (value > 250) {
        return '严重污染'
      }
      return ''
    },
  },
}
</script>
<style lang="scss" scoped>
.center {
  height: 100%;
  .center-top {
    display: flex;
    margin: 20px 0;
    .center-top-item {
      width: 100px;
      height: 32px;
      border-radius: 16px;
      border: 1px solid #343b8a;
      line-height: 32px;
      text-align: center;
      margin-left: 20px;
    }
  }
  .center-bottom {
    height: calc(100% - 100px);
  }
}
</style>
