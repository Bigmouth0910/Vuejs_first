<template>
  <div :style="(sheetData == undefined)?'background:white; padding:20px;width:auto;height:auto':'background:white; padding:0px;width:100%;height:100%;'">
     <!-- height: 1200px; -->
    <!-- <el-row v-if="sheetData != undefined" :gutter="20" style="height:750px;">
      <EmrEditor :key="editorKey"  :id="editorId" mod="edit" :content="content" :styleType="styleType" :transMst="transMst"/>
    </el-row> -->
    <el-row :gutter="20" style="width:100%;height:100%;margin:0px;overflow:auto">
      <el-col v-if="sheetData == undefined"  :xl="5" :lg="6" :md="7" :sm="7" :xs="24" style="height:850px;overflow:auto">
        <el-card class="box-card">
          <el-input
            placeholder="分類簡稱, 支持模糊搜索"
            clearable
            v-model="filterOrderText">
          </el-input>

          <el-tree
            class="filter-tree"
            :data="orderTreeData"
            :props="{ children: 'children',  label: 'SHEET_TITLE'}"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            node-key="ID"
            ref="tree"
            highlight-current
            @node-click="conceptTreeNodeClick">
            <span v-if="data.TRANS_ID !== undefined" class="custom-tree-node" slot-scope="{  data }">
                {{data.SHEET_TITLE}}
            </span>
            <span v-else slot-scope="{  data }">
                {{data.SHEET_TITLE}}
            </span>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :xl="sheetData == undefined?19:24" :lg="sheetData == undefined?18:24" :md="sheetData == undefined?17:24" :sm="sheetData == undefined?17:24" :xs="24" :style="(sheetData == undefined)?'height:750px;':'height:100%;padding:0px;'">
        <!-- <el-tabs type="border-card" >
          <el-tab-pane :label="sheetTitle" style="padding:0px" > -->
            <!-- <EmrEditor :id="editorId" mod="edit" :content="dataform.SHEET_HTML"/> -->
            <div class="emra-oak" >
              <EmrEditor ref="emrEditor" :key="editorKey"  :id="editorId" mod="edit" :content="content" :transMst="transMst" :showToolbar="sheetData == undefined" v-on:updateOrderTreeData="updateOrderTreeData"/>
            </div>
          <!-- </el-tab-pane>
        </el-tabs> -->
      </el-col>      
    </el-row>
  </div>
</template>

<script>

import { orderInfo } from '@/api/order'
import { sheetInfo } from '@/api/sheetdef'
import { transdtlInfo } from '@/api/transdtl'
import { transmstInfo } from '@/api/transmst'

import { getDoctorNames, getBasicInfos } from '@/api/external'

import EmrEditor from './components/EmrEditor/ueditor.vue'


export default {
  name: 'App',
  components: {
    EmrEditor
  },
  watch: {
    filterOrderText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      editor: undefined,
      editorId:"caseform",
      content:'',
      filterOrderText: '',
      list: [],
      transMstList: [],
      orderTreeData: [],
      sheetTitle:'',
      transMst: {},
      editorKey: +new Date(),
      sheetData: undefined,
      getVars: {},
      isLoadedData: false,
    }
  },
  mounted: function() {
    const editor = UE.getEditor(this.editorId)
    setTimeout(() => {
      this.editor = editor
    }, 100)

  },  
  created() {
    localStorage.removeItem("SHEET_ID")
    this.getList()

    let uri = window.location.href.split('?');
    if(uri.length == 2) {
      let vars = uri[1].split('&');
      let tmp = '';
      let getVars = {}
      vars.forEach(function(v) {
        tmp = v.split('=');
        if(tmp.length == 2)
          getVars[tmp[0]] = tmp[1];
      });
      this.getVars = getVars
    }
  },
  methods: {
    updateOrderTreeData() {
        this.orderTreeData = JSON.parse(localStorage.getItem("orderTreeData"))
    },
    getParameterByName(name, url = window.location.href) {
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    getList() {
      sheetInfo()
        .then(response => {
          this.list = response.data.result.rows
          transmstInfo()
          .then(response => {
            this.transMstList = response.data.result.rows
            this.getOrderTree()
          })
        })
    },
    getChildren(orderData) {
      orderData.SHEET_TITLE = orderData.FORDER_NAME 
      if(orderData.children === undefined) {
        orderData.children = this.list.filter(x=>x.FORDER_ID===orderData.FORDER_ID)
        for(var i=0;i<orderData.children.length;i++) {
          orderData.children[i].SHEET_TITLE = orderData.children[i].SHEET_TYPE + ",  " + orderData.children[i].SHEET_NAME
          var chd = this.transMstList.filter(x=>x.SHEET_ID === orderData.children[i].SHEET_ID)
          if(chd.length > 0) {
            for(var j=0;j<chd.length;j++) {
              chd[j].SHEET_TITLE = chd[j].TRANS_ID + ", " + chd[j].F_CREATORUSERID
              chd[j].PRELOAD_METHOD = orderData.children[i].PRELOAD_METHOD
              chd[j].ONLOAD_METHOD = orderData.children[i].ONLOAD_METHOD
              chd[j].AFTER_SAVE_METHOD = orderData.children[i].AFTER_SAVE_METHOD
              chd[j].SAVE_METHOD = orderData.children[i].SAVE_METHOD

              if(this.getParameterByName('TRANS_ID') === chd[j].TRANS_ID) {
                this.sheetData = chd[j]
                console.log("sheetData", this.sheetData)
              }
            }
            orderData.children[i].children = chd
          }

          // var transmst =  this.transMstList.filter(x=>x.SHEET_ID === orderData.children[i].SHEET_ID && x.TRANS_ID === this.getParameterByName("TRANS_ID"))
          // if(transmst.length > 0) {
          //   this.sheetData = orderData.children[i]
          //   console.log("sheetData", this.sheetData)
          // }
        }
      } else {
        for(var i=0;i<orderData.children.length;i++) {
          this.getChildren(orderData.children[i])
        }
      }
    },
    getOrderTree() {
      orderInfo()
        .then(response => {
          this.orderTreeData = response.data.result.rows
          console.log("orderTreeData", this.orderTreeData)
          for(var i=0;i<this.orderTreeData.length;i++) {
            this.getChildren(this.orderTreeData[i])
          }

          localStorage.setItem("orderTreeData", JSON.stringify(this.orderTreeData))
          this.isLoadedData = true
          if(this.sheetData)
            this.conceptTreeNodeClick(this.sheetData)
        })
    },
    filterNode(value, data, node) {
      if (!value) return true
      return data.SHEET_TITLE.indexOf(value) !== -1
    },
    loadBasicInfos() {
      getBasicInfos({"CHART_NO": "1050888"})
        .then(response => {
          try {
            // console.log("getBasicInfos", response)
            // var jsonObj = {"CHART_NO": "1050888","NAME": "李曉明" ,"SEX": 1 ,"BIRTH_DATE": '1990-01-01' ,"DEPT_NAME": "直腸外科","CRIS-CHECK": "大腸鏡檢查"};
            var jsonObj = response.data
            // console.log("jsonObj", jsonObj)
            var one = this.editor.document.getElementById("field6");
            one.getElementsByClassName("oak-field-value")[0].innerText = jsonObj["CHART_NO"]

            one = this.editor.document.getElementById("field2");
            one.getElementsByClassName("oak-field-value")[0].innerText = jsonObj["NAME"]

            one = this.editor.document.getElementById("OBS25");
            if(jsonObj["SEX"] == 1)
              one.getElementsByClassName("oak-field-value")[0].innerText = "男"
            else 
              one.getElementsByClassName("oak-field-value")[0].innerText = "女"

            one = this.editor.document.getElementById("field3");
            var obj = one.getAttribute("obj")
            obj = obj.split("'").join("\"")
            obj = JSON.parse(obj)
            // <input type="hidden" id="1500629671571" value="2017-07-18 17:34:25"/>
            this.editor.document.getElementById(obj['vel']).setAttribute("value", jsonObj["BIRTH_DATE"])
            // one.innerHTML = '<span class="oak-field oak-left" contenteditable="false" style="width: auto;">[</span>' + '<span class="oak-field oak-field-value" regnex="" contenteditable="false" onkeydown="if(window.getSelection().focusOffset==0){if(event.keyCode==8||event.keyCode==46){return false;}}" onblur="this.setAttribute("contenteditable",false)" onclick="this.setAttribute("contenteditable",true);this.focus();" style="min-height: 16px; min-width: 20px; color: rgb(60, 60, 60);">'+ jsonObj["BIRTH_DATE"] + '</span>' + '<span class="oak-field oak-right" contenteditable="false" style="width: auto;">]</span>'
            
            one = this.editor.document.getElementById("field5");
            one.getElementsByClassName("oak-field-value")[0].innerText = jsonObj["DEPT_NAME"]

            one = this.editor.document.getElementById("field8");
            one.getElementsByClassName("oak-field-value")[0].innerText = jsonObj["CRIS-CHECK"]
          }catch(e){}
        })
    },
    loadDoctorNames() {

        // getDoctorNames()
        //   .then(response => {
        //     // console.log("getDoctorNames", response)
        //     var one = this.editor.document.getElementById("field11");
        //     var objData = "{'type':'select','dynaUrl':'','orgname':'醫生名單','orgID':'field11','color':'#3c3c3c','defaultValue':'','bindData':[";
        //     for(var i=0;i<response.data.length;i++) {
        //       objData += "{'VALUE':'" + response.data[i] + "','TEXT':'" + response.data[i] + "','SELECTED':false},";
        //     }
        //     // objData += "{'VALUE':'李二','TEXT':'李二','SELECTED':false},";
        //     // objData += "{'VALUE':'陳文','TEXT':'陳文','SELECTED':false},";
        //     objData += "]}";
        //     one.setAttribute("obj", objData)
        //   })
        //   .catch(() => {
        //   })
    },
    conceptTreeNodeClick(data) {
      console.log("conceptTreeNodeClick", data)
      // this.styleType = JSON.parse(localStorage.getItem("SHEET_STYLETYPE"))
      if(data.FORDER_NAME !== undefined) { //root
        return
      }
      // if(data.children !== undefined) {  //design

      // } else {  //saved records

        this.orderTreeData = JSON.parse(localStorage.getItem("orderTreeData"))        
        localStorage.setItem("SHEET", JSON.stringify(data))
        // console.log("sheet", JSON.parse(localStorage.getItem("SHEET")))

        // this.sheetTitle = data.SHEET_TYPE
        console.log("node click SHEET_STYLETYPE", data.SHEET_STYLETYPE)        
        this.$refs.emrEditor.styleType_ = data.SHEET_STYLETYPE
        localStorage.setItem("SHEET_STYLETYPE", JSON.stringify(data.SHEET_STYLETYPE))

        var html = data.SHEET_HTML
        if(html === null) html = ''

        if(this.editor === undefined || this.editor === null) {
          this.editor = UE.getEditor(this.editorId)
        }

        localStorage.setItem("SHEET_ID", data.SHEET_ID)
        localStorage.setItem("SHEET_NAME", data.SHEET_NAME)
        localStorage.removeItem("TRANS_ID")

        if(data.TRANS_ID) {
          localStorage.setItem("TRANS_ID", data.TRANS_ID)
          localStorage.setItem("SMHC_STATUS", data.SMHC_STATUS)          
        }
        this.transMst = data

        this.content = html
        this.editor.setContent(html)
        this.loadBasicInfos();
        this.loadDoctorNames();

        this.updateComponents(data.TRANS_ID, this.editor.body)

        if(this.sheetData) {
          setTimeout(() => {
                // document.getElementById("edui126_body").click();
                // document.getElementById("edui122_body").click();
                var w = window.open("", "_blank", "");
                var d = w.document;
                d.open();
                d.write(this.editor.getAllHtml());
                console.log("preview_print", d);
                this.updateComponents(data.TRANS_ID, d)
                
                d.close();
              }, 1000)
        }

        // transmstInfo({SHEET_ID:data.SHEET_ID})
        //   .then(response => {
        //     var transList = response.data.result.rows

        //     if(transList.length > 0) {
        //       localStorage.setItem("TRANS_ID", transList[0].TRANS_ID)
        //       localStorage.setItem("SMHC_STATUS", transList[0].SMHC_STATUS)
        //       this.transMst = transList[0]
        //     }            
        //     if(transList.length === 0 || transList[0].SHEET_HTML === null) {
        //       this.content = html
        //       this.editor.setContent(html)
        //     } else {
        //       // this.editor.setContent(html)
        //       this.content = transList[0].SHEET_HTML
        //       this.editor.setContent(transList[0].SHEET_HTML)
        //     }
        //     this.loadBasicInfos();
        //     this.loadDoctorNames();

        //     this.updateComponents(data.SHEET_ID, this.editor.body)

        //     if(this.sheetData) {
        //       setTimeout(() => {
        //             // document.getElementById("edui126_body").click();
        //             // document.getElementById("edui122_body").click();
        //             var w = window.open("", "_blank", "");
        //             var d = w.document;
        //             d.open();
        //             d.write(this.editor.getAllHtml());
        //             console.log("preview_print", d);
        //             this.updateComponents(data.SHEET_ID, d)
                    
        //             d.close();
        //           }, 1000)
        //     }
            
        //   })
        //   .catch(() => {
        //     this.content = html
        //     this.editor.setContent(html)  
        //   })
      // }
    },
    updateComponents(trans_id, body) {
      if(trans_id === undefined) return
      transdtlInfo({TRANS_ID:trans_id})
        .then(response => {
            var transdtlList = response.data.result.rows
            // var body = this.editor.body            
            // console.log("updateComponents", body)
            for (var $children = body.getElementsByClassName("oakplugin"), widgets = [],wstr="", i = 0; i < $children.length; i++) {
              var obj = eval("(" + $children[i].getAttribute("obj") + ")"),
                  oakplugin = $children[i].getAttribute("oakplugin"), value;
              if ("input" == oakplugin || "select" == oakplugin) {
                  var target = $children[i].getElementsByClassName("oak-field-value")[0];
                  value = target.innerText
              } else if ("timeinput" == oakplugin) {
                  // var target = $children[i].getElementsByTagName("input")[1];
                  // $children[i].getElementsByTagName("input")[0].value = target.value
                  // console.log("children", target.value)
                  var inputs = $children[i].getElementsByTagName("input");
                  for(var k=0;k<transdtlList.length;k++) {
                    if(transdtlList[k].ITEM_EDIT_TYPE === oakplugin && transdtlList[k].ITEM_ID === obj.orgID && transdtlList[k].ITEM_NAME === obj.orgname) {
                      for (var j = 0;j < inputs.length;j++) {
                        inputs[j].value = transdtlList[k].ITEM_VALUE
                      }
                    }
                  }
                  // value = target.value
              } else if ("checkbox" == oakplugin || "radio" == oakplugin) {
                  var inputs = $children[i].getElementsByTagName("input");
                  // console.log("inputs", inputs)
                  // console.log("obj", obj)
                  value = [];
                  for (var j = 0;
                      j < inputs.length;
                      j++) {
                          // inputs[j].checked && value.push(inputs[j].value)
                      for(var k=0;k<transdtlList.length;k++) {
                        if(transdtlList[k].ITEM_EDIT_TYPE === oakplugin && transdtlList[k].ITEM_ID === obj.orgID && transdtlList[k].ITEM_NAME === obj.orgname) {
                            var valarray = transdtlList[k].ITEM_VALUE.split(",")
                            if(valarray.filter(x=>x===inputs[j].value).length > 0) {
                              inputs[j].checked = "true"
                            }
                        }
                      }
                  }
              } 
            }
            // this.editor.setContent(body.innerHTML)
            console.log("updateComponents", body)
            // if(this.sheetData) {
            //   setTimeout(() => {
            //     this.editor.execCommand('preview_print', "body");
            //         // document.getElementById("edui126_body").click();
            //         // document.getElementById("edui122_body").click();                    
            //       }, 1000)
            // }
        })
        .catch(() => {
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .custom-tree-node {
    /* flex: 1; */
    /* display: flex; */
    /* align-items: center; */
    /* justify-content: space-between; */
    white-space: pre-wrap;
    /* margin-top:5px;
    margin-bottom:5px; */
    line-height: 15px;
    /* overflow: auto; */
    font-size: 12px;
    /* padding-right: 8px; */
  }
</style>