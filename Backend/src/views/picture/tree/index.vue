<template>
  <div class="app-container">
    <el-form :model="listQuery" ref="filterForm" :inline="true">
      <el-form-item label="圖分類名稱" prop="FOLDER_NAME">
        <el-input v-model="listQuery.FOLDER_NAME" placeholder="圖分類名稱, 支持模糊搜索" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <el-form-item>
        <el-button v-waves v-permission="'picture_query'"  type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="'picture_query'"  type="success" icon="el-icon-refresh" @click="resetForm('filterForm', listQuery, getList)">
          重置
        </el-button>
        <el-button v-waves v-permission="'picture_add'" type="primary" icon="el-icon-plus" @click="handleCreate" v-loading.fullscreen.lock="fullLoading">
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
      <el-table-column label="分類編碼" prop="PIC_FOLDER_KEY" align="left" width="200px"/>
      <el-table-column label="分類名稱" prop="FOLDER_NAME" align="left" width="200px"/>
      <el-table-column label="修改时间" prop="F_LASTMODIFYTIME" align="center" width="150px">
        <template slot-scope="{row}">
          <span>{{ row.F_LASTMODIFYTIME | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves v-permission="'picture_edit'"  type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-waves v-permission="'picture_delete'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
      <el-form class="dialog-from-margin" ref="formRef" :rules="rules" status-icon :model="dataform" label-position="left" label-width="100px">
        <el-form-item label="父節點名稱" prop="PARENT_ID">
          <el-cascader
            ref="pictureTreeSelect"
            v-model="dataform.PARENT_ID"
            :options="list"
            :props="{ checkStrictly: true, label: 'FOLDER_NAME', value: 'ID'}"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="分類編碼" prop="PIC_FOLDER_KEY">
          <el-input  clearable v-model="dataform.PIC_FOLDER_KEY" show-word-limit placeholder="请输入分類編碼"/>
        </el-form-item>
        <el-form-item label="分類名稱" prop="FOLDER_NAME">
          <el-input  clearable v-model="dataform.FOLDER_NAME"  show-word-limit placeholder="请输入分類名稱"/>
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
import { pictureFolderInfo, createPictureFolder, updatePictureFolder, deletePictureFolder } from '@/api/picture_folder'
// import Pagination from '@/components/Pagination' // 分页

export default {
  name: '圖片庫分類管理',
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
        FOLDER_NAME: undefined
      },
      dataform: {
        ID: undefined,
        PARENT_ID: undefined,
        PIC_FOLDER_KEY: undefined,
        FOLDER_NAME: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      rules: {
        PIC_FOLDER_KEY: [
          { required: true, message: '請輸入分類編碼', trigger: 'blur' }
        ],
        FOLDER_NAME: [
          { required: true, message: '請輸入分類名稱', trigger: 'blur' }
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
      pictureFolderInfo(this.listQuery)
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
    resetForm(formName, query, getListMethod) {
      this.$refs[formName].resetFields()
      query.FOLDER_NAME = undefined
      getListMethod()
    },
    resetTemp() {
      this.dataform = {
        ID: undefined,
        PARENT_ID: undefined,
        PIC_FOLDER_KEY: undefined,
        FOLDER_NAME: undefined
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        // 重新加载上级部门数据
        this.$refs.pictureTreeSelect.loadNodes()
        this.$refs['formRef'].clearValidate()
      })
    },
    createData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (this.dataform.PARENT_ID !== undefined && this.dataform.PARENT_ID.length > 0) { this.dataform.PARENT_ID = this.dataform.PARENT_ID[this.dataform.PARENT_ID.length - 1] } else this.dataform.PARENT_ID = 0

          this.fullLoading = true
          createPictureFolder(this.dataform)
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
        this.$refs.pictureTreeSelect.loadNodes()
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (Array.isArray(this.dataform.PARENT_ID)) {
            if (this.dataform.PARENT_ID !== undefined && this.dataform.PARENT_ID.length > 0) { this.dataform.PARENT_ID = this.dataform.PARENT_ID[this.dataform.PARENT_ID.length - 1] } else this.dataform.PARENT_ID = 0
          }

          const tempData = Object.assign({}, this.dataform)
          this.fullLoading = true
          updatePictureFolder(tempData)
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
      this.$confirm('刪除該記錄，如果當前記錄下包含子節點請先刪除子節點，如果當前分類下存在圖片請先解除關係，是否繼續刪除？', '提示', {
        confirmButtonText: '確定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullLoading = true
        deletePictureFolder(row.ID)
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
