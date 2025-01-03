(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-25101084"],{"31b6":function(e,t,a){},"5cc8":function(e,t,a){"use strict";a.r(t);a("7f7f");var r=function(){var e=this,t=e._self._c;return t("div",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],staticClass:"project"},[t("div",{staticClass:"title"},[e.isAddProject?[e._v("\n      添加项目\n    ")]:[e._v("\n      修改项目\n    ")]],2),t("div",{staticClass:"project-picture"},[t("el-upload",{attrs:{action:"","http-request":e.httpRequest,"list-type":"picture-card","file-list":e.projectImg,"on-preview":e.handlePictureCardPreview,"on-remove":e.handleRemove}},[t("i",{staticClass:"el-icon-plus"})]),t("el-dialog",{attrs:{visible:e.dialogVisible},on:{"update:visible":function(t){e.dialogVisible=t}}},[t("img",{attrs:{width:"100%",src:e.dialogImageUrl,alt:""}})])],1),t("div",{staticClass:"project-con"},[t("el-form",{ref:"param",attrs:{rules:e.rules,model:e.param,"label-width":"100px"}},[t("el-form-item",{attrs:{label:"项目名称：",prop:"name"}},[t("el-input",{attrs:{placeholder:"请填写名称"},model:{value:e.param.name,callback:function(t){e.$set(e.param,"name",t)},expression:"param.name"}})],1),t("el-form-item",{attrs:{label:"开发周期：",prop:"cycle"}},[t("el-input",{attrs:{placeholder:"请填写周期"},model:{value:e.param.cycle,callback:function(t){e.$set(e.param,"cycle",t)},expression:"param.cycle"}},[t("template",{slot:"append"},[e._v("月")])],2)],1),t("el-form-item",{attrs:{label:"项目介绍：",prop:"introduce"}},[t("el-input",{attrs:{type:"textarea",placeholder:"项目的介绍"},model:{value:e.param.introduce,callback:function(t){e.$set(e.param,"introduce",t)},expression:"param.introduce"}})],1),t("el-form-item",{attrs:{label:"负责模块：",prop:"doit"}},[t("el-input",{attrs:{type:"textarea",placeholder:"负责做的模块"},model:{value:e.param.doit,callback:function(t){e.$set(e.param,"doit",t)},expression:"param.doit"}})],1),t("el-form-item",{attrs:{label:"技术支持：",prop:"skill"}},[t("el-input",{attrs:{type:"textarea",placeholder:"项目所用到的技术"},model:{value:e.param.skill,callback:function(t){e.$set(e.param,"skill",t)},expression:"param.skill"}})],1),t("el-form-item",[e.isAddProject?[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.addProjectFunc("param")}}},[e._v("添加项目")])]:[t("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.editProjectFunc("param")}}},[e._v("修改项目")])]],2)],1)],1)])},i=[],l={name:"projectAddOrModify",data:function(){return{loading:!0,isAddProject:!0,param:{name:"",cycle:"",introduce:"",doit:"",skill:"",img:[]},rules:{name:[{required:!0,message:"请填写项目名称",trigger:"blur"}],introduce:[{required:!0,message:"项目的介绍",trigger:"blur"}],doit:[{required:!0,message:"负责做的模块",trigger:"blur"}],skill:[{required:!0,message:"项目所用到的技术",trigger:"blur"}]},url:{addProjectUrl:this.$wang.api.addProjectUrl,getProjectDetailUrl:this.$wang.api.getProjectDetailUrl,editProjectUrl:this.$wang.api.editProjectUrl},projectImg:[],dialogImageUrl:"",dialogVisible:!1}},methods:{handleRemove:function(e,t){var a=this;this.param.img.map((function(t,r){if(e.id===t.id)return a.param.img.splice(r,1),!1}))},httpRequest:function(e){var t=this;console.log(e.file);var a={};a.id=e.file.uid,this.$wang.base64(e.file).then((function(e){0===e.code?(a.url=e.data,t.param.img.push(a)):t.$message.error("图片传化失败")}))},handlePictureCardPreview:function(e){this.dialogImageUrl=e.url,this.dialogVisible=!0},getProjectDetailFunc:function(){var e=this;this.$wang.ajax({url:this.url.getProjectDetailUrl,param:{_id:this.$route.query.projectId}}).then((function(t){0===t.code?(e.param=t.data,e.loading=!1,e.projectImg=JSON.parse(JSON.stringify(t.data)).img):e.$message({message:"服务器链接失败",type:"warning"})}))},addProjectFunc:function(e){var t=this;if(0===this.param.img.length)return this.$message.error("请上传项目图片"),!1;this.$refs[e].validate((function(e){e&&t.$wang.ajax({url:t.url.addProjectUrl,param:t.param}).then((function(e){0===e.code?(t.$message({message:e.data,type:"success"}),t.$router.push("/projectList")):t.$message({message:"服务器链接失败",type:"warning"})}))}))},editProjectFunc:function(e){var t=this;if(0===this.param.img.length)return this.$message.error("请上传项目图片"),!1;this.$refs[e].validate((function(e){e&&t.$wang.ajax({url:t.url.editProjectUrl,param:t.param}).then((function(e){0===e.code?(t.$message({message:e.data,type:"success"}),t.$router.push("/projectList")):t.$message({message:"服务器链接失败",type:"warning"})}))}))}},created:function(){this.$route.query.projectId?(this.isAddProject=!1,this.getProjectDetailFunc()):(this.isAddProject=!0,this.loading=!1)}},s=l,n=(a("add0"),a("2877")),o=Object(n["a"])(s,r,i,!1,null,"411d6e12",null);t["default"]=o.exports},"7f7f":function(e,t,a){var r=a("86cc").f,i=Function.prototype,l=/^\s*function ([^ (]*)/,s="name";s in i||a("9e1e")&&r(i,s,{configurable:!0,get:function(){try{return(""+this).match(l)[1]}catch(e){return""}}})},add0:function(e,t,a){"use strict";a("31b6")}}]);
//# sourceMappingURL=chunk-25101084.d7a9db21.js.map