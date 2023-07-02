<template>
  <div style="display:flex">
    <div >
      <div style="display:flex">
        <div style="display:flex">
          <div class="el-row" style="padding-right:15px;height:31px">
            <div class="edui-default" style="margin-top:2px">
              <div class="edui-toolbar">
                <div class="edui-box edui-button" @click="createNew">
                  <div class="edui-button-wrap ">
                    <span class="toolbar-item" > 新建 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="el-row"  style="padding-right:15px;height:31px">
            <!-- <span class="toolbar-item"> 打開本地文件 </span> -->
            <div class="edui-default" style="margin-top:2px">
              <div class="edui-toolbar">
                <div class="edui-box edui-button" @click="saveDocument(0)">
                  <div class="edui-button-wrap">
                    <span class="toolbar-item" > 儲存 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-if="SMHC_STATUS!='1'" class="el-row"  style="padding-right:15px;height:31px">
            <!-- <span class="toolbar-item"> 打開本地文件 </span> -->
            <div class="edui-default" style="margin-top:2px">
              <div class="edui-toolbar">
                <div class="edui-box edui-button" @click="saveDocument(1)">
                  <div class="edui-button-wrap">
                    <span class="toolbar-item" > 暫存 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- <div class="el-row" style="height:31px">
            <div class="edui-default">
              <div class="edui-toolbar">
                <div class="edui-button-wrap">
                  <span class="toolbar-item">  </span>
                </div>
              </div>
            </div>
          </div> -->
        </div>
        <div style="display:flex">
          <div class="el-row" style="padding-right:15px;">
            <!-- <span class="toolbar-item"> 導出為xml文件 </span> -->
            <div class="edui-default">
              <div class="edui-toolbar">
                <div id="edui130" class="edui-box edui-button edui-for-allwidgets-1">
                  <div class="edui-button-wrap">
                    <div id="edui130_body" unselectable="on" title="获取所有控件" class="edui-button-body" @click="getAllWidgets">
                      <div class="edui-box edui-icon" style="marginTop:3px">
                      </div>
                      <span class="toolbar-item"> 获取所有控件 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="el-row" style="padding-right:15px;">
            <!-- <span class="toolbar-item"> 導出為pdf文件 </span> -->
            <div class="edui-default">
              <div class="edui-toolbar">
                <div id="edui131" class="edui-box edui-button edui-for-allhtml-1">
                  <!-- <div id="edui131_state" onmousedown="$EDITORUI[&quot;edui131&quot;].Stateful_onMouseDown(event, this);" onmouseup="$EDITORUI[&quot;edui131&quot;].Stateful_onMouseUp(event, this);" onmouseover="$EDITORUI[&quot;edui131&quot;].Stateful_onMouseOver(event, this);" onmouseout="$EDITORUI[&quot;edui131&quot;].Stateful_onMouseOut(event, this);"> -->
                    <div class="edui-button-wrap">
                      <div id="edui131_body" unselectable="on" title="获取编辑器html" class="edui-button-body"  @click="getAllHtmls">
                        <div class="edui-box edui-icon" style="marginTop:3px">
                        </div>
                        <span class="toolbar-item"> 获取编辑器html </span>
                      </div>
                    </div>
                  <!-- </div> -->
                </div>
              </div>
            </div>            
          </div>
          <!-- <div class="el-row" style="height:31px">
            <div class="edui-default">
              <div class="edui-toolbar">
                <span class="toolbar-item"> &nbsp; </span>
              </div>
            </div>
          </div> -->
        </div>
        <div style="padding-right:15px">
          <div class="el-row">
            <!-- <span class="toolbar-item"> 導出為txt文件 </span> -->
            <div class="edui-default">
              <div class="edui-toolbar">
                <div id="edui133" class="edui-box edui-button edui-for-txt">
                  <div class="edui-button-wrap">
                    <div id="edui133_body" unselectable="on" title="导出为txt文件" class="edui-button-body" @click="exportTxt">
                      <div class="edui-box edui-icon" style="marginTop:3px">
                      </div>
                      <span class="toolbar-item"> 導出為txt文件 </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      <!-- <div class="bottom_title">
        <span > 文件</span>
      </div> -->
      <div style="display:flex">
        <div style="display:flex">
          <div class="el-row" style="padding-right:15px;height:31px">
            <div class="edui-default" style="margin-top:2px">
              <div class="edui-toolbar">
                <div class="edui-box edui-button" @click="generateTrackingNumber">
                  <div class="edui-button-wrap ">
                    <span class="toolbar-item" > 生成單號 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="el-row"  style="padding-right:15px;height:31px">
            <div class="edui-default" style="margin-top:2px">
              <div class="edui-toolbar">
                <div class="edui-box edui-button" @click="completeReport">
                  <div class="edui-button-wrap">
                    <span class="toolbar-item" > 完成報告 </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div >
      <div style="display:flex">
        <div class="el-row" style="padding-right:15px">
          <!-- <span class="toolbar-item"> 直接打印 </span> -->
          <div class="edui-default">
            <div class="edui-toolbar">
              <div id="edui122" class="edui-box edui-button edui-for-print">                  
                <div class="edui-button-wrap"><div id="edui122_body" unselectable="on" title="打印" class="edui-button-body" @click="printDoc">
                <div class="edui-box edui-icon" style="marginTop:3px"></div>
                <span class="toolbar-item"> 打印 </span>
              </div></div></div>
            </div>
          </div>
        </div>
        <div class="el-row" style="padding-right:15px">
          <!-- <span class="toolbar-item"> 打印預覽 </span> -->
          <div class="edui-default">
            <div class="edui-toolbar">
              <div id="edui123" class="edui-box edui-button edui-for-printing">
                <div class="edui-button-wrap"><div id="edui123_body" unselectable="on" title="续打" class="edui-button-body" onmousedown="return $EDITORUI[&quot;edui123&quot;]._onMouseDown(event, this);" @click="printContinueDoc">
                <div class="edui-box edui-icon" style="marginTop:3px"></div>
                <span class="toolbar-item"> 续打 </span>        
              </div></div></div>
            </div>
          </div>
        </div>
        <div class="el-row" >
          <!-- <span style="line-height:25px"> &nbsp;</span> -->
          <div class="edui-default">
            <div class="edui-toolbar">
              <div id="edui126" class="edui-box edui-button edui-for-preview"><div class="edui-button-wrap"><div id="edui126_body"  unselectable="on" title="预览" class="edui-button-body"  @click="previewDoc">
                <div class="edui-box edui-icon" style="marginTop:3px"></div>
                <span class="toolbar-item"> 预览 </span>  
              </div></div></div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="bottom_title">
        <span > 打印</span>
      </div> -->
    </div>

    <!-- <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row" >
            <span class="toolbar-item"> 表單模式 </span>
          </div>
          <div class="el-row">
            <span class="toolbar-item"> 留浪模式 </span>
          </div>
          <div class="el-row">
            <span class="toolbar-item"> 自動縮放模式</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span >視圖模式</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row" >
            <span class="toolbar-item"> 獲得被選中的文本 </span>
          </div>
          <div class="el-row">
            <span class="toolbar-item"> 獲得被選中的HTML </span>
          </div>
          <div class="el-row">
            <span class="toolbar-item"> 獲得被選中的XML</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span >功能</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row" >
            <span class="toolbar-item"> 設置當前輸入域本文 </span>
          </div>
          <div class="el-row">
            <span class="toolbar-item"> 刪除當前輸入域 </span>
          </div>
          <div class="el-row">
            <span class="toolbar-item"> 設置自定義下拉列表</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span >操作</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row" >
            <span style="line-height:25px"> &nbsp;</span>
          </div>
          <div class="el-row">
            <span class="toolbar-item"> 設置快捷菜單 </span>
          </div>
          <div class="el-row">
            <span style="line-height:25px"> &nbsp;</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span >自定義右鍵菜單</span>
      </div>
    </div>

    <div>
      <div style="display:flex;">
        <div style="padding-left:15px;padding-right:15px;text-align:center">
          <div>
            <span class="toolbar-item"> 文檔效驗 </span>
          </div>
          <div>
            <el-select v-model="value" filterable placeholder="請選擇">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="bottom_title" style="margin-top:25px;">文檔效驗</div>
    </div> -->
  </div>
</template>

<script>
import { createTransmst, updateTransmst } from '@/api/transmst'
import { createTransdtl, deleteTransdtl } from '@/api/transdtl'
import { updateSheet } from '@/api/sheetdef'

export default {
  name: 'Document',
  props: ['transMst'],
  watch : {
    'transMst.SMHC_STATUS':function(newVal, oldVal) {
        this.SMHC_STATUS = newVal
        console.log("this.SMHC_STATUS", newVal)
    }
  },
  data() {
    return {
      editor: undefined,
      editorId:"caseform",
      transdtl_data: {
        SHEET_ID: undefined,
        ITEM_ID: undefined,
        ITEM_NAME: undefined,
        ITEM_EDIT_TYPE: undefined,
        ITEM_VALUE: undefined,
        RECORD_TIME: undefined
      },
      transmst_data: {
        ID: undefined,
        TRANS_ID: undefined,
        CHART_NO: undefined,
        ENCOUNTER_NO: undefined,
        SHEET_ID: undefined,
        SHEET_NAME: undefined,
        SHEET_HTML: undefined,
        SHEET_TEXT: undefined,
        SHEET_STYLETYPE: true,
        SMHC_STATUS: '0'
      },
      needUpdate: false,
      options: [{
        value: 'Item1',
        label: '文檔效驗1'
      }, {
        value: 'Item2',
        label: '文檔效驗2'
      }],
      value: '',
      SMHC_STATUS: '0'
    }
  },
  mounted: function() {
    console.log("SMHC_STATUS", localStorage.getItem("SMHC_STATUS"))

    const editor = UE.getEditor(this.editorId)
    setTimeout(() => {
      this.editor = editor
    }, 100)
  },
  methods: {
    createNew() {
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      this.editor.execCommand('cleardoc')
    },
    updateOrderTreeData()
    {
      this.needUpdate = true;
      var orderTreeData = JSON.parse(localStorage.getItem("orderTreeData"))
      for(var i=0;i<orderTreeData.length;i++) {
        this.updateSheetHtml(orderTreeData[i])
        console.log("updateSheetHtml", this.needUpdate)
        if(!this.needUpdate) break;
      }
      localStorage.setItem("orderTreeData", JSON.stringify(orderTreeData))
      this.$emit('updateOrderTreeData')

    },
    updateSheetHtml(orderData) {
      if(orderData.children === undefined) {
        if(orderData.TRANS_ID === this.transmst_data.TRANS_ID ) {
          orderData.SHEET_HTML = this.transmst_data.SHEET_HTML
          orderData.SHEET_TEXT = this.transmst_data.SHEET_TEXT
          orderData.SHEET_STYLETYPE = JSON.parse(localStorage.getItem("SHEET_STYLETYPE"))
          console.log("TRANS_ID", orderData.TRANS_ID)
          console.log("SHEET_STYLETYPE", orderData.SHEET_STYLETYPE)
          this.needUpdate = false;
        }
      } else {
        for(var i=0;i<orderData.children.length;i++)
          this.updateSheetHtml(orderData.children[i])
      }
    },
    saveDocument(isTempSave) {
      if(localStorage.getItem("SHEET_ID") === null) {
        return;
      }

      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      // try{
      //   var one = this.editor.document.getElementById("field6");
      //   if(one != null) {
      //     var obj = one.getAttribute("obj")
      //     obj = obj.split("'").join("\"")
      //     obj = JSON.parse(obj)
      //     var regExp = obj['regnex']
      //     var value = one.getElementsByClassName("oak-field-value")[0].innerText
      //     let regex = new RegExp(regExp)
      //     if(!regex.test(value)) {
      //       this.$notify({
      //         title: '错误',
      //         message: ' 病歷號碼格式有誤',
      //         type: 'error'
      //       })
      //       return;  
      //     }
      //   }
      // } catch(e) {}

      var widgets = this.editor.execCommand("allwidgets")
      for(var i=0;i<widgets.length;i++) {
        try {
          var one = this.editor.document.getElementById(widgets[i].data.orgID);
          if(one != null) {
            var obj = one.getAttribute("obj")
            obj = obj.split("'").join("\"")
            obj = JSON.parse(obj)
            var regExp = obj['regnex']
            var value = one.getElementsByClassName("oak-field-value")[0].innerText
            let regex = new RegExp(regExp)
            if(!regex.test(value)) {
              this.$notify({
                title: '错误',
                message: widgets[i].data.orgname + '格式有誤',
                type: 'error'
              })
              return;  
            }
          }
        } catch(e) {}
      }

      var sheet = JSON.parse(localStorage.getItem("SHEET"))
      // sheet.SHEET_HTML = this.editor.getContent()
      sheet.SHEET_STYLETYPE = JSON.parse(localStorage.getItem("SHEET_STYLETYPE"))
      console.log("sheet",sheet)

      // updateSheet({ID:sheet.ID, SHEET_STYLETYPE:sheet.SHEET_STYLETYPE})
      //   .then((response) => {
      //     console.log("updateSheet", response)
      //   })
      //   .catch((err) => {
      //     console.log("updateSheet", err)
      //   })

      this.transmst_data.SMHC_STATUS = '0'
      if(isTempSave === 1) {
        this.transmst_data.SMHC_STATUS = '2'
      } else if(isTempSave === 0) {
        this.transmst_data.SMHC_STATUS = '1'
      }

      this.transmst_data.TRANS_ID = localStorage.getItem("TRANS_ID")
      this.transmst_data.CHART_NO = "000000"
      this.transmst_data.ENCOUNTER_NO = "000000"
      this.transmst_data.SHEET_ID = localStorage.getItem("SHEET_ID")      
      this.transmst_data.SHEET_NAME = localStorage.getItem("SHEET_NAME")
      this.transmst_data.SHEET_HTML = this.editor.getContent()
      this.transmst_data.SHEET_TEXT = this.editor.getContentTxt()
      this.transmst_data.SHEET_STYLETYPE = sheet.SHEET_STYLETYPE
      

      if(this.transmst_data.TRANS_ID === null) {
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const dateTime = date +' '+ time;
        this.transmst_data.TRANS_ID = dateTime + "-"+this.transmst_data.SHEET_ID 
        this.transmst_data.F_CREATORUSERID = "user"

        createTransmst(this.transmst_data)
            .then((response) => {
              this.SMHC_STATUS = this.transmst_data.SMHC_STATUS
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
              })

              var orderTreeData = JSON.parse(localStorage.getItem("orderTreeData"))
              for(var i=0;i<orderTreeData.length;i++) {
                if(orderTreeData[i].children !== undefined && orderTreeData[i].children !== null) {
                  for(var j=0;j<orderTreeData[i].children.length;j++) {
                      if(orderTreeData[i].children[j].SHEET_ID === this.transmst_data.SHEET_ID) {
                        var chd = response.data.result
                        chd.SHEET_TITLE = chd.TRANS_ID + ", " + chd.F_CREATORUSERID
                        chd.PRELOAD_METHOD = orderTreeData[i].children[j].PRELOAD_METHOD
                        chd.ONLOAD_METHOD = orderTreeData[i].children[j].ONLOAD_METHOD
                        chd.AFTER_SAVE_METHOD = orderTreeData[i].children[j].AFTER_SAVE_METHOD
                        chd.SAVE_METHOD = orderTreeData[i].children[j].SAVE_METHOD
                        orderTreeData[i].children[j].children.push(chd)
                        break
                      }
                  }
                }
              }
              localStorage.setItem("orderTreeData", JSON.stringify(orderTreeData))
              this.$emit('updateOrderTreeData')
              // this.updateOrderTreeData()

              var widgets = this.editor.execCommand("allwidgets")
              console.log("widget", widgets)

              deleteTransdtl(this.transmst_data.TRANS_ID)
                .then(() => {
                  this.saveTransDtl(widgets, 0, this.transmst_data.TRANS_ID)
                })
                .catch(() => {
                })
            })
            .catch((e) => {
              console.log(e)
            })
      } else {
        updateTransmst(this.transmst_data)
            .then(() => {
              this.SMHC_STATUS = this.transmst_data.SMHC_STATUS
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              
              this.updateOrderTreeData()

              var widgets = this.editor.execCommand("allwidgets")
              // console.log("widget", widgets)

              deleteTransdtl(this.transmst_data.TRANS_ID)
                .then(() => {
                  this.saveTransDtl(widgets, 0, this.transmst_data.TRANS_ID)
                })
                .catch((e) => {
                  console.log("deleteTransdtl", e)
                })
            })
            .catch(() => {
            })
      }
    },
    saveTransDtl(widgets, i, transID) 
    {
      if(widgets.length <= i) return

      var widget = widgets[i]
      this.transdtl_data.TRANS_ID = transID
      this.transdtl_data.SHEET_ID = localStorage.getItem("SHEET_ID")
      this.transdtl_data.ITEM_ID = widget.data.orgID
      this.transdtl_data.ITEM_NAME = widget.data.orgname
      this.transdtl_data.ITEM_EDIT_TYPE = widget.type
      if(Array.isArray(widget.value)) {
        if(widget.value.length > 0) this.transdtl_data.ITEM_VALUE =  widget.value + ""
      } else {
        this.transdtl_data.ITEM_VALUE = widget.value
      }

      this.transdtl_data.RECORD_TIME = new Date().toLocaleString()


      if(this.transdtl_data.ITEM_ID === null)
        console.log(this.transdtl_data.ITEM_ID)

      console.log("transdtl_data", this.transdtl_data)

      createTransdtl(this.transdtl_data)
        .then(() => {
          if(i<widgets.length-1) this.saveTransDtl(widgets, i+1, transID)
        })
        .catch((e) => {
          console.log("transdtl", this.transdtl_data)
          console.log("error",this.transdtl_data.ITEM_ID)
          console.log("error", e)
        })
    },
    getAllWidgets()
    {
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      this.editor.execCommand('allwidgets')
    },
    getAllHtmls()
    {
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      this.editor.execCommand('allhtml')
    },
    exportTxt()
    {
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      this.editor.execCommand('txt')
    },
    printDoc()
    {
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      console.log("print")
      this.editor.execCommand('print')
    },
    printContinueDoc()
    {
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      this.editor.execCommand('printing')
    },
    previewDoc()
    {
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      this.editor.execCommand('preview_print')
    },

    generateTrackingNumber() {
      var c = document.getElementById("ueditor_0").contentWindow;
      if(c == undefined) c = document.getElementById("ueditor_1").contentWindow;

      var one = c.document.getElementById("field1");
      one.getElementsByClassName("oak-field-value")[0].innerText = "OEP-220715001"
      // one.innerHTML = '<span class="oak-field oak-left" contenteditable="true" style="width: auto;">[</span><span class="oak-field oak-field-value" regnex="" contenteditable="true" style="min-height: 16px; min-width: 20px; color: rgb(60, 60, 60);">OEP-220715001</span><span class="oak-field oak-right" contenteditable="true" style="width: auto;">]</span>'
    },

    completeReport() {
      var c = document.getElementById("ueditor_0").contentWindow;
      if(c == undefined) c = document.getElementById("ueditor_1").contentWindow;
      var one = c.document.getElementById("field4");
      one.getElementsByClassName("oak-field-value")[0].innerText = "已執行"
      // one.innerHTML = '<span class="oak-field oak-left" contenteditable="false" style="width: auto;">[</span><span class="oak-field oak-field-value" style="color: rgb(60, 60, 60);">已執行</span><span class="oak-field oak-right" contenteditable="false" style="width: auto;">]</span>';
    }
  }
}
</script>

<style scoped>
  .el-col-class {
    border-right: solid 1px #E4E7ED;
  }

  .toolbar-item {
    color:#444444;
    font-size:14px;
    cursor: pointer;
    line-height: 25px;
  }

  .bottom_title{
    color:#2D64B3;
    text-align: center;
    margin-top:10px;
  }

</style>
