<template>
  <div class="select" v-if="selectOptions">
    <h1 @click="changeDropDown">
      <div
        class="textDiv"
        :style="{ fontSize: selectFontsize + 'px' }"
        v-model="selectTitle"
      >
        {{ selectTitle }}
      </div>
      <i class="el-icon-arrow-down"></i>
    </h1>
    <ul v-show="isDropDown">
      <li
        v-for="(item, index) in selectOptions"
        :key="item.value"
        @click="changeOption(index)"
        v-if="item.value!=selectedValue"
      >
        <div class="textDiv" :style="{ fontSize: selectFontsize + 'px' }">
          {{ item.title }}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "mySelect",
  props: {
    options: {
      type: Array,
      // 对象形式的默认值得这样写
      default: [
        {
          title: "无选项",
          value: 0,
        },
      ],
    },
    fontSize: {
      type: Number,
      default: 25,
    },
  },
  data(props) {
    return {
      selectTitle: props.options[0].title,
      selectedValue: props.options[0].value,
      selectOptions: props.options,
      selectFontsize: props.fontSize,
      //   控制下拉列表
      isDropDown: false,
    };
  },
  mounted() {
    this.$emit("getSelectedValue", this.selectedValue);
  },
  methods: {
    changeDropDown() {
      this.isDropDown = !this.isDropDown;
    },
    changeOption(index) {
      this.selectTitle = this.selectOptions[index].title;
      this.selectedValue = this.selectOptions[index].value;
      this.isDropDown = !this.isDropDown;
      this.$emit("getSelectedValue", this.selectedValue);
    }
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
  list-style: none;
}

.select {
  width: 100%;
  position: relative;
  letter-spacing: 2px;

  h1 {
    width: 100%;
    height: 50px;
    line-height: 50px;
    cursor: pointer;
    color: #fff;
    user-select: none;
    font-weight: normal;
    background-color: rgba(30, 55, 80, 0.5);
    border: 1px solid #6fb2f0;
    border-radius: 10px;
    display: flex;
    justify-content: space-between;

    .textDiv {
      margin-left: 20px;
    }

    i {
      line-height: 50px;
      margin-right: 20px;
    }
  }

  ul {
    width: 100%;
    position: relative;
    z-index: 2;

    li {
      width: 100%;
      height: 50px;
      line-height: 50px;
      margin: 5px 0;
      border-radius: 10px;
      background-color: rgba(30, 55, 80, 0.7);
      border: 1px solid #6faff0;
      color: #fff;
      cursor: pointer;
      display: flex;

      .textDiv {
        margin-left: 20px;
      }
    }
  }
}
</style>