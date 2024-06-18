<template>
  <Weather
    id="rightTop"
    :options="option"
    class="right_top_inner"
    v-if="pageflag"
    ref="charts"
  />
  <Reacquire v-else @onclick="getData" style="line-height: 190px">
    重新获取
  </Reacquire>
</template>

<script>
export default {
  data() {
    return {
      option: {},
      pageflag: false,
      timer: null,
    }
  },
  created() {},

  mounted() {
    this.getData()
  },
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
<style lang="scss" scoped>
.right_top_inner {
  margin-top: -8px;
}
</style>
