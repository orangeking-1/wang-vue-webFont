(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3753a3f2"],{"1d33":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"message"},[t._m(0),e("div",{directives:[{name:"loading",rawName:"v-loading",value:t.loading,expression:"loading"}],staticClass:"message-con"},[e("comment",{attrs:{title:"留言",commentList:t.commentList},on:{submitComment:t.addCommentFunc,deleteCommment:t.deleteCommmentFunc}})],1)])},a=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"message-img"},[e("img",{attrs:{src:n("3efe"),alt:"message-img"}}),e("div",{staticClass:"message-font"},[t._v("留言板")])])}],i=n("e335"),m={name:"messageBoard",components:{comment:i["a"]},data:function(){return{loading:!0,commentList:[],url:{addCommentUrl:this.$wang.api.addCommentUrl,getCommentlistUrl:this.$wang.api.getCommentlistUrl,deleteCommentUrl:this.$wang.api.deleteCommentUrl}}},methods:{getCommentFunc:function(){var t=this;this.$wang.ajax({url:this.url.getCommentlistUrl,param:{type:"1"}}).then((function(e){t.loading=!1,t.commentList=e.data})).catch((function(){t.loading=!1}))},addCommentFunc:function(t){var e=this,n={content:t,author:this.$store.state.userInfo._id,type:"1"};this.$wang.ajax({url:this.url.addCommentUrl,param:n}).then((function(t){0===t.code?(e.$message({message:"留言成功！",type:"success"}),e.getCommentFunc()):e.$message({message:"服务器出错",type:"error"})}))},deleteCommmentFunc:function(t){var e=this;this.$wang.ajax({url:this.url.deleteCommentUrl,param:{_id:t}}).then((function(t){0===t.code?(e.$message({message:"删除评论成功！",type:"success"}),e.getCommentFunc()):e.$message({message:"服务器出错",type:"error"})}))}},created:function(){this.getCommentFunc();var t={type:"1",content:"手动上报错误信息"};console.log(this.$wang.Sentry),this.$wang.Sentry.captureMessage("付费功能",JSON.stringify(t))}},o=m,c=(n("2bbd"),n("2877")),r=Object(c["a"])(o,s,a,!1,null,"75942b03",null);e["default"]=r.exports},"2bbd":function(t,e,n){"use strict";n("db60")},"3efe":function(t,e,n){t.exports=n.p+"img/messageBoard.0c4fb369.png"},b7f0:function(t,e,n){"use strict";n("c554")},c554:function(t,e,n){},db60:function(t,e,n){},e335:function(t,e,n){"use strict";var s=function(){var t=this,e=t._self._c;return e("div",{staticClass:"comment"},[e("div",{staticClass:"comment-title"},[e("div",{staticClass:"line"}),e("div",{staticClass:"title"},[t._v(t._s(t.title)+" "),e("span",{staticStyle:{color:"#666"}},[t._v("("+t._s(t.commentList.length)+"条)")])]),e("div",{staticClass:"line"})]),e("div",[t.commentList.length>0?t._l(t.commentList,(function(n,s){return e("div",{key:s,staticClass:"comment-content"},[e("div",{staticClass:"con-item"},[e("div",{staticClass:"con-avatar"},[n.author.avatar?[e("img",{attrs:{src:n.author.avatar,width:"100%",height:"100%",alt:"头像"}})]:[e("i",{staticClass:"iconfont icon-huabanfuben"})]],2),e("div",{staticClass:"con-message"},[e("div",{staticClass:"author"},[e("span",{staticClass:"name"},[t._v(t._s(n.author.account))]),e("span",{staticClass:"time"},[t._v(t._s(n.created_time))])]),e("div",{staticClass:"message"},[t._v("\n              "+t._s(n.content)+"\n            ")]),t.canComment?e("el-button",{staticClass:"el-icon-delete",attrs:{type:"text"},on:{click:function(e){return t.deleteCommentFunc(n._id)}}},[t._v("删除")]):t._e()],1)])])})):[e("div",{staticClass:"no-comment"},[t._v("\n        暂无评论，前去沙发\n      ")])]],2),e("div",{staticClass:"comment-form"},[e("div",{staticClass:"form-title"},[t._v("\n      发表评论：\n    ")]),e("div",{staticClass:"form-con"},[e("el-input",{attrs:{autosize:{minRows:4},type:"textarea",placeholder:"请填写评论"},model:{value:t.comment,callback:function(e){t.comment=e},expression:"comment"}})],1),e("div",{staticClass:"submit"},[e("el-button",{attrs:{type:"primary",round:"",size:"small"},on:{click:t.submitCommentFunc}},[t._v("提交")])],1)])])},a=[],i={name:"comment",props:{title:{type:String,require:!0,default:"评论"},commentList:{type:Array,required:!0}},data:function(){return{comment:"",canComment:!1}},methods:{submitCommentFunc:function(){var t=this;return this.$store.state.isLoginState?0===this.comment.length?(this.$message({type:"warning",message:"请填写评论后再提交"}),!1):(this.$emit("submitComment",this.comment),void(this.comment="")):(this.$alert("请您移步前去登录，然后发表评论啦😊",{confirmButtonText:"确定",callback:function(){t.$router.push("/login")}}),!1)},deleteCommentFunc:function(t){var e=this;this.$confirm("此操作将永久删除该评论, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$emit("deleteCommment",t)})).catch((function(){}))}},created:function(){this.canComment=this.$store.state.isLoginState&&JSON.parse(localStorage.getItem("userInfo")).admin}},m=i,o=(n("b7f0"),n("2877")),c=Object(o["a"])(m,s,a,!1,null,"f3ec3b04",null);e["a"]=c.exports}}]);
//# sourceMappingURL=chunk-3753a3f2.f7cb994d.js.map