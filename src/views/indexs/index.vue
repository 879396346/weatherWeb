<template>
  <div class="contents">
    <div class="contetn_left">
      <div class="pagetab">
         <div class="item"><img src="../../assets/img/5.png" />{{ roomNo }}</div>
      </div>
      <ItemWrap class="contetn_left-top contetn_lr-item" title="室内历史温度" v-loading="loading1">
        <LeftTop :historyTemp="historyTemp"/>
      </ItemWrap>
      <ItemWrap class="contetn_left-center contetn_lr-item" title="室内历史湿度" v-loading="loading2">
        <LeftCenterTop :historyHumi="historyHumi"/>
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="室内历史PM2.5" v-loading="loading3">
        <RightCenterTop :historyPM="historyPM"/>
      </ItemWrap>
<!--      <ItemWrap class="contetn_left-center contetn_lr-item" title="室内CO2">-->
<!--        <LeftCenterBottom />-->
<!--      </ItemWrap>-->
<!--      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="室内tovc">-->
<!--        <LeftBottom />-->
<!--      </ItemWrap>-->
    </div>
<!--    <div class="contetn_center">-->
<!--      <Center class="contetn_center_top" />-->
<!--    </div>-->
    <div class="contetn_right">
      <div class="right_item" v-for="item in allData"  :key="item.id" @click="getHistory(item)">
        <span class="floorNo">楼层：{{item.floor}}</span>
        <span class="roomNo">房间号：{{item.roomNumber}}</span>
        <div class="temperature">
          <div class="pic"><img src="../../assets/img/1.png"  alt=""/></div>
          <div class="value">{{ item.temperature }}<span>°C</span></div>
        </div>
        <div class="humidity">
          <div class="pic"><img src="../../assets/img/2.png"  alt=""/></div>
          <div class="value">{{ item.humidity }}<span>%RH</span></div>
        </div>
        <div class="pm">
          <div class="pic"><img src="../../assets/img/3.png"  alt=""/></div>
          <div class="value">{{ item.pm25 }}<span>μg/m³</span></div>
        </div>
      </div>
<!--      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="室外温度">-->
<!--        <RightTop />-->
<!--      </ItemWrap>-->

<!--      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="室内甲醛">-->
<!--        <RightCenterBottom />-->
<!--      </ItemWrap>-->
<!--      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="室内含湿量 ">-->
<!--        <RightBottom />-->
<!--      </ItemWrap>-->
    </div>
  </div>
</template>

<script>
import LeftTop from './left-top.vue'
import LeftCenterTop from './left-center-top.vue'
import LeftCenterBottom from './left-center-bottom.vue'
import LeftBottom from './left-bottom.vue'
import Center from './center.vue'
import RightTop from './right-top.vue'
import RightCenterTop from './right-center-top.vue'
import RightCenterBottom from './right-center-bottom.vue'
import RightBottom from './right-bottom.vue'
import {GET} from "../../api/api";
// 在你的组件中，你可以通过this.$websocket来发送消息、设置回调函数。这个插件提供了一个统一的接口来管理WebSocket连接，
// 并且可以在Vue的生命周期钩子中注册和注销WebSocket的事件处理函数。
export default {
  components: {
    LeftTop,
    LeftCenterTop,
    LeftCenterBottom,
    LeftBottom,
    Center,
    RightTop,
    RightCenterTop,
    RightCenterBottom,
    RightBottom,
  },
  data() {
    return {
      historyTemp: [],
      historyHumi: [],
      historyPM: [],
      loading1: false,
      loading2: false,
      loading3: false,
      roomNo: '',
      allData: [],
      floorMap: [
        {
          id: 1,
          value: '一'
        },
        {
          id: 2,
          value: '二'
        },
        {
          id: 3,
          value: '三'
        },
        {
          id: 4,
          value: '四'
        },
        {
          id: 5,
          value: '五'
        },
        {
          id: 6,
          value: '六'
        },
      ]
    }
  },
  filters: {
    numsFilter(msg) {
      return msg || 0
    },
  },
  async created() {
    // this.$websocket
    await GET('/device/getAllRoomAirParam').then(res=>{
      if (res.data.success && res.data.data.length) {
        res.data.data.forEach(item => {
          this.floorMap.forEach(item1 => {
            if (Number(item.floor) === item1.id) {
              item.floor = item1.value
            }
          })
        });
        this.allData = res.data.data;
        this.allData.push({},{},{},{},{},{},{})
        this.getHistory(res.data.data[0])
      }
    },err=>{
      console.log(err);
    })
  },
  mounted() {},
  methods: {
    getHistory(val) {
      this.loading1 = true;
      this.loading2 = true;
      this.loading3 = true;
      this.roomNo = val.roomNumber;
      GET(`device/getTodayOneRoomAirParam?number=${val.deviceNumber}`).then(res=>{
        if (res.data.success) {
          this.historyTemp = res.data.data.temperature;
          this.historyHumi = res.data.data.humidity;
          this.historyPM = res.data.data.pm25;
          this.loading1 = false;
          this.loading2 = false;
          this.loading3 = false;
        }
      },err=>{
        console.log(err);
        this.loading1 = false;
        this.loading2 = false;
        this.loading3 = false;
      });
    }
  },
}
</script>
<style lang="scss" scoped>
// 内容
.contents {
  .contetn_left {
    width: 30%;
  }
  .contetn_right {
    overflow-y: auto;
    overflow-x: hidden;
    width: 70%;
    margin: 55px 30px;
    height: calc(100% - 105px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    /*padding: 20px;*/
    flex-wrap: wrap;
    /*right_item:nth-child() {*/
    /*  justify-self: start;*/
    /*}*/
    .right_item {
      cursor: pointer;
      flex: 0 0 calc(33.33% - 50px);
      /*width: calc(33.33% - 100px);*/
      height: 220px;
      text-align: center;
      padding: 10px;
      margin-bottom: 26px;
      margin-left: 10px;
      margin-right: 10px;
      /*background: #27fcff;*/
      border: 2px solid #4d67b6;
      border-radius: 5px;
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      transition: transform 0.5s ease;
      .floorNo {
        position: absolute;
        top: 20px;
        left: 20px;
        font-weight: 600;
      }
      .roomNo {
        position: absolute;
        top: 20px;
        right: 20px;
        font-weight: 600;
      }
      .temperature {
        margin-left: 10px;
        .pic {
          margin-bottom: 20px;
        }
        .value {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 700;
          color: #4d67b6;
        }
        span {
          margin-left: 5px;
          font-size: 14px;
          color: #fff;
        }
      }
      .humidity {
        .pic {
          margin-bottom: 20px;
        }
        .value {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 700;
          color: #4d67b6;
        }
        span {
          margin-left: 5px;
          font-size: 14px;
          color: #fff;
        }
      }
      .pm {
        margin-right: 10px;
        .pic {
          margin-bottom: 20px;
        }
        .value {
          margin-top: 20px;
          font-size: 20px;
          font-weight: 700;
          color: #4d67b6;
        }
        span {
          margin-left: 5px;
          font-size: 14px;
          color: #fff;
        }
      }
      img {
        /*filter: ;*/
        width: 50px;
        height: 50px;
      }
    }
    .right_item:hover {
      box-shadow: 0 8px 16px 0 #33b4d4; /* 鼠标悬停时添加阴影 */
      transform: scale(1.01);
    }
    .right_item::before, .right_item::after {
      content: '';
      position: absolute;
      width: 30px;
      height: 30px;
      background-color: transparent;
      border: 2px solid #33b4d4;
    }
    .right_item::before {
      top: 0;
      left: 0;
      border-right: none;
      border-bottom: none;
    }
    .right_item::after {
      bottom: 0;
      right: 0;
      border-left: none;
      border-top: none;
    }
    .right_item::after:nth-child(2) { /* 注意：这不是标准的CSS，仅用于说明 */
      /* 实际上，我们需要再创建两个伪元素或使用其他方法 */
      top: 0;
      right: 0;
      border-left: none;
      border-bottom: none;
    }
  }
  .contetn_right::-webkit-scrollbar {
    width: 10px;
  }
  .contetn_right::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  .contetn_right::-webkit-scrollbar-thumb {
    background: #45cbff;
    border-radius: 10px;
  }
  .contetn_right::-webkit-scrollbar-thumb:hover {
    background: #4d67b6;
  }
  .contetn_left,
  .contetn_right {
    /*width: 540px;*/
    box-sizing: border-box;
    // padding: 16px 0;
  }

  .contetn_center {
    width: 720px;
  }

  //左右两侧 三个块
  .contetn_lr-item {
    height: 239px;
  }

  .contetn_center_top {
    width: 100%;
  }

  // 中间
  .contetn_center {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .contetn_center-bottom {
    height: 315px;
  }

  //左边 右边 结构一样
  .contetn_left {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    position: relative;
  }
  ::v-deep .el-loading-mask {
    background-color: transparent !important;
    /*opacity: 0.2;*/
    /*border-radius: 5px;*/
    /*width: 90%;*/
    /*height: 90%;*/
    .path {
      /*fill: #00eaff;*/
      stroke: #fff;
    }
  }
}

@keyframes rotating {
  0% {
    -webkit-transform: rotate(0) scale(1);
    transform: rotate(0) scale(1);
  }
  50% {
    -webkit-transform: rotate(180deg) scale(1.1);
    transform: rotate(180deg) scale(1.1);
  }
  100% {
    -webkit-transform: rotate(360deg) scale(1);
    transform: rotate(360deg) scale(1);
  }
}
</style>
