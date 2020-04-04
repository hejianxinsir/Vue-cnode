<template>
  <div class="header">
      <img src="../assets/cnode.svg"/>
      <ul>
        <li><a href="#">首页</a></li>
        <li><a href="#">新手入门</a></li>
        <li><a href="#">API</a></li>
        <li><a href="#">关于</a></li>
        <li><a href="#">注册</a></li>
        <li><a href="#">登录</a></li>
      </ul>
  </div>
</template>

<script>
import Vue from 'vue'


export default {
  name: 'Header',
  methods: {
    
  }
}
</script>

<style scoped>
.header{
  background: #3d4143;
}
img{
  width: 135px;
  margin-left: 68px;
  margin-top: 6px;
  margin-bottom: 10px;
}
ul{
  list-style: none;
  float: right;
  margin: 0 65px;
  margin-top: 4px;
}
li{
  display: inline-block;
  padding: 10px 12px;
}
a{
  text-decoration: none;
  color: #c9c3b9;
  font-size: 14px;
}
</style>