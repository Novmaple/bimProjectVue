<!-- 
业主主页
-->
<template>
  <div class="container">
    <div class="topDiv">
      <div class="logo">
        <img class="logo_img" src="@/assets/images/logo.png" alt="logo" />
      </div>
      <div class="tab">
        <el-menu
          mode="horizontal"
          text-color="#ccc"
          background-color="#173456"
          active-text-color="#fff"
          default-active="2"
        >
          <el-menu-item index="1">数字资产展示</el-menu-item>
          <el-menu-item index="2">设计协同管理</el-menu-item>
          <el-menu-item index="3">智慧施工管理</el-menu-item>
          <el-menu-item index="4">智慧运营维护</el-menu-item>
          <el-menu-item index="5">智慧文创旅游</el-menu-item>
        </el-menu>
      </div>
      <div class="user_logout">
        <el-button type="text" icon="el-icon-user">用户</el-button>
        <el-button type="text" icon="el-icon-switch-button" @click="logout"
          >退出</el-button
        >
      </div>
    </div>
    <div class="mainDiv">
      <div class="leftDiv">
        <div class="barChartDiv">
          <div class="titelDiv">
            <myTitleTwo :text="'评价专家组成情况'" :width="384" />
          </div>
          <div class="chartDiv">
            <barChart />
          </div>
        </div>
        <div class="circleChartOneDiv">
          <div class="titelDiv">
            <myTitleTwo :text="'评价专家组成情况'" :width="384" />
          </div>
          <div class="chartDiv">
            <circleChartOne />
          </div>
        </div>
        <div class="circleChartTwoDiv">
          <div class="titelDiv">
            <myTitleTwo :text="'评价专家组成情况'" :width="384" />
          </div>
          <div class="chartDiv">
            <circleChartTwo />
          </div>
        </div>
      </div>
      <div class="midDiv">
        <div class="footerDiv">
          <myButton
            class="myButtonDiv"
            :text="'发起评审'"
            :icon="'el-icon-document'"
            :fontSize="20"
          />
          <myButton
            class="myButtonDiv"
            :text="'管理评审'"
            :icon="'el-icon-s-tools'"
            :fontSize="20"
          />
        </div>
      </div>
      <div class="rightDiv">
        <div class="totalQuestionDiv">
          <totalQuestion />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import barChart from "@/components/userHome/barChart.vue";
import circleChartOne from "@/components/userHome/circleChartOne.vue";
import circleChartTwo from "@/components/userHome/circleChartTwo.vue";
import totalQuestion from "@/components/userHome/totalQuestion.vue";
export default {
  name: "userHome",
  components: {
    barChart,
    circleChartOne,
    circleChartTwo,
    totalQuestion,
  },
  data() {
    return {};
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  // 以下是设置背景
  background: url("../../assets/images/background.jpg") no-repeat center center;
  background-attachment: fixed;
  background-size: cover;
  -webkit-background-size: cover; /* 兼容Webkit内核浏览器如Chrome和Safari */
  -o-background-size: cover; /* 兼容Opera */

  .topDiv {
    width: 100%;
    height: 52px;
    line-height: 52px;
    background-color: #173456;
    text-align: center;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    /* 裁剪出一个梯形 */
    -webkit-clip-path: polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%);
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 100%,
      85% 100%,
      84% 50%,
      76% 50%,
      75% 100%,
      0% 100%
    );

    /* 布局为1：3.5：1.5 */
    .logo {
      width: 25%;
      height: 100%;
      min-width: 387px;

      .logo_img {
        height: 100%;
      }
    }

    .tab {
      flex: 1;
      height: 100%;
      display: flex;
      justify-content: center;
      align-content: center;

      .el-menu {
        /deep/ li.el-menu-item {
          height: 100%;
          line-height: 52px;
          font-size: 20px;
        }
      }
    }

    .user_logout {
      margin-left: 10%;
      width: 15%;
      height: 100%;
      display: flex;
      justify-content: space-evenly;

      .el-button {
        color: #fff;
        font-size: 18px;
      }
    }
  }

  .mainDiv {
    width: 100%;
    // 定义了 flex 后就不需要设定高度了
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;

    .leftDiv {
      color: #333;
      text-align: center;
      height: 95%;
      width: 384px;
      margin-left: 0.5%;
      /* 毛玻璃效果，见http://santhoshsivan.com/glass.html */
      background-color: rgba(14, 31, 56, 0.5);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
      -webkit-box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
      border-radius: 12px;
      -webkit-border-radius: 12px;
      color: rgb(128, 128, 128);
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      .barChartDiv {
        width: 100%;
        height: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .titleDiv {
          width: 100%;
          height: 40px;
          line-height: 40px;
        }

        .chartDiv {
          width: 100%;
          flex: 1;
        }
      }

      .circleChartOneDiv {
        width: 100%;
        height: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .titleDiv {
          width: 100%;
          height: 40px;
          line-height: 40px;
        }

        .chartDiv {
          width: 100%;
          flex: 1;
        }
      }

      .circleChartTwoDiv {
        width: 100%;
        height: 33.33%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .titleDiv {
          width: 100%;
          height: 40px;
          line-height: 40px;
        }

        .chartDiv {
          width: 100%;
          flex: 1;
        }
      }
    }

    .midDiv {
      flex: 1;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-end;

      .footerDiv {
        height: 15%;
        min-height: 50px;
        width: 90%;
        margin-bottom: 2.5%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;

        .myButtonDiv {
          width: 40%;
          min-width: 150px;
        }
      }
    }

    .rightDiv {
      color: #333;
      text-align: center;
      height: 95%;
      width: 672px;
      margin-right: 0.5%;
      /* 毛玻璃效果，见http://santhoshsivan.com/glass.html */
      background-color: rgba(14, 31, 56, 0.5);
      backdrop-filter: blur(6px);
      -webkit-backdrop-filter: blur(6px);
      border: 1px solid rgba(255, 255, 255, 0.18);
      box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
      -webkit-box-shadow: rgba(14, 14, 14, 0.19) 0px 6px 15px 0px;
      border-radius: 12px;
      -webkit-border-radius: 12px;
      color: rgb(128, 128, 128);
      display: flex;
      justify-content: center;
      align-items: center;

      .totalQuestionDiv {
        height: 100%;
        width: 98%;
      }
    }
  }
}
</style>