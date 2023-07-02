<template>
  <div class="app-container">
    <el-form :model="listQuery" ref="filterForm" :inline="true">
      <el-form-item label="編號" prop="CODE_TYPE">
        <el-input v-model="listQuery.CODE_TYPE" placeholder="編號，支持模糊搜索" clearable @keyup.enter.native="handleFilter" />
      </el-form-item>
      <!-- <el-form-item label="名稱" prop="CODE_DESC">
        <el-input v-model="listQuery.CODE_DESC" placeholder="名稱，支持模糊搜索" clearable @keyup.enter.native="handleFilter" />
      </el-form-item> -->
      <el-form-item label="狀態" prop="ENABLED">
        <el-select v-model="listQuery.ENABLED" clearable filterable placeholder="請選擇狀態">
          <el-option
            v-for="item in stateOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button v-waves v-permission="'codemst_query'"  type="primary" icon="el-icon-search" @click="handleFilter">
          搜索
        </el-button>
        <el-button v-waves v-permission="'codemst_query'"  type="success" icon="el-icon-refresh" @click="resetForm('filterForm', listQuery, getList)">
          重置
        </el-button>
        <el-button v-waves v-permission="'codemst_add'"  type="primary" icon="el-icon-plus" @click="handleCreate" v-loading.fullscreen.lock="fullLoading">
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
      <el-table-column type="expand" >
        <template slot-scope="props">
          <el-form label-position="left" class="table-expand-title">
            <el-row>
              <el-col :span="12">
                <el-form-item label="系統代號">
                  <el-tag class="tags-margin" effect="plain" type="info" >{{ props.row.SYSTEM_CODE }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="固定寬度">
                  <el-tag class="tags-margin" effect="plain" type="info" >{{ props.row.FIELD_WITHD }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="只讀狀態">
                  <el-tag class="tags-margin" effect="plain" type="info" >{{ props.row.READONLY_FLAG }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="數據源">
                  <el-tag class="tags-margin" effect="plain" type="info" >{{ props.row.DATA_SOURCE }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="用戶可以直接修改內容	">
                  <el-tag class="tags-margin" effect="plain" type="info">{{ props.row.USER_UPDATEABLE}}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="允許被刪除">
                  <el-tag class="tags-margin" effect="plain" type="info" >{{ props.row.USER_DELETEABLE }}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="允許選	">
                  <el-tag class="tags-margin" effect="plain" type="info">{{ props.row.ALLOW_MULTIPLE_CHOOICE}}</el-tag>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="輸入域類型	">
                  <el-tag class="tags-margin" effect="plain" type="info">{{ props.row.USER_INPUTTYPE}}</el-tag>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="序号" type="index" width="50px" />
      <el-table-column label="編號" prop="CODE_TYPE" align="left" width="150px" sortable="custom">
        <template slot-scope="{row}">
          <el-tooltip effect="dark" content="點擊進入詳情" placement="bottom-start">
            <el-tag style="cursor:pointer" @click="openDictDetails(row)" >{{ row.CODE_TYPE }}</el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="名称" prop="CODE_DESC" align="left" width="150px" sortable="custom"/>
      <el-table-column label="背景本文" prop="CODE_BACKGROUND_DESC" align="left" width="150px" sortable="custom"/>
      <el-table-column label="提示文本" prop="CODE_TIP_DESC" align="left" width="150px" sortable="custom"/>
      <el-table-column label="状态" prop="ENABLED" align="center" class-name="status-col" width="80px" sortable="custom">
        <template slot-scope="{row}">
          <el-switch
            @change="handleModifyStatus(row)"
            v-model="row.ENABLED"
            active-value='1'
            inactive-value='0'>
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="修改时间" prop="F_LASTMODIFYTIME" align="center" width="150px" sortable="custom">
        <template slot-scope="{row}">
          <span>{{ row.F_LASTMODIFYTIME | parseTime('{y}-{m}-{d} {h}:{i}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="250px" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button v-waves v-permission="'codemst_edit'"  type="primary" size="mini" @click="handleUpdate(row)">
            修改
          </el-button>
          <el-button v-waves v-permission="'codemst_delete'" size="mini" type="danger" @click="handleDelete(row)">
            删除
          </el-button>
          <el-button v-waves v-permission="'codemst_query'" size="mini" type="success" @click="openDictDetails(row)">
            详情
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />

    <el-dialog width="800px" :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" :close-on-click-modal='false'>
      <el-form class="dialog-from-margin" ref="formRef" :rules="rules" status-icon :model="dataform" label-position="left" label-width="100px">
        <el-form-item label="編號" prop="CODE_TYPE">
          <!-- <el-input :disabled="dialogStatus!=='create'" clearable v-model="dataform.CODE_TYPE"  placeholder="請輸入編號,且不可重复"/> -->
          <el-input clearable v-model="dataform.CODE_TYPE"  placeholder="請輸入編號,且不可重复"/>
        </el-form-item>
        <el-form-item label="名稱" prop="CODE_DESC">
          <el-input clearable v-model="dataform.CODE_DESC" placeholder="請輸入名稱"/>
        </el-form-item>
        <el-form-item label="背景本文" prop="CODE_BACKGROUND_DESC	">
          <el-input clearable v-model="dataform.CODE_BACKGROUND_DESC" placeholder="請輸入背景本文"/>
        </el-form-item>
        <el-form-item label="提示文本" prop="CODE_TIP_DESC">
          <el-input clearable v-model="dataform.CODE_TIP_DESC" placeholder="請輸入提示文本"/>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="固定寬度" prop="FIELD_WITHD">
              <el-input-number controls-position="right" :min="0" clearable v-model.number="dataform.FIELD_WITHD" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="輸入域類型" prop="USER_INPUTTYPE">
              <el-input-number controls-position="right" :min="0" clearable v-model.number="dataform.USER_INPUTTYPE" />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="只讀狀態" prop="READONLY_FLAG">
              <el-switch
                v-model="dataform.READONLY_FLAG"
                active-value='1'
                inactive-value='0'
                active-text="启用"
                inactive-text="禁用">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="數據源" prop="DATA_SOURCE">
             <el-input clearable v-model="dataform.DATA_SOURCE" placeholder="請輸入數據源"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
             <el-form-item label="状态" prop="ENABLED">
              <el-switch
                v-model="dataform.ENABLED"
                active-value='1'
                inactive-value='0'
                active-text="启用"
                inactive-text="禁用">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="可以修改內容" prop="USER_UPDATEABLE">
              <el-switch
                v-model="dataform.USER_UPDATEABLE"
                active-value='1'
                inactive-value='0'
                active-text="启用"
                inactive-text="禁用">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
             <el-form-item label="允許被刪除" prop="USER_DELETEABLE">
              <el-switch
                v-model="dataform.USER_DELETEABLE"
                active-value='1'
                inactive-value='0'
                active-text="启用"
                inactive-text="禁用">
              </el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="允許選" prop="ALLOW_MULTIPLE_CHOOICE">
              <el-switch
                v-model="dataform.ALLOW_MULTIPLE_CHOOICE"
                active-value='1'
                inactive-value='0'
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

    <el-dialog width="1024px" :title="dictDetailsTitle" top="10vh" :visible.sync="dialogDictDetails" >
      <DictDetails :dictObj="dataform" v-if="dialogDictDetails"/>
    </el-dialog>
  </div>
</template>

<script>
import { codemstInfo, createCodemst, updateCodemst, deleteCodemst, countCodemst } from '@/api/codemst'
import Pagination from '@/components/Pagination' // 分页
import DictDetails from './components/DictDetails' // 字典详情

export default {
  name: '数据元',
  components: { Pagination, DictDetails },
  data() {
    const codeValidator = (rule, value, callback) => {
      let query
      if (this.dialogStatus === 'create') {
        query = { CODE_TYPE: value }
      } else {
        query = { CODE_TYPE: value, ID: this.dataform.ID }
      }
      countCodemst(query)
        .then(response => {
          console.log('countCodemst', response.data.result)
          if (response.data.result > 0) {
            callback(new Error('編號已存在，請重新輸入'))
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
        CODE_TYPE: undefined,
        ENABLED: undefined
      },
      dataform: {
        ID: undefined,
        CODE_TYPE: undefined,
        CODE_DESC: undefined,
        CODE_BACKGROUND_DESC: undefined,
        CODE_TIP_DESC: undefined,
        FIELD_WITHD: undefined,
        READONLY_FLAG: undefined,
        ENABLED: undefined,
        DATA_SOURCE: undefined,
        USER_UPDATEABLE: undefined,
        USER_DELETEABLE: undefined,
        USER_INPUTTYPE: undefined,
        ALLOW_MULTIPLE_CHOOICE: undefined
      },
      // 新增修改弹框
      dialogFormVisible: false,
      // 字典详情弹框
      dialogDictDetails: false,
      // 字典详情标题
      dictDetailsTitle: '',
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
        CODE_DESC: [
          { required: true, message: '請輸入名稱', trigger: 'blur' }
        ],
        CODE_TYPE: [
          { required: true, message: '請輸入編號', trigger: 'blur' },
          { validator: codeValidator, trigger: 'blur' }
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
      query.CODE_TYPE = undefined
      query.ENABLED = undefined
      getListMethod()
    },
    resetTemp() {
      this.dataform = {
        ID: undefined,
        CODE_TYPE: undefined,
        CODE_DESC: undefined,
        CODE_BACKGROUND_DESC: undefined,
        CODE_TIP_DESC: undefined,
        FIELD_WITHD: undefined,
        READONLY_FLAG: undefined,
        ENABLED: undefined,
        DATA_SOURCE: undefined,
        USER_UPDATEABLE: undefined,
        USER_DELETEABLE: undefined,
        USER_INPUTTYPE: undefined,
        ALLOW_MULTIPLE_CHOOICE: undefined
      }
    },
    getList() {
      this.listLoading = true
      codemstInfo(this.listQuery)
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
    handleModifyStatus(row) {
      const obj = {}
      obj.ID = row.ID
      obj.ENABLED = row.ENABLED
      updateCodemst(obj)
        .then(response => {
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
          row.F_LASTMODIFYTIME = response.lastmodifytime
        })
        .catch(() => {
          this.$notify({
            title: '失败',
            message: '修改失败！',
            type: 'info',
            duration: 2000
          })
          row.ENABLED = !row.ENABLED
        })
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
          createCodemst(this.dataform)
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
          updateCodemst(tempData)
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
      this.$confirm('刪除該記錄同時刪除對應字典詳情，是否繼續刪除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.fullLoading = true
        deleteCodemst(row.CODE_TYPE)
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
    },
    openDictDetails(row) {
      this.dictDetailsTitle = row.CODE_DESC + '：详情'
      this.dataform = Object.assign({}, row) // copy obj
      this.dialogDictDetails = true
    }
  }
}
</script>
