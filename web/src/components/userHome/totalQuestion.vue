<template>
  <div class="com-container">
    <div class="container">
      <div class="topDiv">
        <div class="selectDiv">
          <mySelect
            @getSelectedValue="getSelectedValue"
            :options="selectData"
            :fontSize="22"
            v-if="selectData[0].value"
          />
        </div>
        <div class="buttonDiv">
          <myButton :text="'再次发起评审'" :fontSize="22" />
        </div>
        <div class="linkDiv">
          <a href="http://www.baidu.com">查看汇总报告>></a>
        </div>
      </div>
      <div class="questionDiv">
        <!-- 第一个 v-for 配合 v-if 来选择与 selectedValue 相同的模板 -->
        <div
          class="scoreDiv"
          v-for="item_allData in allData"
          :key="item_allData.activitiesId"
          v-if="item_allData.activitiesId == selectedValue"
        >
          <!-- 第二个 v-for 出问题块 -->
          <div
            class="stemDiv"
            v-for="(item_stem, stem_index) in item_allData.stem"
            :key="stem_index"
          >
            <span>
              {{ item_stem }}
              <div class="rateDiv">
                <el-rate
                  v-model="stemScore[stem_index]"
                  disabled
                  show-score
                  :colors="rateColor"
                  :text-color="'#50AFF1'"
                ></el-rate>
              </div>
            </span>
            <div
              class="branchDiv"
              v-for="(item_branch, branch_index) in item_allData.branch[
                stem_index
              ]"
              :key="branch_index"
            >
              <!-- &emsp; 为制表符 -->
              <span> &emsp;&emsp;{{ item_branch }}
                <div class="rateDiv">
                <el-rate
                  v-model="branchScore[stem_index][branch_index]"
                  disabled
                  show-score
                  :colors="rateColor"
                  :text-color="'#50AFF1'"
                  v-if="branchScore[stem_index]"
                ></el-rate>
              </div>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="recordDiv">
        <!-- 评价记录上部 -->
        <div class="recordTop">
          <myTitle :titleText="'历史评价记录'" />
          <span>
            <div>评价总人数:</div>
            <div>{{ totalPeople }}</div></span
          >
        </div>
        <!-- 评价记录 -->
        <div class="recordBody">
          <el-table
            :data="recordData"
            :style="{ background: 'transparent' }"
            height="195"
            :highlight-current-row="false"
            :header-cell-style="{
              background: 'transparent',
              fontSize: '20px',
              color: '#50aff1',
              fontWeight: 'normal',
              border: 'none',
            }"
          >
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60"
            ></el-table-column>
            <el-table-column
              prop="name"
              label="评价"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="unitType"
              label="角色"
              align="center"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="reviewTime"
              label="评价时间"
              align="center"
            ></el-table-column>
            <el-table-column
              prop="result"
              label="评价结果"
              align="center"
              width="120"
            >
              <template slot-scope="scope">
                <a href="http://www.baidu.com" :style="{ color: '#fff' }"
                  >查看</a
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // dataForm 中存放需要提交的表单数据
      dataForm: {
        userId: 1,
      },
      dataForm2: {
        userId: 1,
        activityId: 0,
      },
      allData: null,
      selectedValue: null,
      selectData: [{}],
      scoreData: null,
      // branchOfStem 用来记录当前的 selectedValue 下每一个 stem 里面有多少个 branch
      branchsOfStem: [],
      stemScore: [],
      branchScore: [],
      rateColor: ["#50AFF1", "#50AFF1", "#50AFF1"],
      // 下面是历史记录的变量
      totalPeople: 210,
      recordData: null,
    };
  },
  computed: {
    judgeIsVisible(name, isVisible) {
      return isVisible + name;
    },
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const { data: ret } = await this.$http.post(
        "review/getQuestion",
        this.dataForm
      );
      this.allData = ret.data;
      // console.log(this.allData);
      for (let item of this.allData) {
        let actiObject = {};
        actiObject.title = item.buildingName + " V" + item.version;
        actiObject.value = item.activitiesId;
        if (!this.selectData[0].title) {
          this.selectData.pop();
        }
        this.selectData.push(actiObject);
      }
    },
    getSelectedValue(value) {
      this.selectedValue = value;
      this.dataForm2.activityId = this.selectedValue;
      // console.log("selectedValue is " + this.selectedValue);
      if (this.selectedValue) {
        // 父组件获得 selectedValue 时，调用获取评分的函数
        // console.log(this.branchsOfStem)
        this.getScoreData();
      }
      this.getRecordCount();
      this.getRecord();
    },
    async getScoreData() {
      // console.log(this.dataForm2)
      const { data: ret } = await this.$http.post(
        "review/getScore",
        this.dataForm2
      );
      // 因为 mounted 只运行一次，所以 getData 只运行一次，也就说上面的
      // 的 dataForm 在这里可以进行改变
      // 无巧不成书
      // console.log(this.dataForm)
      this.scoreData = ret.data;
      // console.log("scoredata is");
      // console.log(this.scoreData);
      this.getBranchOfStem();
    },
    getBranchOfStem() {
      for (let item of this.allData) {
        if (this.selectedValue === item.activitiesId) {
          for (let i = 0; i < item.branch.length; i++) {
            this.branchsOfStem[i] = item.branch[i].length;
          }
        }
      }
      this.getAVGScore();
    },
    // 根据 stem 的 index 获取这个 stem 里面的平均分数和
    getAVGScore() {
      for (let index in this.branchsOfStem) {
        let startIndex = 0;
        for (let i = 0; i < index; i++) {
          startIndex += this.branchsOfStem[i];
        }
        let endIndex = startIndex + this.branchsOfStem[index];
        this.branchScore[index] = [];
        let sum = 0;
        for (let j = startIndex; j < endIndex; j++) {
          this.branchScore[index][j - startIndex] = this.scoreData[j].avgScore;
          sum += this.scoreData[j].avgScore;
        }
        this.stemScore[index] = parseFloat(
          (sum / this.branchScore[index].length).toFixed(2)
        );
      }
      // console.log(this.branchScore);
      // console.log(this.stemScore);
      this.$forceUpdate();
    },
    async getRecordCount() {
      const { data: ret } = await this.$http.post(
        "review/getRecordCount",
        this.dataForm2
      );
      this.totalPeople = ret.data[0].count;
      // console.log(this.totalPeople);
    },
    async getRecord() {
      const { data: ret } = await this.$http.post(
        "review/getRecord",
        this.dataForm2
      );
      this.recordData = ret.data;
      console.log(this.recordData);
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
  justify-content: space-evenly;
  align-items: center;
  overflow: hidden;
  // background-color: #2b4e96;

  .topDiv {
    width: 100%;
    height: 6%;
    min-height: 57px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .selectDiv {
      height: 90%;
      width: 36%;
    }

    .buttonDiv {
      height: 90%;
      width: 30%;
      min-width: 200px;
    }

    .linkDiv {
      height: 90%;
      width: 30%;
      min-width: 200px;

      a {
        color: #52b3f7;
        font-size: 22px;
        line-height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        letter-spacing: 2px;
      }
    }
  }

  .questionDiv {
    width: 100%;
    height: 60%;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    .scoreDiv {
      width: 100%;
      height: 100%;
      overflow: auto;

      .stemDiv {
        width: 100%;
        display: flex;
        flex-direction: column;

        span {
          color: #52b3f7;
          font-size: 20px;
          font-weight: bold;
          line-height: 30px;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .rateDiv {
            width: 155px;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
          }
        }

        .branchDiv {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            width: 100%;
            color: #fff;
            font-size: 18px;
            font-weight: normal;
            line-height: 31px;
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            .rateDiv {
              width: 155px;
              display: flex;
              justify-content: flex-start;
            }
          }
        }
      }
    }
  }

  .recordDiv {
    width: 100%;
    height: 26%;
    min-height: 160px;
    // background-color: rgb(167, 236, 154);

    .recordTop {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      span {
        color: #fff;
        font-size: 18px;
        line-height: 33px;
        width: 130px;
        margin-right: 25px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

    .recordBody {
      width: 100%;
      ::v-deep .el-table {
        /* 表格字体颜色 */
        color: white;
        /* 表格边框颜色 */
        border: 0.5px solid #fcfcfc00;
        height: 80%;
      }

      ::v-deep th.gutter {
        width: 5px;
        background-color: transparent;
      }

      /* 删除表格下横线 */
      ::v-deep .el-table::before {
        left: 0;
        bottom: 0;
        width: 100%;
        height: 0px;
      }
      /* 删除单元格底部横线 */
      ::v-deep .el-table td {
        background-color: transparent !important;
        border-bottom: 0px solid #dfe6ec !important;
      }
      ::v-deep .el-table,
      .el-table__expanded-cell {
        font-size: 18px;
        background-color: transparent;
      }

      ::v-deep .el-table tr {
        background-color: transparent !important;
      }
      ::v-deep .el-table--enable-row-transition .el-table__body td,
      .el-table .cell {
        background-color: transparent;
      }
    }
  }
}
/* 滚动条会占位置修改其样式 */
/deep/ ::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
/deep/ ::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  box-shadow: inset 0 0 5px rgba(30, 135, 240);
}
/deep/ ::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(30, 55, 80, 0.7);
  border-radius: 10px;
}
</style>

<style>
.headerRow {
  font-size: 20px;
}
</style>