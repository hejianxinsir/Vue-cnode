// https://cnodejs.org/api/v1/topic + 帖子 ID

<template>
  <div class="article">
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div v-else>
      <div class="topic_header">
        <div class="span-wrapper">
          <span :class="[{put_good:(post.good  == true),put_top:(post.top  == true),
          'topiclist-tab':(post.good  != true && post.top  != true)}]">
              <span>
                {{post | tabFormatter}}
              </span>
          </span>
          <span class="topic_title">{{post.title}}</span>
        </div>
        <ul>
          <li>发布于：{{post.create_at | formatDate}}</li>
          <li>| 作者：{{post.author.loginname}}</li>
          <li>| {{post.visit_count}} 次浏览</li>
          <li>| 来自{{post | tabFormatter}}</li>
        </ul>
      </div>
      <div v-html="post.content" class="topic_content"></div>
      <div class="reply-wrapper">
        <div class="span_reply_wrapper">
          <span class="content_reply_count">{{post.reply_count}}</span>
          <span class="topbar">回复</span>
        </div>
        <div v-for="(reply, index) in post.replies">
          <router-link :to="">
            <img :src="post.author.avatar_url">
          </router-link>
          <router-link :to="">
            <span>{{post.author.loginname}}</span>
          </router-link>
          <span>{{index + 1}} 楼</span>
          <span v-if="reply.ups.length >0 ">
            👍{{reply.ups.length }}
          </span>
          <span v-else></span>
          <p v-html="reply.content"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'post',
  data(){
    return {
      isLoading: false,
      post: {}
    }
  },
  methods: {
    getArticle(){
      this.$http.get(`https://cnodejs.org/api/v1/topic/${this.$route.params.id}`)
        .then( res => {
          console.log('article res')
          console.log(res)
          this.isLoading = false

          if(res.data.success === true){
            this.post = res.data.data
          }
        })
        .catch( err => {
          console.log(err)
        } )
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getArticle()
  }
}
</script>

<style>
@import url('../assets/markdown-github.css');

.reply-wrapper{
  margin: 0 10px;
  border-radius: 5px;
}
.span_reply_wrapper{
  background: #f6f6f6;
  margin-bottom: 7px;
}
.span_reply_wrapper span{
  display: inline-block;
  padding: 7px 0;
}
.reply-wrapper img{
  width: 30px; height: 30px;
}
.reply-wrapper .topbar{
  font-size: 16px;
  background: #f6f6f6;
}

.content_reply_count{
  color: brown;
  font-size: 16px;
  margin-left: 7px;
}

.topic_content{
  margin: 0 10px;
}

.article ul{
  list-style: none;
}
.article ul > li{
  font-size: 14px;
  color: lightgray;
  display: inline-block;
  /* margin: 0 5px; */
}
.article .span-wrapper{
  display: flex;
  align-items: center;
}
.article{
  border: 1px solid lightgray;
  margin: 20px 0;
  border-radius: 5px;
}
.article .topic_header{
  margin: 10px;
}
.article .topic_header{
  border-bottom: 1px solid lightgray;
  padding-bottom: 10px;
}

.article .topic_title{
  font-size: 22px;
  color: #2c3135;
  font-weight: bold;
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


</style>
