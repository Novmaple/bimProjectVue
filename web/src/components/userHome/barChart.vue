<template>
  <div class="com-container">
    <div class="com-chart" ref="barChart_ref"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      fontSize: 0,
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screenAdapter);
    this.screenAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screenAdapter);
  },
  methods: {
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.barChart_ref);
      const initOption = {
        grid: {
          top: "10%",
          left: "5%",
          right: "9%",
          bottom: "5%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          formatter: "{b0}：{c0}人",
          trigger: 'axis',
          axisPointer: {
            type: "shadow",
          },
        },
        xAxis: {
          type: "category",
          axisLabel: {
            color: "#ddd",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#4f8bb6",
              type: "dashed",
              width: 2,
            },
          },
        },
        yAxis: {
          type: "value",
          axisLabel: {
            color: "#ddd",
          },
          splitLine: {
            lineStyle: {
              color: "#4f8bb6",
              type: "dashed",
              width: 2,
            },
          },
        },
        series: [
          {
            type: "bar",
            barWidth: "33%",
            label: {
              show: true,
              position: "top",
              color: "#ddd",
            },
            // 下面是 echarts 调色盘，调整柱条颜色
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(59,142,236,0)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(59,142,236,1)", // 100% 处的颜色
                  },
                ],
                global: false, // 缺省为 false
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      const { data: ret } = await this.$http.get("experts/getComposition");
      this.allData = ret.data;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
      const parts = this.allData.parts;
      const count = this.allData.count;
      const dataOption = {
        xAxis: {
          data: parts,
        },
        series: [
          {
            data: count,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const refHeight = this.$refs.barChart_ref.offsetHeight;
      const refWidth = this.$refs.barChart_ref.offsetWidth;
      if (refHeight / refWidth > 0.8) {
        this.fontSize = (refWidth / 100) * 3.3;
      } else {
        this.fontSize = (refWidth / 100) * 3.3;
      }
      const adapterOption = {
        tooltip: {
          textStyle: {
            fontSize: this.fontSize*1.5,
          },
        },
        xAxis: {
          axisLabel: {
            fontSize: this.fontSize,
          },
        },
        yAxis: {
          axisLabel: {
            fontSize: this.fontSize * 1.3,
          },
        },
        series: [
          {
            label: {
              fontSize: this.fontSize * 1.3,
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>

<style>
.sd {
  color: #4f8bb6;
}
</style>