(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-238ce5f1"],{"2cc3":function(t,e,i){"use strict";i("d1a7")},b2f0:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t._self._c;return e("div",{staticClass:"con"},[e("div",{staticClass:"title-tip"},[t._v("修改文章")]),e("div",{staticClass:"article-title"},[e("div",{staticClass:"title"},[t._v("标题：")]),e("el-input",{attrs:{placeholder:"请输入标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}})],1),e("div",{staticClass:"content"},[e("div",{staticClass:"title"},[t._v("内容：")]),e("markdown-editor",{ref:"markdownEditor",staticClass:"md-editor",attrs:{highlight:!0,sanitize:!0},model:{value:t.content,callback:function(e){t.content=e},expression:"content"}})],1),e("div",{staticClass:"btn"},[e("el-button",{attrs:{type:"primary",plain:""},on:{click:t.editArticleFunc}},[t._v("修改")])],1)])},s=[],c={name:"articleModify",data:function(){return{title:"",content:"",url:{editArticleUrl:this.$wang.api.editArticleUrl,getArticleDetail:this.$wang.api.getArticleDetail},articleId:""}},methods:{getArticleDetailFunc:function(){var t=this;this.articleId=this.$route.query.articleId,this.$wang.ajax({url:this.url.getArticleDetail,param:{articleId:this.articleId}}).then((function(e){0===e.code?(t.title=e.data.title,t.content=e.data.content):t.$message({message:"服务器出错",type:"error"})}))},editArticleFunc:function(){var t=this;if(""===this.title)return this.$message({message:"请填写标题",type:"warning"}),!1;if(""===this.content)return this.$message({message:"请输入内容",type:"warning"}),!1;var e={articleId:this.articleId,title:this.title,content:this.content};this.$wang.ajax({url:this.url.editArticleUrl,param:e}).then((function(e){0===e.code&&(t.$message({message:e.data,type:"success"}),t.$router.push({path:"/articleDetail",query:{articleId:t.articleId}}))}))}},created:function(){this.getArticleDetailFunc()}},n=c,l=(i("2cc3"),i("2877")),r=Object(l["a"])(n,a,s,!1,null,"f1ea82a8",null);e["default"]=r.exports},d1a7:function(t,e,i){}}]);
//# sourceMappingURL=chunk-238ce5f1.8f420c6e.js.map