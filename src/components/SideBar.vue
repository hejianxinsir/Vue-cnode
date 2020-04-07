<template>
  <div class="sideInfo">

    <div class="personal">
      <p class="title">个人信息</p>
      <div class="author-wrapper">
        <router-link :to="{name: 'user_info', params: {name: userinfo.loginname}}">
          <img :src="userinfo.avatar_url">
        </router-link>
        <span>{{userinfo.loginname}}</span>
      </div>
      <p>积分: {{userinfo.score}}</p>
    </div>

    <div class="recentTopics">
      <p class="title">最近创建的主题</p>
      <ul>
        <li v-for="list in topiclimitby5"> 
          <router-link :to="{name: 'post_content', params: { id: list.id, name: list.author.loginname}}">
            <span>{{list.title}}</span>
          </router-link>
        </li>
      </ul>
    </div>
    
    <div class="recentReplies">
      <p class="title">最近回复的主题</p>
      <ul>
        <li v-for="list in replylimitby5"> 
          <span>{{list.title}}</span>
        </li>
      </ul>
    </div>

  </div>  
</template>

<script>
export default {
  name: 'SideBar',
  data(){
    return {
      userinfo: {}
    }
  },
  methods: {
    getData(){
      this.$http.get(`https://cnodejs.org/api/v1/user/${this.$route.params.name}`)
        .then( res => {
          console.log('SideBar res')
          console.log(res)
          this.userinfo = res.data.data
          console.log('userinfo')
          console.log(this.userinfo)
          console.log('userinfo.recent_topics.length')
          console.log(this.userinfo.recent_topics.length)
        })
        .catch( err => console.log(err))
    }
  },
  computed: {
    topiclimitby5(){
      let topicArr= this.userinfo.recent_topics
      if(topicArr){
        return topicArr.slice(0,5) 
      }
    },
    replylimitby5(){
      let replyArr = this.userinfo.recent_replies
      if(replyArr){
        return replyArr.slice(0,5)
      }
    }
  },
  beforeMount(){
    this.isLoading = true
    this.getData()
  }
}
</script>



<style scoped>
.sideInfo{
  float: right;
  margin: 30px 0;
  max-width: 25%;
  border-radius: 5px;
}
.sideInfo .title{
  font-size: 14px;
  color: #444;
  background: #f6f6f6;
  padding: 10px 0;
  padding-left: 10px;
}
.sideInfo .personal p:last-child{
  color: #333;
  font-size: 14px;
  margin: 0 5px;
}
.sideInfo .personal img{
  width: 48px; height: 48px;
  margin-right: 5px;
}
.sideInfo ul span{
  font-size: 14px;
}
.sideInfo ul{
  list-style: none;
}

.sideInfo .author-wrapper{
  display: flex;
  align-items: center;
  margin: 10px 5px;
}

.sideInfo .recentTopics{
  margin: 30px 0;
}
</style>


