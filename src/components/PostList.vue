<template>
  <div class="wrapper">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="postlist">
      <ul>
        <li class="toobar">
          <span>全部</span>
          <span>精华</span>
          <span>分享</span>
          <span>问答</span>
          <span>招聘</span>
        </li>
        <li v-for="post in posts">
          <img :src="post.author.avatar_url">
          <span class="count">
            <span class="reply_count">{{post.reply_count}}</span> /{{post.visit_count}}
          </span>
          <!-- 帖子的分类 -->
          <span :class="[{put_good:(post.good  == true),put_top:(post.top  == true),
        'topiclist-tab':(post.good  != true && post.top  != true)}]">
            <span>
              {{post | tabFormatter}}
            </span>
          </span>
          <span class="title">
            {{post.title}}
          </span>
          <span class="last_reply_at">
            {{post.last_reply_at | formatDate}}
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'postList',
  data(){
    return {
      isLoading: false,
      posts: []
    }
  },
  methods: {
    getData(){
      this.$http.get('https://cnodejs.org/api/v1/topics', {
        page: 1,
        limit: 10
      })
        .then(res => {
          console.log(res.data.data)
          this.isLoading = false
          this.posts = res.data.data
        })
        .catch( err => {
          console.log(err)
        })
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  }
}
</script>

<style scoped>
.loading{
  text-align: center;
  margin-top: 250px;
}
/* .wrapper{
    max-width: 958px;
    margin-left: 100px;
} */
.postlist img{
  width: 30px; height: 30px;
}
ul{
  border: 1px solid lightgray;
}
ul > li{
  border-bottom: 1px solid rgba(233,229,221);
  padding: 10px 0;
  font-size: 16px;

  position: relative;

  display: flex;
  align-items: center;
}
ul > li > .count{
  margin: 0 15px;
}
.last_reply_at{
  position: absolute;
  right: 10px;
  color: lightgray;
  font-size: 14px;
}
.reply_count{
  color: brown;
}
span.title{
  color: #3d4143;
}

.put_good, .put_top {
  background: #80bd01;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  color: #fff;
  font-size: 12px;
  margin-right: 10px;
}

.topiclist-tab {
  background-color: #e5e5e5;
  color: #999;
  padding: 2px 4px;
  border-radius: 3px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -o-border-radius: 3px;
  font-size: 12px;
  margin-right: 10px;
}

ul li:not(:first-child) {
  padding: 9px;
  font-size: 15px;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", STHeiti, sans-serif !important;
  font-weight: 400;
  background-color: white;
  color: #333;
  border-top: 1px solid #f0f0f0;
}

li:not(:first-child):hover {
    background: #f5f5f5;;
  }

li:last-child:hover {
  background: white;
}

.toobar{
  background: #edeae3;
}
.toobar > span{
  color: #79b301;
  font-size: 14px;
  margin: 0 5px;
  padding: 5px 10px;
  border-radius: 3px;
  cursor: pointer;
}
.toobar > span:hover{
  color: #f6f3ec;
  background: #60bd00;
}
</style>