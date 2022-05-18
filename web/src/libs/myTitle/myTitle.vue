<template>
  <div class="title">
    <span>{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: "myTitle",
  props: {
    titleText: {
      type: String,
      default: "这是一个标题",
    },
  },
  data(props) {
    return {
      title: props.titleText,
    };
  },
};
</script>

<style lang="less" scoped>
* {
  margin: 0;
  padding: 0;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

.title {
  width: 300px;
  line-height: 31px;
  /* 背景颜色采用线性渐变，角度为135度，0%为一个颜色，100%为一个颜色 */
  background-image: linear-gradient(
    90deg,
    rgba(0, 217, 255, 0.5) 0%,
    rgba(43, 78, 150, 0) 100%
  );
  border: 2px solid;
  border-right: none;
  border-image: linear-gradient(to right, #73eaff, #46678b) 1 2;
  display: flex;
}

span {
  margin-left: 15px;
  color: #fff;
  font-size: 20px;
  letter-spacing: 2px;
}
</style>