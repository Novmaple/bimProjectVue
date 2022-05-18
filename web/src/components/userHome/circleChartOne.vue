<template>
  <div class="com-container">
    <div class="com-chart" ref="circleChartOne_ref"></div>
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
      this.chartInstance = this.$echarts.init(this.$refs.circleChartOne_ref);
      const initOption = {
        color: ["#3B8EEC", "#30D6FF", "#ED7C39"],
        tooltip: {
          trigger: "item",
        },
        legend: {
          bottom: "5%",
          textStyle: {
            color: "#ddd"
          },
          icon: "circle",
        },
        label: {
          color: "#ddd",
          formatter: "{d}%"
        },
        series: {
          type: "pie",
          radius: ["55%", "70%"],
          legendHoverLink: true,
        },
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
      let parts = this.allData.parts;
      let count = this.allData.count;
      let data = [{}, {}, {}];
      for (let i = 0; i < count.length; i++) {
        data[i].value = count[count.length - i - 1];
        data[i].name = parts[count.length - i - 1];
      }
      // console.log(data)
      const dataOption = {
        series: {
          data: data,
        },
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const refHeight = this.$refs.circleChartOne_ref.offsetHeight;
      const refWidth = this.$refs.circleChartOne_ref.offsetWidth;
      if (refHeight / refWidth > 0.8) {
        this.fontSize = (refWidth / 100) * 3;
      } else {
        this.fontSize = (refWidth / 100) * 3;
      }
      const adapterOption = {
        label: {
          fontSize: this.fontSize*1.5
        },
        legend: {
          textStyle: {
            fontSize: this.fontSize
          },
          itemGap: this.fontSize*4
        }
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInstance.resize();
    },
  },
};
</script>

<style>
</style>