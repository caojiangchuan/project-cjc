<template>
  <div>
    <h1>css垂直居中</h1>
    <div>1.使用绝对定位和负外边距对块级元素进行垂直居中(可以不需要定宽高)</div>
    <div class="one">
      <div></div>
    </div>
    <div>2.使用绝对定位和transform(可以不需要定宽高)</div>
    <div class="two">
      <div></div>
    </div>
    <div>3.绝对定位结合margin:auto(需要定宽高)</div>
    <div class="three">
      <div></div>
    </div>
    <div>4.使用flex布局(可以不需要定宽高)</div>
    <div class="four">
      <div></div>
    </div>
   
  </div>
</template>

<script>
export default {
    name: 'center'
}
</script>

<style scoped>
.one,
.two,
.three {
    width: 100%;
    height: 100px;
    border: 1px solid red;
}
.one > div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    margin-top: -25px;
    margin-left: -25px;
    background: red;
}
.one,
.two,
.three {
    position: relative;
}

.two > div {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 50px;
    height: 50px;
    background: red;
    transform: translate(-50%,-50%);
}
.three > div {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 50px;
    margin: auto;
    background: red;
}
.four {
    display: flex;
    width: 100%;
    height: 100px;
    border: 1px solid red;

    align-items: center;
    justify-content: center;
}
.four > div {
    width: 50px;
    height: 50px;
    background: red;
}
</style>