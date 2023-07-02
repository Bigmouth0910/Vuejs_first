<template>
  <div class="app-container">
    <el-form :model="listQuery" ref="filterForm" :inline="true">
      <el-form-item label="分類編號" prop="FORDER_ID">
        <el-input v-model="listQuery.FORDER_ID" placeholder="分類編號, 支持模糊搜索" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item label="分類簡稱" prop="FORDER_NAME">
        <el-input v-model="listQuery.FORDER_NAME" placeholder="分類簡稱, 支持模糊搜索" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item>
        <el-button v-waves v-permission="'order_query'"  type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="'order_query'"  type="success" icon="el-icon-refresh" @click="resetForm('filterForm', listQuery, getList)">
          重置
        </el-button>
        <el-button v-waves v-permission="'order_add'" type="primary" icon="el-icon-plus" @click="handleCreate" v-loading.fullscreen.lock="fullLoading">
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
      :expand-row-keys="expands"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column label="序号" type="index" width="50px" />
      <el-table-column label="分類編號" prop="FORDER_ID" align="left" width="150px"/>
      <el-table-column label="分類簡稱" prop="FORDER_NAME" align="left" width="200px"/>
      <el-table-column label="單元" prop="UNIT" align="left" width="200px"/>
      <el-table-column label="操作" align="center" width="200px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves v-permission="'order_edit'"  type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-waves v-permission="'order_delete'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
      <el-form class="dialog-from-margin" ref="formRef" :rules="rules" status-icon :model="dataform" label-position="left" label-width="100px">
        <el-form-item label="父節點名稱" prop="PARENT_FORDER_ID">
          <el-cascader
            ref="orderSelect"
            v-model="dataform.PARENT_FORDER_ID"
            :options="list"
            :props="{ checkStrictly: true, label: 'FORDER_NAME', value: 'FORDER_ID'}"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="分類編號" prop="FORDER_ID">
          <el-input  clearable v-model="dataform.FORDER_ID" placeholder="请输入分類編號"/>
        </el-form-item>
        <el-form-item label="分類簡稱" prop="FORDER_NAME">
          <el-input  clearable v-model="dataform.FORDER_NAME" show-word-limit placeholder="请输入分類簡稱"/>
        </el-form-item>
        <el-form-item label="單元" prop="UNIT">
          <el-input  clearable v-model="dataform.UNIT"  show-word-limit placeholder="请输入單元"/>
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
import { orderInfo, createOrder, updateOrder, deleteOrder } from '@/api/order'
// import Pagination from '@/components/Pagination' // 分页

export default {
  name: '病例表單分類管理',
  components: {
    // Pagination
  },
  data() {
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
        FORDER_ID: undefined,
        FORDER_NAME: undefined
      },
      dataform: {
        ID: undefined,
        FORDER_ID: undefined,
        PARENT_FORDER_ID: undefined,
        FORDER_NAME: undefined,
        UNIT: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      rules: {
        FORDER_ID: [
          { required: true, message: '請輸入分類編號', trigger: 'blur' }
        ],
        FORDER_NAME: [
          { required: true, message: '請輸入分類簡稱', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      orderInfo(this.listQuery)
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
        F_ID: undefined,
        F_PARENTID: undefined,
        F_FULLNAME: undefined,
        F_CODE: undefined,
        F_DESCRIPTION: undefined,
        F_SORTCODE: undefined
      }
    },
    resetForm(formName, query, getListMethod) {
      this.$refs[formName].resetFields()
      query.FORDER_ID = undefined
      query.FORDER_NAME = undefined
      getListMethod()
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
          if (this.dataform.PARENT_FORDER_ID !== undefined && this.dataform.PARENT_FORDER_ID.length > 0) { this.dataform.PARENT_FORDER_ID = this.dataform.PARENT_FORDER_ID[this.dataform.PARENT_FORDER_ID.length - 1] } else this.dataform.PARENT_FORDER_ID = null

          this.fullLoading = true
          createOrder(this.dataform)
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
        // 重新加载上级部门数据
        this.$refs.conceptSelect.loadNodes()
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (Array.isArray(this.dataform.PARENT_FORDER_ID)) { if (this.dataform.PARENT_FORDER_ID !== undefined && this.dataform.PARENT_FORDER_ID.length > 0) { this.dataform.PARENT_FORDER_ID = this.dataform.PARENT_FORDER_ID[this.dataform.PARENT_FORDER_ID.length - 1] } else this.dataform.PARENT_FORDER_ID = null }
          const tempData = Object.assign({}, this.dataform)

          this.fullLoading = true
          updateOrder(tempData)
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
      this.$confirm('刪除該記錄，如果當前記錄下包含子節點請先刪除子節點，如果當前分類下存在病历表單设计請先解除關係，是否繼續刪除？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullLoading = true
        deleteOrder(row.FORDER_ID)
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
