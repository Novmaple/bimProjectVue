# BIM建筑评审项目前端部分

## 1 项目说明

- Vue2 项目

- 依赖与插件，见 package.json

```javascript
{
  "name": "web",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "serve": "vue-cli-service serve",
    "build": "vue-cli-service build"
  },
  "dependencies": {
    "axios": "^0.22.0",
    "core-js": "^3.6.5",
    "echarts": "^5.2.1",
    "element-ui": "^2.4.5",
    "less": "^4.1.2",
    "less-loader": "^6.0.0",
    "vue": "^2.6.11",
    "vue-router": "^3.2.0"
  },
  "devDependencies": {
    "@vue/cli-plugin-babel": "~4.5.0",
    "@vue/cli-plugin-router": "~4.5.0",
    "@vue/cli-service": "~4.5.0",
    "babel-plugin-component": "^1.1.1",
    "vue-cli-plugin-element": "^1.0.1",
    "vue-template-compiler": "^2.6.11"
  }
}

```

## 2 Coding 所遇问题

### 2.1 配置问题

- less-loader 需要安装老版本

`npm install less-loader@6.0.0 --save`

### 2.1 element-ui 使用

- Select 组件

v-model 中的值写错了，填入默认填入的 :value 的值

```vue
<el-select v-model="defaultOptionId">
    <el-option
               v-for="item in allData"
               :key="item.activitiesId"
               :label="item.buildingName + ' V'+ item.version"
               :value="item.activitiesId"
               ></el-option>
</el-select>
```

### 2.2 父子组件异步传值

- 父子组件生命周期函数运行顺序

*父created ----> 父beforemouted -------> 子created -------> 子beforemouted -----
	---->子mouted --------> 父mouted*

- 父子组件异步传值的坑

子组件的生命周期只会执行一次，但是当子组件渲染的时候父组件的数据还没接受完就会造成子组件没有任何 内容渲染

- 解决父子组件异步传值的方法

  - 给子组件添加渲染条件，使用v-if，当父组件数据接收完毕后在渲染子组件
  - 在子组件中添加watch监听，当父组件数据传输过来时，改变原有的默认数据，重新渲染页面

- 使用 v-if 解决

```javascript
<mySelect
            @getSelectValue="getSelectValue"
            :options="selectData"
            :fontSize="22"
            v-if="selectData[0].value"
          ></mySelect>
```

### 2.3 totalQuestion 中数据获取顺序

- 由于异步传值，除了使用mounted去传值的 allData，其他从后端和获取数据都是在渲染之后，所以此时使用的数据是上一次获取的数据
- 解决方法
  - 回头好好学 Vue 中 Ajax 的使用方法，懒加载、异步传值等等方法
  - 在获取数据之后使用 `this.$forceUpdate(); `重新渲染页面

### 2.4 element-ui 中表格样式调整

- `:cell-class-name="'cell'"` 这样所写的 cell 样式不能放在 scoped 中

```css
<style>
.cell {
  font-size: 22px;
  background-color: #e6160f;
}
</style>
```

- [elementUI table 修改表格背景色，去除单元格底部横线_HTML_萬仟网 (10qianwan.com)](https://www.10qianwan.com/articledetail/748293.html)

- [element-ui中的表格el-table滚动条样式修改_吴冬雪的博客-CSDN博客_element table 滚动条样式](https://blog.csdn.net/qq_37548296/article/details/89475399#:~:text=vue element-ui表格的滚动条样式修改 默认 element-ui table 固定表头或列时，当表列过多出现滚动时， 滚动条 效果如下，效果不是很好看（个人感觉）,8px%3B %2F* 滚动条 高度*%2F background - color%3A white%3B)

