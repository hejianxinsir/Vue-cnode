<template>
  <div id="app">
    <Header/>
    <div class="main clearfix">
      <router-view name="main"></router-view>
      <router-view name="sideBar"></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header'
import PostList from './components/PostList'

export default {
  name: 'App',
  components: {
    Header,
    PostList
  }
}
</script>

<style>
*{
  margin: 0; padding: 0;
}
.main{
  width: 80%;
  margin: 0 auto;
}

.clearfix::after{
  clear: both;
  display: block;
  content: '';
}
</style>
