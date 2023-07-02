<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xl="4" :lg="5" :md="6" :sm="6" :xs="24">
        <el-input
          placeholder="分類簡稱, 支持模糊搜索"
          clearable
          v-model="filterConceptText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="pictureTreeData"
          :props="{ children: 'children',  label: 'FOLDER_NAME' }"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          node-key="ID"
          ref="tree"
          highlight-current
          @node-click="pictureTreeNodeClick">
        </el-tree>
      </el-col>
      <el-col :xl="20" :lg="19" :md="18" :sm="18" :xs="24">
        <el-form :model="listQuery" ref="filterForm" :inline="true">
          <el-form-item label="圖名稱" prop="FILE_NAME">
            <el-input v-model="listQuery.FILE_NAME" placeholder="圖名稱，支持模糊搜索" @keyup.enter.native="handleFilter" />
          </el-form-item>

          <el-form-item>
            <el-button v-waves v-permission="'picture_query'" type="primary" icon="el-icon-search" @click="handleFilter" v-loading.fullscreen.lock="fullLoading">
              搜索
            </el-button>
            <el-button v-waves v-permission="'picture_query'" type="success" icon="el-icon-refresh" @click="resetFormInfo">
              重置
            </el-button>
            <el-button v-waves  v-permission="'picture_add'" type="primary" icon="el-icon-plus" @click="handleCreate">
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
          <el-table-column type="expand" >
            <template slot-scope="props">
              <el-form label-position="left" class="table-expand-title">
                <el-row>
                  <el-col :span="24">
                    <el-form-item label="圖內容敘述">
                      <span>{{ props.row.FILE_DESC }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column label="序号" type="index" width="50px" />
          <el-table-column label="圖編碼" prop="PIC_SAMPLE_KEY" align="center" width="150px" sortable="custom"/>
          <el-table-column label="圖名稱" prop="FILE_NAME"  align="center" width="150px" sortable="custom"/>
          <el-table-column label="圖檔" prop="FILE_PATH" align="center" width="150px" sortable="custom">
            <template slot-scope="{row}">
              <img width="100%" height="100%" v-if="row.FILE_PATH" :src="filePath(row.FILE_PATH)" alt="">
            </template>
          </el-table-column>

          <el-table-column label="修改时间" prop="F_LASTMODIFYTIME" align="center" width="140px" sortable="custom">
            <template slot-scope="{row}">
              <span>{{ row.F_LASTMODIFYTIME | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="160px" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button v-waves v-permission="'picture_edit'" type="primary" size="mini" @click="handleUpdate(row)">
                修改
              </el-button>
              <el-button v-waves v-permission="'picture_delete'" size="mini" type="danger" @click="handleDelete(row)">
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
      </el-col>
    </el-row>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal='false' width="800px">
      <el-form class="dialog-from-margin" ref="formRef" :rules="rules" status-icon :model="dataform" label-position="left" label-width="100px">
        <el-form-item label="父節點名稱" prop="FOLDER_ID">
          <el-cascader
            ref="pictureTreeSelect"
            v-model="dataform.FOLDER_ID"
            :options="pictureTreeData"
            :props="{ checkStrictly: true, label: 'FOLDER_NAME', value: 'ID'}"
            clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="圖編碼" prop="PIC_SAMPLE_KEY">
          <el-input  clearable v-model="dataform.PIC_SAMPLE_KEY" show-word-limit placeholder="请输入圖編碼"/>
        </el-form-item>
        <el-form-item label="圖名稱" prop="FILE_NAME">
          <el-input  clearable v-model="dataform.FILE_NAME"  show-word-limit placeholder="请输入圖名稱"/>
        </el-form-item>
        <el-form-item label="圖內容敘述" prop="FILE_DESC">
          <el-input type="textarea" autosize placeholder="請輸入圖內容敘述" clearable v-model="dataform.FILE_DESC" />
        </el-form-item>
        <el-form-item label="圖檔" prop="FILE_PATH" >
          <!-- <Upload v-model="postForm.FILE_PICTURE" /> -->
          <button style="display:block;width:120px; height:30px;" onclick="document.getElementById('getFile').click()">選擇圖片</button>
          <input type="file" accept="image/*" id="getFile" style="display:none" @change="onFileChange"/>
          <div class="el-upload el-upload--picture-card" style="cursor:auto">
            <img ref="formImage" width="100%" height="100%" v-if="dataform.FILE_PATH" :src="filePath(dataform.FILE_PATH)" alt="">
          </div>
        </el-form-item>
        <el-form-item label="圖分類" prop="FILE_TYPE" >
          <span> {{dataform.FILE_TYPE}} </span>
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
import { pictureInfo, createPicture, updatePicture, deletePicture, countPicture } from '@/api/picture'
import Pagination from '@/components/Pagination'

export default {
  name: '圖片庫管理',
  components: { Pagination },
  watch: {
    filterConceptText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
     const keyValidator = (rule, value, callback) => {
      let query
      if (this.dialogStatus === 'create') {
        query = { PIC_SAMPLE_KEY: value}
      } else {
        query = { PIC_SAMPLE_KEY: value, ID: this.dataform.ID }
      }
      countPicture(query)
        .then(response => {
          if (response.data.result > 0) {
            callback(new Error('圖編碼已存在，請重新輸入'))
          } else {
            callback()
          }
        })
    }
    return {
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
        FOLDER_ID: undefined,
        FILE_NAME: undefined
      },
      // 部门树过滤条件
      filterConceptText: '',
      // 部门树
      pictureTreeData: [],
      dataform: {
        ID: null,
        FOLDER_ID: null,
        PIC_SAMPLE_KEY: null,
        FILE_NAME: null,
        FILE_DESC: null,
        FILE_PICTURE: null,
        FILE_PATH: null,
        FILE_TYPE: null
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },
      rules: {
        FOLDER_ID: [
          { required: true, message: '請選擇父節點', trigger: 'blur' }
        ],
        PIC_SAMPLE_KEY: [
          { required: true, message: '請輸入圖編碼', trigger: 'blur' },
          { validator: keyValidator, trigger: 'blur' }
        ],
        FILE_NAME: [
          { required: true, message: '請輸入圖名稱', trigger: 'blur' }
        ],
        FILE_PATH: [
          { required: true, message: '請上傳圖片', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getPictureTree()
    this.getList()
  },
  methods: {
    filePath(path) {
      if (path.indexOf('blob') !== -1) return path
      else return process.env.VUE_APP_BASE_API + '/uploads/' + path
    },
    getList() {
      this.listLoading = true
      pictureInfo(this.listQuery)
        .then(response => {
          this.expands = []
          this.list = response.data.result.rows
          this.total = response.data.result.count
          this.listLoading = false
          console.log('length:', this.list.length)
          // for(var i=0;i<this.list.length;i++) {
          //   if(this.list[i].FILE_PICTURE) {
          //     var bytes = new Uint8Array(this.list[i].FILE_PICTURE.data);
          //     var binary = bytes.reduce((data, b) => data += String.fromCharCode(b), '');
          //     this.list[i].FILE_PICTURE = "data:image/jpeg;base64," + btoa(binary);
          //   }
          // }
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
        ID: null,
        FOLDER_ID: null,
        PIC_SAMPLE_KEY: null,
        FILE_NAME: null,
        FILE_DESC: null,
        FILE_PICTURE: null,
        FILE_PATH: null,
        FILE_TYPE: null
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
          if (this.dataform.FOLDER_ID !== undefined && this.dataform.FOLDER_ID.length > 0) { this.dataform.FOLDER_ID = this.dataform.FOLDER_ID[this.dataform.FOLDER_ID.length - 1] }

          this.fullLoading = true
          // const tempDataForm = Object.assign({}, this.dataform)
          const formDat = new FormData()
          formDat.append('FOLDER_ID', this.dataform.FOLDER_ID)
          formDat.append('PIC_SAMPLE_KEY', this.dataform.PIC_SAMPLE_KEY)
          formDat.append('FILE_NAME', this.dataform.FILE_NAME)
          formDat.append('FILE_DESC', this.dataform.FILE_DESC)
          formDat.append('FILE_PICTURE', this.dataform.FILE_PICTURE)
          formDat.append('FILE_TYPE', this.dataform.FILE_TYPE)

          createPicture(formDat, { 'Content-Type': 'multipart/form-data' })
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
      // 重新获取部门以及角色列表
      this.$nextTick(() => {
        this.$refs['formRef'].clearValidate()
      })
    },
    updateData() {
      this.$refs['formRef'].validate((valid) => {
        if (valid) {
          if (Array.isArray(this.dataform.FOLDER_ID)) { if (this.dataform.FOLDER_ID !== undefined && this.dataform.FOLDER_ID.length > 0) { this.dataform.FOLDER_ID = this.dataform.FOLDER_ID[this.dataform.FOLDER_ID.length - 1] } }
          // const tempData = Object.assign({}, this.dataform)
          const formDat = new FormData()
          formDat.append('ID', this.dataform.ID)
          formDat.append('FOLDER_ID', this.dataform.FOLDER_ID)
          formDat.append('PIC_SAMPLE_KEY', this.dataform.PIC_SAMPLE_KEY)
          formDat.append('FILE_NAME', this.dataform.FILE_NAME)
          formDat.append('FILE_DESC', this.dataform.FILE_DESC)
          formDat.append('FILE_PICTURE', this.dataform.FILE_PICTURE)
          formDat.append('FILE_TYPE', this.dataform.FILE_TYPE)

          this.fullLoading = true
          updatePicture(formDat, { 'Content-Type': 'multipart/form-data' })
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
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.fullLoading = true
        deletePicture(row.ID)
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
      this.listQuery.FOLDER_ID = undefined
      this.listQuery.FILE_NAME = undefined
      this.getList()
    },
    // 类别树操作
    getPictureTree() {
      pictureFolderInfo({})
        .then(response => {
          this.pictureTreeData = response.data.result.rows
        })
    },
    filterNode(value, data, node) {
      if (!value) return true
      return data.FILE_NAME.indexOf(value) !== -1
    },
    pictureTreeNodeClick(data) {
      this.listQuery.FOLDER_ID = data.ID
      this.handleFilter()
    },
    onFileChange(e) {
      const file = e.target.files[0]

      this.dataform.FILE_PATH = URL.createObjectURL(file)
      this.dataform.FILE_TYPE = file.type
      console.log('picture type:' + this.dataform.FILE_TYPE)

      this.dataform.FILE_PICTURE = file

      // this.datafor.FORM_DATA = new FormData();
      // this.datafor.FORM_DATA.append("FILE_PICTURE", file);

      // this.dataform.FILE_PICTURE = file

      // const reader = new FileReader()
      // reader.readAsDataURL(file)
      // reader.onload = e => {
      //   this.dataform.FILE_PICTURE = e.target.result
      //   console.log(this.dataform.FILE_PICTURE)
      // }
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
    /* width: 60px; */
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
