<!--
翻页组件说明：
使用方法：
# 引入
    import Page from './CustomModal.vue';
# 局部注册
    components:{Page}
# 调用
<Page
 :total-rows="100" :cut="cutNum"
  @pageChange="pageR" :pageOption="[10,20]">

> total-rows : [number]
  (必填) - 总的条数
> cut : [Boolean]
  - "true" 重置为第一页
> pageOption : [array]
  -  每页显示条数，默认[10,20,30]
> pageR      : [function]
  (必填) -  自定义回调函数
    function pageR (obj){
        obj.currentPage - 当前页数
        obj.totalList     当前显示条数
    }
 -->
 <template>
    <div class="crm-pagination-m btn-group pagination" role="group" aria-label="Pagination">
        <div class="total-num">
            共{{totalRows}}条
        </div>
        <button type="button" class="btn-default pagin-btn"
                :class="[btnSize]"
                :disabled="currentPage == 1 "
                @click.prevent="(currentPage == 1) ? _return : currentPage1(currentPage-1)">
            <span aria-hidden="true" v-if="currentPage != 1 ">
                <img src="../assets/images/block/uppage.png" height="16" width="16" alt="">
            </span>
            <span aria-hidden="true" v-if="currentPage == 1 ">
                <img src="../assets/images/block/upnoclick.png" height="16" width="16" alt="">
            </span>
        </button>

        <button type="button" class="btn-default"
                :class="[btnSize,currentPage == 1 ?  'active' : '']"
                @click.prevent="currentPage = 1"
                v-show="showPrev">1
        </button>

        <span :class="[btnSize]" v-show="showPrev">...</span>

        <button type="button" class="btn-default"
                :class="[btnSize,
                btnVariant(index),index + diff == currentPage ? 'active' : '',
                index + diff != currentPage ? 'hidden-xs-down' : '']"
                :cut="index+diff"
                :s="currentPage"
                v-for="(item,index) in pageLinks"
                @click.prevent="currentPage1(index + diff)">{{index + diff}}
        </button>

        <span :class="[btnSize]" v-show="showNext">...</span>

        <button type="button" class="btn-default"
                :class="[btnSize,numberOfPages == currentPage ? 'active' : '']"
                v-show="showNext"
                @click.prevent="currentPage = numberOfPages">{{numberOfPages}}
        </button>

        <button type="button" class="btn-default pagin-btn"
                :class="[btnSize]"
                :disabled="currentPage == numberOfPages"
                @click.prevent="(currentPage == numberOfPages) ? _return : currentPage1(currentPage+1)">
            <span aria-hidden="true" v-if="currentPage != numberOfPages">
                <img src="../assets/images/block/nextpage.png" height="16" width="16" alt="">
            </span>
            <span aria-hidden="true" v-if="currentPage == numberOfPages">
                <img src="../assets/images/block/nextnoclick.png" height="16" width="16" alt="">
            </span>
        </button>
        <span class="text" v-if="selectIsShow">每页</span>
        <select v-if="selectIsShow" @change="selectNum">
            <option v-for="item in pageOption" v-bind:value="item" >{{item}}</option>
        </select>
        <span class="text" v-if="selectIsShow">条</span>
    </div>
</template>

<script>
    export default {
        props: {
            pageOption:{
                type: Array,
                default: function() {
                    return [50, 80]
                }
            },
            limit: {
                type: Number,
                default: 7
            },
            // perPage: {
            //     type: Number,
            //     default: 20
            // },
            totalRows: {
                type: Number,
                default: 0
            },
            size: {
                type: String,
                default: 'secondary'
            },
            variant: {
                type: String,
                default: ''
            },
            cut:{
                type: Boolean,
                default: false,
            },
            selectIsShow:{
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                diff: 1,
                showPrev: false,
                showNext: false,
                currentPage: 1,
                perPage:null,     //每页显示条数
                cutChange: null,
            };
        },
        created(){
            this.perPage = this.pageOption[0]
        },
        computed: {
            numberOfPages() {
                const result = Math.ceil(this.totalRows / this.perPage);
                return (result < 1) ? 1 : result;
            },
            btnSize() {
                return !this.size || this.size === `default` ? `` : `btn-${this.size}`;
            },
            pageLinks() {
                let result = this.limit;
                if (this.currentPage > this.numberOfPages) {
                    this.currentPage = 1;
                }
                this.diff = 1;
                this.showPrev = false;
                this.showNext = false;
                // if less pages than limit just show this pages
                if (this.numberOfPages <= this.limit) {
                    return this.numberOfPages;
                }
                // if at the beggining of the list or at the end show full number of pages within limit - 2
                // -2 is reserves space for two buttons: "..." and "first/last button"
                if (this.currentPage <= this.limit - 2) {
                    this.diff = 1;
                    this.showNext = true;
                    result = this.limit - 2;
                }
                // at the end of the range
                if (this.currentPage > this.numberOfPages - this.limit + 2) {
                    this.diff = this.numberOfPages - this.limit + 3;
                    this.showPrev = true;
                    result = this.limit - 2;
                }
                // if somehere in the middle show just limit - 4 links in the middle and one button on the left with "..." and on button on the right preceeded with "..."
                if (this.currentPage >= this.limit - 2 && this.currentPage <= this.numberOfPages - this.limit + 2) {
                    this.diff = this.currentPage - 1;
                    this.showPrev = true;
                    this.showNext = true;
                    result = this.limit - 4;
                }
                return result;
            }
        },
        methods: {
            currentPage1(newPage){
                let pageNums = {
                    currentPage: newPage,
                    totalList: +this.perPage
                }
                this.currentPage = newPage
                this.$emit('pageChange', pageNums);
            },
            selectNum(e){
                this.perPage = e.target.value;
                let pageNums = {
                    currentPage: this.currentPage,
                    totalList: +this.perPage
                }
                this.$emit('pageChange', pageNums);
            },
            btnVariant(index) {
                return (index + this.diff === this.currentPage) ? `btn-${this.variant}` : `btn-secondary`;
            },
            _return() {

            }
        },
        updated(){
            // if(this.cut){
            //     //this.currentPage = 1
            // }
        },
        watch: {
            cut(value){
                if(value){console.log('page1');
                    this.currentPage = 1
                }
            }
            // currentPage(newPage) {
            //     let pageNums = {
            //         currentPage: newPage,
            //         totalList: +this.perPage
            //     }
            //     // this.$emit('pageChange', pageNums);
            // },
        }

    };

</script>
<style lang="scss">
.crm-pagination-m {
    font-size: 14px;
    color:#999;
    text-align: center;
    padding:20px 0;
    .text{
        margin:0 5px;
    }
}
.crm-pagination-m .active{
    color:#00b3d5;
    border:none
}
.total-num{display: inline-block;}
.btn-default{
    background:#fff;
    border:none;
    margin:0 5px;
}
.pagin-btn{
    border-radius: 0;
    cursor: pointer;
    background:#EEEEEE;
    width:24px;
    height:24px;
    border-radius:2px;
    &:hover{
        background:#f8f8f8
    }

}
.pagin-btn[disabled]:hover{
    background: #eeeeee;
}
</style>
