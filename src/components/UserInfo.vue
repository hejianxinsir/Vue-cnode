// https://cnodejs.org/api/v1/user/name  userinfo API
<template>
  <div class="userinfo">
    <!-- 加载动画 -->
    <div class="loading" v-if="isLoading">
      <img src="../assets/loading.gif">
    </div>
    <div class="userInfomation">

      <section>
        <p>主页</p>
        <img :src="userinfo.avatar_url" alt="">
        <span>{{userinfo.loginname}}</span>
        <p>{{userinfo.score}} 积分</p>
        <a href="https://github.com">
          <img src="../assets/github.svg">
          @{{userinfo.githubUsername}}
        </a>
        <p>注册时间 {{userinfo.create_at|formatDate}}</p>
      </section>

      <div class="create_topics">
        <p>最近创建的话题</p>
        <ul>
          <li v-for="item in items">
            <img :src="item.author.avatar_url">
            <router-link :to="{name: 'post_content', params: {id: item.id}}">
              <span class="title">{{item.title}}</span>
            </router-link>
            <span class="last_reply_at">{{item.last_reply_at|formatDate}}</span>
          </li>
        </ul>
      </div>

      <div class="replies">
        <p>最近参与的话题</p>
        <ul>
          <li v-for="reply in replies">
            <img :src="reply.author.avatar_url">
            <router-link :to="{name: 'post_content', params: {id: reply.id}}">
              <span class="title">{{reply.title}}</span>
            </router-link>
            <span class="last_reply_at">{{reply.last_reply_at|formatDate}}</span>
          </li>
        </ul>

      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'UserInfo',
  data(){
    return {
      isLoading: false,
      userinfo: {},
      items: [],
      replies: []
    }
  },
  methods: {
    getData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then( res => {
          console.log('userinfo response')
          console.log(this.userinfo)
          console.log(res)
          this.isLoading = false
          this.userinfo = res.data.data
          this.items = res.data.data.recent_topics
          this.replies = res.data.data.recent_replies
        })
        .catch( err => console.log(err) )
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  }
}
</script>




<style scoped>
.userInfomation {
    background: white;
    width: 75%;
    margin: 10px auto;
  }
  .userInfomation section {
    padding: 12px;
  }
  .userInfomation img {
    width: 30px;
  }
  .userInfomation li {
    list-style:none;
  }
  .userInfomation .create_topics,
  .userInfomation .topics {
    font-size: 0.72rem;
    border-top: 10px solid lightgray;
  }
.userInfomation .create_topics, .userInfomation .replies, section{
  border: 1px solid lightgray;
  border-radius: 3px;
  margin: 20px 0;
}
.userInfomation li{
  border-bottom: 1px solid lightgray;
  margin-top: 15px;
  display: flex;
  align-items: center;

  position: relative;
}
.userInfomation li .title{
  margin-left: 15px;
}
.userInfomation .last_reply_at{
  position: absolute;
  right: 20px;
  color: gray;
}
  .userInfomation > div > p {
    padding: 12px 0 12px 12px;
    background-color: rgba(212, 205, 205, 0.17);
    font-size: 0.75rem;
    margin: 0;
  }
  .userInfomation > div >ul > li {
    padding: 4px 0 4px 12px;
    white-space: nowrap;
    font-size: 0.72rem;
    text-overflow: ellipsis;
    overflow: hidden;
    line-height: 30px;
    vertical-align: middle;
  }
  .userInfomation > div >ul > li > a {
    color: #094E99;
    text-decoration: none;
  }

  section a{
    text-decoration: none;
    display: flex;
    align-items: center;
    margin-left: -6px;
  }
</style>