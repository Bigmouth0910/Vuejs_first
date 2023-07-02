<template>
  <div class="app-container">

    <el-form :model="listQuery" ref="filterForm" :inline="true">
      <el-form-item label="分類簡稱" prop="F_FULLNAME">
        <el-input v-model="listQuery.F_FULLNAME" placeholder="分類簡稱, 支持模糊搜索" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item>
        <el-button v-waves v-permission="'concept_query'"  type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="'concept_query'"  type="success" icon="el-icon-refresh" @click="resetForm('filterForm', listQuery, getList)">
          重置
        </el-button>
        <el-button v-waves v-permission="'concept_add'" type="primary" icon="el-icon-plus" @click="handleCreate" v-loading.fullscreen.lock="fullLoading">
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
      row-key="F_ID"
      :expand-row-keys="expands"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="序号" type="index" width="50px" />
      <el-table-column label="分類簡稱" prop="F_FULLNAME" align="left" width="200px"/>
      <el-table-column label="代碼" prop="F_CODE" align="left" width="200px"/>
      <el-table-column label="描述" prop="F_DESCRIPTION" align="left" width="200px"/>
      <el-table-column label="排序" prop="F_SORTCODE" align="center"  width="60px" />
      <el-table-column label="標誌" prop="F_ENABLEDMARK" align="center"  width="60px" />
      <el-table-column label="修改时间" prop="F_LASTMODIFYTIME" align="center" width="150px">
        <template slot-scope="{row}">
          <!-- 2021-07-09 06:59:53 -->
          <span>{{ row.F_LASTMODIFYTIME | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves v-permission="'concept_edit'"  type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-waves v-permission="'concept_delete'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
      <el-form class="dialog-from-margin" ref="formRef" :rules="rules" status-icon :model="dataform" label-position="left" label-width="100px">
        <el-form-item label="父節點名稱" prop="F_PARENTID">
          <el-cascader
            ref="conceptSelect"
            v-model="dataform.F_PARENTID"
            :options="list"
            :props="{ checkStrictly: true, label: 'F_FULLNAME', value: 'F_ID'}"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="分類簡稱" prop="F_FULLNAME">
          <el-input  clearable v-model="dataform.F_FULLNAME" show-word-limit placeholder="请输入分類簡稱"/>
        </el-form-item>
        <el-form-item label="代碼" prop="F_CODE">
          <el-input  clearable v-model="dataform.F_CODE"  show-word-limit placeholder="请输入代碼"/>
        </el-form-item>
        <el-form-item label="描述" prop="F_DESCRIPTION">
          <el-input type="textarea" autosize placeholder="請輸入描述" clearable v-model="dataform.F_DESCRIPTION" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="排序代碼" prop="F_SORTCODE">
              <el-input-number controls-position="right" :min="0" clearable v-model.number="dataform.F_SORTCODE" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="標誌" prop="state">
              <el-switch
                v-model="dataform.F_ENABLEDMARK"
                :active-value="1"
                :inactive-value="0"
                active-text="启用"
                inactive-text="禁用">
              </el-switch>
            </el-form-item>
          </el-col>
        </el-row>
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
</template>

<script>
import { conceptInfo, createConcept, updateConcept, deleteConcept, countConcept } from '@/api/concept'
// import Pagination from '@/components/Pagination' // 分页

export default {
  name: '字典分類管理',
  components: {
    // Pagination
  },
  data() {
    const codeValidator = (rule, value, callback) => {
      let query
      if (this.dialogStatus === 'create') {
        query = { F_CODE: value}
      } else {
        query = { F_CODE: value, F_ID: this.dataform.F_ID }
      }
      countConcept(query)
        .then(response => {
          if (response.data.result > 0) {
            callback(new Error('代碼已存在，請重新輸入'))
          } else {
            callback()
          }
        })
    }

    return {
      list: [],
      total: 0,
      listLoading: true,
      fullLoading: false,
      // 默认展开节点
      expands: [],
      listQuery: {
        page: 1,
        limit: 10,
        F_FULLNAME: undefined
      },
      dataform: {
        F_ID: undefined,
        F_PARENTID: undefined,
        F_FULLNAME: undefined,
        F_CODE: undefined,
        F_DESCRIPTION: undefined,
        F_SORTCODE: undefined,
        F_ENABLEDMARK: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      rules: {
        F_FULLNAME: [
          { required: true, message: '請輸入分類簡稱', trigger: 'blur' }
        ],
        F_CODE: [
          { required: true, message: '請輸入代碼', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' }
        ],

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      conceptInfo(this.listQuery)
        .then(response => {
          this.expands = []
          this.list = response.data.result.rows
          this.total = response.data.result.count
          console.log('total:' + this.total)
          this.listLoading = false
          // 默认展开第一行
          // if (this.list.length > 0) {
          //   this.expands.push(this.list[0].F_ID.toString())
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
    resetForm(formName, query, getListMethod) {
      this.$refs[formName].resetFields()
      query.F_FULLNAME = undefined
      getListMethod()
    },
    resetTemp() {
      this.dataform = {
        F_ID: undefined,
        F_PARENTID: undefined,
        F_FULLNAME: undefined,
        F_CODE: undefined,
        F_DESCRIPTION: undefined,
        F_SORTCODE: undefined,
        F_ENABLEDMARK: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        // 重新加载上级部门数据
        this.$refs.conceptSelect.loadNodes()
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          console.log('parentid:', this.dataform.F_PARENTID)
          if (this.dataform.F_PARENTID !== undefined && this.dataform.F_PARENTID.length > 0) { this.dataform.F_PARENTID = this.dataform.F_PARENTID[this.dataform.F_PARENTID.length - 1] } else this.dataform.F_PARENTID = null

          this.fullLoading = true
          createConcept(this.dataform)
            .then(() => {
              this.fullLoading = false
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '新增成功',
                type: 'success',
                duration: 2000
              })
              // this.notifyMessage()
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
      this.$nextTick(() => {
        // 重新加载上级部门数据
        this.$refs.conceptSelect.loadNodes()
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (Array.isArray(this.dataform.F_PARENTID)) {
            if (this.dataform.F_PARENTID !== undefined && this.dataform.F_PARENTID.length > 0) {
              this.dataform.F_PARENTID = this.dataform.F_PARENTID[this.dataform.F_PARENTID.length - 1]
            } else this.dataform.F_PARENTID = null
          }

          const tempData = Object.assign({}, this.dataform)
          this.fullLoading = true
          updateConcept(tempData)
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
    handleDelete(row) {
      this.$confirm('刪除該記錄，如果當前記錄下包含子節點請先刪除子節點，如果當前分類下存在字典請先解除關係，是否繼續刪除？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullLoading = true
        deleteConcept(row.F_ID)
          .then(() => {
            this.fullLoading = false
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
        // this.notifyMessage('info', '刪除取消！')
        this.$notify({
          title: '刪除',
          message: '刪除取消！',
          type: 'info',
          duration: 2000
        })
      })
    }
  }
}
</script>
