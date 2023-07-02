<template>
  <div class="app-container">
    <div :hidden="dialogDesignDetails">
    <el-row :gutter="20">
      <el-col :xl="4" :lg="5" :md="6" :sm="6" :xs="24">
        <el-input
          placeholder="分類簡稱, 支持模糊搜索"
          clearable
          v-model="filterOrderText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="orderTreeData"
          :props="{ children: 'children',  label: 'FORDER_NAME' }"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          node-key="ID"
          ref="tree"
          highlight-current
          @node-click="conceptTreeNodeClick">
        </el-tree>
      </el-col>
      <el-col :xl="20" :lg="19" :md="18" :sm="18" :xs="24">
        <el-form :model="listQuery" ref="filterForm" :inline="true">
          <el-form-item label="表單類別" prop="SHEET_TYPE">
            <el-input v-model="listQuery.SHEET_TYPE" placeholder="表單類別，支持模糊搜索" @keyup.enter.native="handleFilter" />
          </el-form-item>

          <el-form-item>
            <el-button v-waves v-permission="'sheet_query'" type="primary" icon="el-icon-search" @click="handleFilter" v-loading.fullscreen.lock="fullLoading">
              搜索
            </el-button>
            <el-button v-waves v-permission="'sheet_query'" type="success" icon="el-icon-refresh" @click="resetFormInfo">
              重置
            </el-button>
            <el-button v-waves  v-permission="'sheet_add'" type="primary" icon="el-icon-plus" @click="handleCreate">
              新增
            </el-button>
          </el-form-item>
        </el-form>

        <el-table
          v-loading="listLoading"
          :data="list"
          fit
          highlight-current-row
          border
          stripe
          @sort-change="sortChange($event, listQuery, handleFilter)"
          row-key="ID"
          :expand-row-keys="expands"
        >
          <el-table-column label="序号" type="index" width="50px" />
          <el-table-column label="文檔代碼" prop="DOCUMENT_CODE" align="center" width="120px" sortable="custom"/>

          <el-table-column label="表單代碼" prop="SHEET_ID" align="center" width="150px" sortable="custom">
            <template slot-scope="{row}">
              <el-tooltip effect="dark" content="點擊進入設計模式" placement="bottom-start">
                <el-tag style="cursor:pointer" @click="openDesignDocument(row)" >{{ row.SHEET_ID }}</el-tag>
              </el-tooltip>
            </template>
          </el-table-column>

          <el-table-column label="表單名稱" prop="SHEET_NAME"  align="center" width="150px" sortable="custom"/>
          <el-table-column label="表單類別" prop="SHEET_TYPE" align="center"  width="150px" sortable="custom"/>
          <el-table-column label="部门代碼" prop="DEPT_NO" align="center" width="130px" sortable="custom"/>
          <el-table-column label="系統號或部門" prop="OWNER_SYS" align="center" width="150px" sortable="custom"/>

          <!-- <el-table-column label="修改时间" prop="F_LASTMODIFYTIME" align="center" width="140px" sortable="custom">
            <template slot-scope="{row}">
              <span>{{ row.F_LASTMODIFYTIME | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column> -->

          <el-table-column label="操作" align="center" width="250px" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button v-waves v-permission="'sheet_edit'" type="primary" size="mini" @click="handleUpdate(row)">
                修改
              </el-button>
              <el-button v-waves v-permission="'sheet_delete'" size="mini" type="danger" @click="handleDelete(row)">
                删除
              </el-button>
              <el-button v-waves v-permission="'sheet_design'" size="mini" type="success" @click="openDesignDocument(row)">
                設計
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-col>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal='false' width="800px">
      <el-form class="dialog-from-margin" ref="formRef" :rules="rules" status-icon :model="dataform" label-position="left" label-width="100px">
        <el-form-item label="父節點名稱" prop="FORDER_ID">
          <el-cascader
            ref="orderSelect"
            v-model="dataform.FORDER_ID"
            :options="orderTreeData"
            :props="{ label: 'FORDER_NAME', value: 'FORDER_ID'}"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="文檔代碼" prop="DOCUMENT_CODE">
          <el-input  clearable v-model="dataform.DOCUMENT_CODE" placeholder="請輸入文檔代碼"/>
        </el-form-item>
        <el-form-item label="表單代碼" prop="SHEET_ID">
          <el-input  clearable v-model="dataform.SHEET_ID" placeholder="請輸入表單代碼"/>
        </el-form-item>
        <el-form-item label="表單名稱" prop="SHEET_NAME">
          <el-input  clearable v-model="dataform.SHEET_NAME" placeholder="請輸入表單名稱"/>
        </el-form-item>
        <el-form-item label="表單類別" prop="SHEET_TYPE">
          <el-input  clearable v-model="dataform.SHEET_TYPE" placeholder="請輸入表單類別"/>
        </el-form-item>
        <el-form-item label="部门代碼" prop="DEPT_NO">
          <el-input  clearable v-model="dataform.DEPT_NO" placeholder="請輸入部门代碼"/>
        </el-form-item>
        <el-form-item label="系統號或部門" prop="OWNER_SYS">
          <el-input  clearable v-model="dataform.OWNER_SYS" placeholder="請輸入系統號或部門"/>
        </el-form-item>
        <el-form-item label="PRELOAD" prop="PRELOAD_METHOD">
          <el-input  clearable v-model="dataform.PRELOAD_METHOD" placeholder="請輸入PRELOAD METHOD"/>
        </el-form-item>
        <el-form-item label="ONLOAD" prop="ONLOAD_METHOD">
          <el-input  clearable v-model="dataform.ONLOAD_METHOD" placeholder="請輸入ONLOAD METHOD"/>
        </el-form-item>
        <el-form-item label="SAVE" prop="SAVE_METHOD">
          <el-input  clearable v-model="dataform.SAVE_METHOD" placeholder="請輸入SAVE METHOD"/>
        </el-form-item>
        <el-form-item label="AFTER SAVE" prop="AFTER_SAVE_METHOD">
          <el-input  clearable v-model="dataform.AFTER_SAVE_METHOD" placeholder="請輸入AFTER SAVE METHOD"/>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确定
        </el-button>
      </div>
    </el-dialog>
    </div>

    <div :hidden="!dialogDesignDetails">
      <el-row :gutter="20">
        <el-button @click="dialogDesignDetails = false">
          取消
        </el-button>
        <el-button v-waves v-permission="'sheet_design_edit'" type="primary" @click="updateDesignData()" v-loading.fullscreen.lock="fullLoading">
          确定
        </el-button>
      </el-row>
      <el-row :gutter="20">
        <el-col :xl="18" :lg="18" :md="17" :sm="18" :xs="24">
          <span>&nbsp;</span>
          <el-tabs type="border-card" >
            <el-tab-pane :label="designDetailsTitle" style="padding:0px;height:650px">
              <div class="emra-oak">
                <EmrEditor :id="editorId" mod="design" :content="content" :styletype="styletype" v-on:setData="setEditorData"/>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
        <el-col :xl="6" :lg="6" :md="7" :sm="6" :xs="24" style="padding:0px;height:750px;overflow:auto">
          <RightPanel/>
        </el-col>
      </el-row>
    </div>
    <!-- <el-dialog width="1024px" :title="designDetailsTitle" top="10vh" :visible.sync="dialogDesignDetails" >
       <EmrEditor id="caseform" mod="design" />
    </el-dialog> -->
  </div>
</template>

<script type="text/javascript" src="ueditor/third-party/jquery.js"></script>
<script type="text/javascript" src="ueditor/ueditor.config.js"></script>
<script type="text/javascript" src="ueditor/ueditor.parse.js"></script>
<script type="text/javascript" src="ueditor/ueditor.all.js"></script>
<script type="text/javascript" src="ueditor/lang/zh-cn/zh-cn.js"></script>
<script type="text/javascript" src="ueditor/third-plugin/kityformula-plugin/addKityFormulaDialog.js"></script>
<script type="text/javascript" src="ueditor/third-plugin/kityformula-plugin/getKfContent.js"></script>
<script type="text/javascript" charset="utf-8" src="ueditor/dialogs/comments/cmtmark.min.js"></script>

<script type="text/javascript" src="ueditor/ueditor.plugin.bmr.min.js"></script>
<script type="text/javascript" src="ueditor/ueditor.bmr.min.js"></script>
<script type="text/javascript" src="My97DatePicker/WdatePicker.js"></script>
<script type="text/javascript" src="ueditor/third-party/watermark/mark.js"></script>

<script>

import EmrEditor from '../EmrEditor/ueditor.vue'
import RightPanel from '../rightpanel/index'
import innerHtml from '../EmrEditor/innerHtml.js'

import { sheetInfo, createSheet, updateSheet, deleteSheet, countSheet } from '@/api/sheetdef'
import { orderInfo } from '@/api/order'
import Pagination from '@/components/Pagination'

export default {
  name: '病例表單管理',
  components: { Pagination, EmrEditor, RightPanel, innerHtml },
  watch: {
    filterOrderText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    const codeValidator = (rule, value, callback) => {
      let query
      if (this.dialogStatus === 'create') {
        query = { SHEET_ID: value }
      } else {
        query = { SHEET_ID: value, ID: this.dataform.ID }
      }
      countSheet(query)
        .then(response => {
          if (response.data.result > 0) {
            callback(new Error('表單代碼已存在，請重新輸入'))
          } else {
            callback()
          }
        })
    }

    return {
      styletype: true,
      editor: undefined,
      editorId:"caseform",
      content:'',
      list: [],
      total: 0,
      listLoading: true,
      // 全局遮罩
      fullLoading: false,
      // 默认展开节点
      expands: [],
      listQuery: {
        page: 1,
        limit: 10,
        FORDER_ID: undefined,
        SHEET_TYPE: undefined
      },
      // 部门树过滤条件
      filterOrderText: '',
      // 部门树
      orderTreeData: [],
      dataform: {
        ID: undefined,
        DOCUMENT_CODE: undefined,
        SHEET_ID: undefined,
        SHEET_NAME: undefined,
        SHEET_TYPE: undefined,
        DEPT_NO: undefined,
        OWNER_SYS: undefined,
        FORDER_ID: undefined,
        SHEET_HTML: undefined,
        PRELOAD_METHOD: undefined,
        ONLOAD_METHOD: undefined,
        SAVE_METHOD: undefined,
        AFTER_SAVE_METHOD: undefined,
        SHEET_STYLETYPE:1
      },
      dialogFormVisible: false,
      // 设计弹框
      dialogDesignDetails: false,
      // 标题
      designDetailsTitle: '',
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      rules: {
        SHEET_ID: [
          { required: true, message: '請輸入表單代碼', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' }
        ],
        SHEET_NAME: [
          { required: true, message: '請輸入表單名稱', trigger: 'blur' }
        ],
        SHEET_TYPE: [
          { required: true, message: '請輸入表單類別', trigger: 'blur' }
        ],
        FORDER_ID: [
          { required: true, message: '請選擇父節點', trigger: 'blur' }
        ]
      }
    }
  },
  mounted: function() {
    const editor = UE.getEditor(this.editorId)

    // console.log("sheetdef", editor)
    setTimeout(() => {
      this.editor = editor
    }, 100)
  },
  activated: function() {
    console.log("sheet", "activated")
    this.getOrderTree()
    this.getList()

  },
  created() {
    console.log("sheet", "created")
    this.getOrderTree()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      sheetInfo(this.listQuery)
        .then(response => {
          this.expands = []
          this.list = response.data.result.rows
          this.total = response.data.result.count
          this.listLoading = false
          // 默认展开第一行
          // if (this.list.length > 0) {
          //   this.expands.push(this.list[0].ID.toString())
          // }
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    resetTemp() {
      this.dataform = {
        ID: undefined,
        DOCUMENT_CODE: undefined,
        SHEET_ID: undefined,
        SHEET_NAME: undefined,
        SHEET_TYPE: undefined,
        DEPT_NO: undefined,
        OWNER_SYS: undefined,
        FORDER_ID: undefined,
        SHEET_HTML: undefined,
        PRELOAD_METHOD: undefined,
        ONLOAD_METHOD: undefined,
        SAVE_METHOD: undefined,
        AFTER_SAVE_METHOD: undefined,
        SHEET_STYLETYPE: 1
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      // 重新获取部门以及角色列表
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.fullLoading = true
          if (this.dataform.FORDER_ID !== undefined && this.dataform.FORDER_ID.length > 0) { this.dataform.FORDER_ID = this.dataform.FORDER_ID[this.dataform.FORDER_ID.length - 1] } else this.dataform.FORDER_ID = null

          const tempDataForm = Object.assign({}, this.dataform)
          createSheet(tempDataForm)
            .then(() => {
              this.fullLoading = false
              this.dialogFormVisible = false
              // this.notifyMessage()
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
              })

              this.getList()
            })
            .catch(() => {
              this.fullLoading = false
              this.dialogFormVisible = false
            })
        }
      })
    },
    handleUpdate(row) {
      this.dataform = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      console.log(row,'here is data form.....................')
      // 重新获取部门以及角色列表
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {

          if (Array.isArray(this.dataform.FORDER_ID)) { if (this.dataform.FORDER_ID !== undefined && this.dataform.FORDER_ID.length > 0) { this.dataform.FORDER_ID = this.dataform.FORDER_ID[this.dataform.FORDER_ID.length - 1] } else this.dataform.FORDER_ID = null }

          const tempData = Object.assign({}, this.dataform)
          this.fullLoading = true
          updateSheet(tempData)
            .then(() => {
              this.fullLoading = false
              this.dialogFormVisible = false
              // this.notifyMessage()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.getList()
            })
            .catch(() => {
              this.fullLoading = false
              this.dialogFormVisible = false
            })
        }
      })
    },
    updateDesignData() {

      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      console.log('here is def================+++++++++++++++++++++++++++++++++++++++++')
      var widgets = this.editor.execCommand("allwidgets")
      for(var i=0;i<widgets.length;i++) {
        try{
          var one = this.editor.document.getElementById(widgets[i].data.orgID);
          if(one != null) {
            var obj = one.getAttribute("obj")
            obj = obj.split("'").join("\"")
            obj = JSON.parse(obj)
            var regExp = obj['regnex']
            var value = one.getElementsByClassName("oak-field-value")[0].innerText
            let regex = new RegExp(regExp)
            // if(regExp !='' && !regex.test(value)) {
            //   this.$notify({
            //     title: '错误',
            //     message: widgets[i].data.orgname + '格式有誤',
            //     type: 'error'
            //   })
            //   return;
            // }
          }
        } catch(e) {}
      }

      this.dataform.SHEET_HTML = this.editor.getContent()
      this.dataform.SHEET_STYLETYPE = this.styletype
      const tempData = Object.assign({}, this.dataform)
      // tempData.SHEET_HTML = this.dataform.SHEET_HTML;
      this.fullLoading = true
      updateSheet(tempData)
        .then(() => {
          this.fullLoading = false
          this.dialogDesignDetails = false
          // this.notifyMessage()
          this.$notify({
            title: '成功',
            message: '修改設計成功',
            type: 'success',
            duration: 2000
          })
          this.getList()
        })
        .catch(() => {
          this.fullLoading = false
          this.dialogDesignDetails = false
        })
    },
    handleDelete(row) {
      this.$confirm('確認刪除該記錄？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.fullLoading = true
        deleteSheet(row.ID)
          .then(() => {
            this.fullLoading = false
            // this.notifyMessage()
            this.$notify({
              title: '成功',
              message: '刪除成功',
              type: 'success',
              duration: 2000
            })
            this.handleFilter()
          })
          .catch(() => {
            this.fullLoading = false
          })
      }).catch(() => {
        // this.notifyMessage('info', '删除取消!')
        this.$notify({
          title: '刪除',
          message: '刪除取消！',
          type: 'info',
          duration: 2000
        })
      })
    },
    resetFormInfo() {
      this.$refs['filterForm'].resetFields()
      // this.resetForm('filterForm', this.listQuery)
      // 将部门也重置
      this.$refs.tree.setCurrentKey(null)
      this.listQuery.FORDER_ID = undefined
      this.listQuery.SHEET_TYPE = undefined
      this.getList()
    },
    // 病例表單类别树操作
    getOrderTree() {
      orderInfo()
        .then(response => {
          this.orderTreeData = response.data.result.rows
        })
    },
    filterNode(value, data, node) {
      if (!value) return true
      return data.FORDER_NAME.indexOf(value) !== -1
    },
    conceptTreeNodeClick(data) {
      if (data.children === undefined) {
        this.listQuery.FORDER_ID = data.FORDER_ID
        this.handleFilter()
      }
    },
    openDesignDocument(row) {
      this.designDetailsTitle = row.SHEET_TYPE + '：設計'
      this.dataform = Object.assign({}, row) // copy obj
      if(this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      this.styletype = this.dataform.SHEET_STYLETYPE
      this.content = this.dataform.SHEET_HTML
      if (this.dataform.SHEET_HTML === null) this.content=''
      this.editor.setContent(this.content)
      this.dialogDesignDetails = true
    },
    setEditorData(type) {
      this.styletype = type
    }

  }
}
</script>
<style lang="scss" scoped>

.table-expand-title{
  font-size: 0;
 .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
 }
 /deep/ label {
    width: 60px;
    color: #99a9bf;
  }
}
.filter-tree{
  margin-top: 2vh;
}
.tags-margin{
  margin-right: 0.5vw
}
</style>
