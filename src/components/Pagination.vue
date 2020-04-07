<template>
  <div class="pagination">
    <button>首页</button>
    <button>上一页</button>
    <button v-for="btn in pagebtns" 
      :class="[{currentPage: btn == currentPage},'pagebtn']"
      @click="changeBtn(btn)"
     >
      {{btn}}
    </button>
    <button>下一页</button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  data(){
    return {
      pagebtns: [1,2,3,4,5, '...'],
      currentPage: 1
    }
  },
  methods: {
    changeBtn(page){
      this.currentPage = page 
      if(page === this.pagebtns[4]){
        // 把数组的第一个元素移除，再给数组添加一个比当前数组最大值还大 1 的元素。
        this.pagebtns.shift() // 移除第一个元素
        let last = this.pagebtns.length - 1
        let maxNum = this.pagebtns[last-1] + 1
        this.pagebtns.splice(last2, 0 ,maxNum)  // 末尾添加最大的元素
      }
    }
  }
}
</script>


<style scoped>
  .pagination{
    border: 1px solid gray;
    padding: 10px 20px;
  }
  .pagination button{
    border: 1px solid lightgray;
    border-radius: 3px;
    padding: 5px 8px;
    margin: 0 5px;
  }
  .pagination button:focus{
    outline: none;
  }
  .pagination .currentPage{
    border: 1px solid brown;
    background: brown;
    color: #fff;
  }
</style>