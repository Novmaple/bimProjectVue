<template>
  <div class="com-container">
    <div class="com-chart" ref="circleChartTwo_ref"></div>
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
      this.chartInstance = this.$echarts.init(this.$refs.circleChartTwo_ref);
      const initOption = {
        color: ["#3B8EEC", "#30D6FF", "#ED7C39", "#6BB738", "#2EFFDB"],
        tooltip: {
          trigger: 'item'
        },
        label: {
          color: "#ddd",
          formatter: "{d}%"
        },
        legend: {
          right: "5%",
          bottom: "5%",
          textStyle: {
            color: "#ddd"
          },
          icon: "circle",
          orient: 'vertical'
        },
        series: [
          {
            type: "pie",
            radius: ["30%", "80%"],
            roseType: "radius",
            label: {
              position: "inside",
              color: "#fff"
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    async getData() {
      const { data: ret } = await this.$http.get("experts/getStar");
      this.allData = ret.data;
      console.log(this.allData);
      this.updateChart();
    },
    updateChart() {
      const data = this.allData;
      const dataOption = {
        series: [
          {
            data: data,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screenAdapter() {
      const refHeight = this.$refs.circleChartTwo_ref.offsetHeight;
      const refWidth = this.$refs.circleChartTwo_ref.offsetWidth;
      if (refHeight / refWidth > 0.8) {
        this.fontSize = (refWidth / 100) * 3;
      } else {
        this.fontSize = (refWidth / 100) * 3;
      }
      const adapterOption = {
        label: {
          fontSize: this.fontSize * 1.5
        },
        legend: {
          textStyle: {
            fontSize: this.fontSize
          },
          itemGap: this.fontSize
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