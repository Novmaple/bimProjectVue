<template>
  <button class="btn" ref="btn_ref">
    <i :class="icon" :style="{ fontSize: btnFontSize + 'px' }"></i>
    <span :style="{ fontSize: btnFontSize + 'px' }">&nbsp;{{ btnText }}</span>
  </button>
</template>

<script>
export default {
  name: "myButton",
  props: {
    text: {
      type: String,
      default: "Button",
    },
    icon: {
      type: String,
      default: ""
    },
    fontSize: {
      type: Number,
      default: 25,
    },
  },
  data(props) {
    return {
      btnText: props.text,
      btnFontSize: props.fontSize,
    };
  },
  mounted() {
    const btn = this.$refs.btn_ref;
    btn.onmousemove = function (e) {
      const x = e.pageX - btn.offsetLeft;
      const y = e.pageY - btn.offsetTop;

      btn.style.setProperty("--x", x + "px");
      btn.style.setProperty("--y", y + "px");
    };
  },
  methods: {},
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

.btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  position: relative;
  /* 背景颜色采用线性渐变，角度为135度，0%为一个颜色，100%为一个颜色 */
  background-color: rgba(30, 55, 80, 0.5);
  border-radius: 10px;
  border: 1px solid #6fb2f0;
  color: #fff;
  cursor: pointer;
  /* 去除 focus 时的样式变化 */
  outline: none;
  overflow: hidden;
  letter-spacing: 2px;

  i {
    height: 100%;
  }
}

.btn span {
  position: relative;
}

.btn::before {
  /* 定义css变量 */
  --size: 0;
  content: "";
  position: absolute;
  /* 修改为js定义的css变量 */
  left: var(--x);
  right: var(--y);
  width: var(--size);
  height: var(--size);
  /* 径向渐变 */
  background: radial-gradient(circle closest-side, #68aae7, transparent);
  transform: translate(-50%, -20%);
  transition: all 0.2s ease, left 0s, top 0s;
}

.btn:hover::before {
  --size: 150px;
}
</style>