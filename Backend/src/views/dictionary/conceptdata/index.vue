<template>
  <div class="app-container" >
    <el-row :gutter="20">
      <el-col :xl="4" :lg="5" :md="6" :sm="6" :xs="24">
        <div  style="overflow: auto;height:500px;">
          <el-input
            placeholder="分類簡稱, 支持模糊搜索"
            clearable
            v-model="filterConceptText">
          </el-input>

          <el-tree
            class="filter-tree"
            :data="conceptTreeData"
            :props="{ children: 'children',  label: 'F_FULLNAME' }"
            default-expand-all
            :filter-node-method="filterNode"
            :expand-on-click-node="false"
            node-key="F_ID"
            ref="tree"
            highlight-current
            @node-click="conceptTreeNodeClick">
          </el-tree>
        </div>
      </el-col>
      <el-col :xl="20" :lg="19" :md="18" :sm="18" :xs="24">
        <el-form :model="listQuery" ref="filterForm" :inline="true">
          <el-form-item label="字典名稱" prop="F_FULLNAME">
            <el-input v-model="listQuery.F_FULLNAME" placeholder="字典名稱，支持模糊搜索" @keyup.enter.native="handleFilter" />
          </el-form-item>

          <el-form-item>
            <el-button v-waves v-permission="'concept_query'" type="primary" icon="el-icon-search" @click="handleFilter" v-loading.fullscreen.lock="fullLoading">
              搜索
            </el-button>
            <el-button v-waves v-permission="'concept_query'" type="success" icon="el-icon-refresh" @click="resetFormInfo">
              重置
            </el-button>
            <el-button v-waves  v-permission="'concept_add'" type="primary" icon="el-icon-plus" @click="handleCreate">
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
          row-key="F_ID"
          :expand-row-keys="expands"
        >
          <el-table-column type="expand" >
            <template slot-scope="props">
              <el-form label-position="left" class="table-expand-title">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="是默認的">
                      <el-tag class="tags-margin" effect="plain" type="info" >{{ props.row.F_ISDEFAULT }}</el-tag>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="啟用標誌">
                      <el-tag class="tags-margin" effect="plain" type="info" >{{ props.row.F_ENABLEDMARK }}</el-tag>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="描述">
                      <span>{{ props.row.F_DESCRIPTION }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="簡單的拼寫">
                      <span>{{ props.row.F_SIMPLESPELLING }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </template>
          </el-table-column>

          <el-table-column label="序号" type="index" width="50px" />
          <el-table-column label="字典名稱" prop="F_FULLNAME" align="center" width="200px" sortable="custom"/>
          <el-table-column label="代碼" prop="F_CODE"  align="center" width="200px" sortable="custom"/>
          <el-table-column label="排序" prop="F_SORTCODE" align="center"  width="80px" sortable="custom"/>
          <el-table-column label="修改时间" prop="F_LASTMODIFYTIME" align="center" width="140px" sortable="custom">
            <template slot-scope="{row}">
              <span>{{ row.F_LASTMODIFYTIME | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
            </template>
          </el-table-column>

          <el-table-column label="操作" align="center" width="160px" class-name="small-padding fixed-width">
            <template slot-scope="{row}">
              <el-button v-waves v-permission="'conceptdata_edit'" type="primary" size="mini" @click="handleUpdate(row)">
                修改
              </el-button>
              <el-button v-waves v-permission="'conceptdata_delete'" size="mini" type="danger" @click="handleDelete(row)">
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
        <el-form-item label="父節點名稱" prop="F_PARENTID">
          <el-cascader
            ref="conceptSelect"
            v-model="dataform.F_PARENTID"
            :options="conceptTreeData"
            :props="{ label: 'F_FULLNAME', value: 'F_ID'}"
            clearable>
          </el-cascader>
        </el-form-item>

        <el-form-item label="字典簡稱" prop="F_FULLNAME">
          <el-input  clearable v-model="dataform.F_FULLNAME" show-word-limit placeholder="请输入字典簡稱"/>
        </el-form-item>
        <el-form-item label="代碼" prop="F_CODE">
          <el-input  clearable v-model="dataform.F_CODE"  show-word-limit placeholder="请输入代碼"/>
        </el-form-item>
        <el-form-item label="簡單的拼寫" prop="F_SIMPLESPELLING">
          <el-input type="textarea" autosize placeholder="請輸入簡單的拼寫" clearable v-model="dataform.F_SIMPLESPELLING" />
        </el-form-item>
        <el-form-item label="描述" prop="F_DESCRIPTION">
          <el-input type="textarea" autosize placeholder="請輸入描述" clearable v-model="dataform.F_DESCRIPTION" />
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="排序代碼" prop="F_SORTCODE">
              <el-input-number controls-position="right" :min="0" clearable v-model.number="dataform.F_SORTCODE" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="默認" prop="F_ISDEFAULT">
              <el-switch
                v-model="dataform.F_ISDEFAULT"
                :active-value="1"
                :inactive-value='0'
                active-text="是"
                inactive-text="否">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="標誌" prop="F_ENABLEDMARK">
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
import { conceptdataInfo, createConceptdata, updateConceptdata, deleteConceptdata, countConceptdata } from '@/api/conceptdata'
import { conceptInfo } from '@/api/concept'
import Pagination from '@/components/Pagination'

export default {
  name: '字典管理',
  components: { Pagination },
  watch: {
    filterConceptText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    const codeValidator = (rule, value, callback) => {
      let query
      if (this.dialogStatus === 'create') {
        query = { F_CODE: value}
      } else {
        query = { F_CODE: value, F_ID: this.dataform.F_ID }
      }
      countConceptdata(query)
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
      // 全局遮罩
      fullLoading: false,
      // 默认展开节点
      expands: [],
      listQuery: {
        page: 1,
        limit: 10,
        F_PARENTID: undefined,
        F_FULLNAME: undefined
      },
      // 部门树过滤条件
      filterConceptText: '',
      // 部门树
      conceptTreeData: [],
      dataform: {
        F_ID: undefined,
        F_PARENTID: undefined,
        F_FULLNAME: undefined,
        F_CODE: undefined,
        F_SIMPLESPELLING: undefined,
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
        F_PARENTID: [
          { required: true, message: '請選擇父節點', trigger: 'blur' }
        ],
        F_FULLNAME: [
          { required: true, message: '請輸入字典簡稱', trigger: 'blur' }
        ],
        F_CODE: [
          { required: true, message: '請輸入代碼', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.getConceptTree()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      conceptdataInfo(this.listQuery)
        .then(response => {
          this.expands = []
          this.list = response.data.result.rows
          this.total = response.data.result.count
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
    resetTemp() {
      this.dataform = {
        F_ID: undefined,
        F_PARENTID: undefined,
        F_FULLNAME: undefined,
        F_CODE: undefined,
        F_SIMPLESPELLING: undefined,
        F_SORTCODE: undefined,
        F_ENABLEDMARK: undefined
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

          if (this.dataform.F_PARENTID !== undefined && this.dataform.F_PARENTID.length > 0) { this.dataform.F_PARENTID = this.dataform.F_PARENTID[this.dataform.F_PARENTID.length - 1] } else this.dataform.F_PARENTID = null

          const tempDataForm = Object.assign({}, this.dataform)
          console.log('parentid', tempDataForm.F_PARENTID)
          createConceptdata(tempDataForm)
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
          if (Array.isArray(this.dataform.F_PARENTID)) { if (this.dataform.F_PARENTID !== undefined && this.dataform.F_PARENTID.length > 0) { this.dataform.F_PARENTID = this.dataform.F_PARENTID[this.dataform.F_PARENTID.length - 1] } else this.dataform.F_PARENTID = null }

          const tempData = Object.assign({}, this.dataform)
          this.fullLoading = true
          updateConceptdata(tempData)
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
        deleteConceptdata(row.F_ID)
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
      this.listQuery.F_PARENTID = undefined
      this.listQuery.F_FULLNAME = undefined
      this.getList()
    },
    // 字典类别树操作
    getConceptTree() {
      conceptInfo()
        .then(response => {
          this.conceptTreeData = response.data.result.rows
        })
    },
    filterNode(value, data, node) {
      if (!value) return true
      return data.F_FULLNAME.indexOf(value) !== -1
    },
    conceptTreeNodeClick(data) {
      // if(data.children === undefined) {
      this.listQuery.F_PARENTID = data.F_ID
      this.handleFilter()
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
