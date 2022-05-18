<template>
    <div class="title" :style="{
        width: titleWidth + 'px'
    }">
      <span :style="{

      }">{{ titleText }}</span>
    </div>
</template>

<script>
export default {
    name: "myTitleTwo",
    props: {
        text: {
            type: String,
            default: "这是一个标题",
        },
        width: {
            type: Number,
            default: 300,
        }
    },
    data(props) {
        return {
            titleText: props.text,
            titleWidth: props.width
        }
    },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
}

.title {
  line-height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 2px solid #27456b;
  border-right: none;
  border-left: none;
  border-image: linear-gradient(
      to right,
      rgba(88, 222, 255, 0) 0%,
      rgb(88, 222, 255, 1) 50%,
      rgba(88, 222, 255, 0) 100%
    )
    1 2;
  background-image: linear-gradient(
    to right,
    rgba(88, 222, 255, 0) 0%,
    rgba(88, 222, 255, 0.2) 50%,
    rgba(88, 222, 255, 0) 100%
  );
  /* border-image: linear-gradient(to right, #00d9ff, #27456B) 1 2; */
}

span {
  color: #fff;
  font-size: larger;
  letter-spacing: 2px;
}
</style>