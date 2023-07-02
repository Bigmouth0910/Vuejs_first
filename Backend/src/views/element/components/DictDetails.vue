<template>
  <div class="app-container">
    <el-form :model="listQuery" ref="filterForm" :inline="true">
      <el-form-item label="代碼內容" prop="CODE_DESC">
        <el-input v-model="listQuery.CODE_DESC" placeholder="代碼內容，支持模糊搜索" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item>
        <el-button v-waves v-permission="'codedtl_query'" size="small"  type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="'codedtl_query'" size="small"  type="success" icon="el-icon-refresh" @click="resetForm('filterForm', listQuery, getList)">
          重置
        </el-button>
        <el-button v-waves v-permission="'codedtl_add'" size="small"  type="primary" icon="el-icon-plus" @click="handleCreate" v-loading.fullscreen.lock="fullLoading">
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
      row-key="ID"
      @sort-change="sortChange($event, listQuery, handleFilter)"
    >
      <el-table-column label="序号" type="index" width="50px" />
      <!-- <el-table-column label="代碼類別" prop="CODE_TYPE" align="left" width="150px" sortable="custom"/>            -->
      <el-table-column label="代碼" prop="CODE_NO" align="left" width="120px" sortable="custom">
      </el-table-column>
      <el-table-column label="代碼內容" prop="CODE_DESC" align="left" width="150px" sortable="custom">
        <template slot-scope="{row}">
          <el-tag >{{ row.CODE_DESC }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="英文名稱" prop="ENG_DESC" align="left" width="150px" sortable="custom"/>
      <el-table-column label="顺序" prop="SORT_VALUE" align="center" width="80px" sortable="custom"/>
      <el-table-column label="備註" prop="REMARK_DESC" align="left" min-width="200px" sortable="custom"/>

      <el-table-column label="操作" align="center" width="250px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves v-permission="'codedtl_edit'"  type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-waves v-permission="'codedtl_delete'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @panation="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal='false' append-to-body>
      <el-form class="dialog-from-margin" ref="formRef" :rules="rules" status-icon :model="dataform" label-position="left" label-width="80px">

        <el-form-item label="代碼" prop="CODE_NO">
          <el-input clearable v-model="dataform.CODE_NO" placeholder="請輸入代碼,且不可重复"/>
        </el-form-item>
        <el-form-item label="代碼內容" prop="CODE_DESC">
          <el-input clearable v-model="dataform.CODE_DESC" placeholder="請輸入代碼內容"/>
        </el-form-item>
        <el-form-item label="英文名稱" prop="ENG_DESC">
          <el-input clearable v-model="dataform.ENG_DESC" placeholder="請輸入英文名稱"/>
        </el-form-item>
        <el-form-item label="排序" prop="SORT_VALUE">
          <el-input-number controls-position="right" :min="0" clearable v-model.number="dataform.SORT_VALUE" />
        </el-form-item>
        <el-form-item label="備註" prop="REMARK_DESC">
          <el-input type="textarea" autosize placeholder="请输入備註" clearable v-model="dataform.REMARK_DESC" />
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
</template>

<script>
import { codedtlInfo, createCodedtl, updateCodedtl, deleteCodedtl, countCodedtl } from '@/api/codedtl'
import Pagination from '@/components/Pagination' // 分页

export default {
  props: {
    dictObj: {
      type: Object
    }
  },
  components: { Pagination },
  data() {
    const codeValidator = (rule, value, callback) => {
      let query
      if (this.dialogStatus === 'create') {
        query = { CODE_NO: value, CODE_TYPE: this.dictObj.CODE_TYPE }
      } else {
        query = { CODE_NO: value, CODE_TYPE: this.dictObj.CODE_TYPE, ID: this.dataform.ID }
      }
      countCodedtl(query)
        .then(response => {
          console.log('countCodedtl', response.data.result)
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
      listQuery: {
        page: 1,
        limit: 10,
        CODE_TYPE: this.dictObj.CODE_TYPE,
        CODE_NO: undefined,
        CODE_DESC: undefined
      },
      dataform: {
        ID: undefined,
        CODE_TYPE: this.dictObj.CODE_TYPE,
        CODE_NO: undefined,
        CODE_DESC: undefined,
        ENG_DESC: undefined,
        SORT_VALUE: undefined,
        REMARK_DESC: undefined
      },
      // 新增修改弹框
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      stateOption: [{
        value: '1',
        label: '启用'
      }, {
        value: '0',
        label: '禁用'
      }],
      rules: {
        CODE_NO: [
          { required: true, message: '請輸入代碼', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' }
        ],
        CODE_DESC: [
          { required: true, message: '請輸入代碼內容', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetForm(formName, query, getListMethod) {
      this.$refs[formName].resetFields()
      query.CODE_TYPE = this.dictObj.CODE_TYPE
      query.CODE_NO = undefined
      query.CODE_DESC = undefined
      getListMethod()
    },
    resetTemp() {
      this.dataform = {
        ID: undefined,
        CODE_TYPE: this.dictObj.CODE_TYPE,
        CODE_NO: undefined,
        CODE_DESC: undefined,
        ENG_DESC: undefined,
        SORT_VALUE: undefined,
        REMARK_DESC: undefined
      }
    },
    getList() {
      this.listLoading = true
      codedtlInfo(this.listQuery)
        .then(response => {
          this.list = response.data.result.rows
          this.total = response.data.result.count
          this.listLoading = false
        })
        .catch(() => {
          this.listLoading = false
        })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          this.fullLoading = true
          createCodedtl(this.dataform)
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
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.dataform)
          this.fullLoading = true
          updateCodedtl(tempData)
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
      this.$confirm('確認刪除該記錄？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullLoading = true
        deleteCodedtl(row.ID)
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
        this.$notify({
          title: '刪除',
          message: '刪除取消！',
          type: 'info',
          duration: 2000
        })
        // this.notifyMessage('info', '刪除取消！')
      })
    }
  }
}
</script>
