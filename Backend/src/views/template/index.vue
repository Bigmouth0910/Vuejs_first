<template>
  <div class="app-container">
    <el-row :gutter="20">
      <el-col :xl="4" :lg="4" :md="6" :sm="6" :xs="24">
        <div>
          <span style="cursor: pointer;" @click="handleCreateModel()" >
            <center ><i class="el-icon-plus"></i> &nbsp; 新建模板</center>
          </span>
          <el-input
            placeholder="輸入關鍵字進行過濾"
            clearable
            style="margin-top: 10px"
            v-model="filterModelText">
          </el-input>
          <el-tree
            class="filter-tree"
            :data="data"
            :props="defaultProps"
            default-expand-all
            :filter-node-method="filterModelNode"
            :expand-on-click-node="true"
            ref="treeModel"
            node-key="value"
            highlight-current
            @node-click="handleModelNodeClick">
          </el-tree>
        </div>
      </el-col>
      <el-col :xl="14" :lg="14" :md="11" :sm="12" :xs="24">
        <span>&nbsp;</span>
        <el-tabs type="border-card" >
          <el-tab-pane :label="selectedModelName" style="padding:0px">
            <EmrEditor id="template" mod="design" content="test"/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :xl="6" :lg="6" :md="7" :sm="6" :xs="24" style="padding:0px">
        <RightPanel/>
      </el-col>
    </el-row>

    <div >
      <el-dialog title="新增" :visible.sync="dialogFormVisible" width="30%" slot="{node, data}">
        <el-form ref="addModelForm" :model="addModelForm" :rules="addModelRules" autocomplete="on" label-position="right">
          <el-form-item label="父节点名称" :label-width="formLabelWidth" prop="parent">
            <el-cascader
              ref="parent"
              placeholder="請選擇"
              v-model="addModelForm.parent"
              :options="data[1]"
              @change="handleChangeParentNode"
              :show-all-levels="false"
              filterable
              style="display:flex">
              <!-- :props="{ expandTrigger: 'hover' }" -->
            </el-cascader>
          </el-form-item>
          <el-form-item label="节点名称" :label-width="formLabelWidth" prop="children">
            <el-input
              ref="children"
              v-model="addModelForm.children"
              autocomplete="on" >
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer"  style="text-align: center">
          <el-button type="primary" @click.native.prevent="handleAddModel(data)" >确定</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import RightPanel from '../caseform/rightpanel/index'
import EmrEditor from '../caseform/EmrEditor'

export default {
  name: '病例范本维护',
  components: {
    EmrEditor,
    RightPanel
  },
  data() {
    const data = [{
      value: '1',
      label: '通用模板',
      icon: 'el-icon-plus',
      children: [{
        value: '1-1',
        label: '入院記錄',
        children: [{
          value: '1-1-1',
          label: '入院記錄-精神科'
        }, {
          value: '1-1-2',
          label: '入院記錄-腦血管病'
        }, {
          value: '1-1-3',
          label: '入院記錄-神經內科'
        }]
      }, {
        value: '1-2',
        label: '住院記錄',
        children: [{
          value: '1-2-1',
          label: '住院病歷-男性'
        }, {
          id: '1-2-2',
          label: '住院病歷-女性'
        }]
      }, {
        value: '1-3',
        label: '病案首頁',
        children: [{
          value: '1-3-1',
          label: '中醫住院病案首頁'
        }, {
          value: '1-3-2',
          label: '住院病案首頁'
        }]
      }]
    }, {
      value: '2',
      label: '其他',
      icon: 'el-icon-plus',
      children: [{
        value: '2-1',
        label: 'AAA',
        children: [{
          value: '2-1-1',
          label: 'AAA-111'
        }]
      }]
    }]

    const validateParent = (rule, value, callback) => {
      console.log(value.length)
      if (value.length <= 0) {
        callback(new Error('請選擇父節點名稱'))
      } else {
        callback()
      }
    }
    const validateChildren = (rule, value, callback) => {
      console.log(value.length)
      if (value.length <= 0) {
        callback(new Error('請輸入節點名稱'))
      } else {
        callback()
      }
    }

    const addModelForm = {
      parent: '',
      children: ''
    }
    return {
      selectedModelName: '入院記錄-精神科',
      filterModelText: '',
      dialogFormVisible: false,
      addModelForm: addModelForm,
      addModelRules: {
        parent: [{ required: true, trigger: 'blur', validator: validateParent }],
        children: [{ required: true, trigger: 'blur', validator: validateChildren }]
      },
      formLabelWidth: '120px',
      data: data,
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon'
      }
    }
  },
  watch: {
    filterModelText(val) {
      this.$refs.treeModel.filter(val)
    }
  },
  computed: {
    showUEditor() {
      if (this.selectedModelName === undefined) {
        return true
      } else {
        return false
      }
    }
  },
  mounted() {
    // this.$refs.treeModel.setCurrentNode("1-1-1")
  },
  methods: {
    handleModelNodeClick(data) {
      if (data.children === undefined) {
        this.selectedModelName = data.label
      }
    },

    filterModelNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },

    handleCreateModel() {
      console.log('handleCreateModle')
      this.dialogFormVisible = true
      this.addModelForm.parent = ''
      this.addModelForm.children = ''
    },

    handleAddModel(data) {
      this.$refs.addModelForm.validate(valid => {
        if (valid) {
          console.log(data)
          const newChild = { value: 99, label: 'testtest', children: [] }
          this.$set(data, 'children', [])
          data.children.push(newChild)
          this.dialogFormVisible = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
      this.dialogFormVisible = false
    },

    handleChangeParentNode(value) {
      console.log(value)
    }
  }
}
</script>

<style lang="scss" scoped>

  .filter-tree {
    margin-top: 2vh;
  }
  .el-tabs--border-card {
    .el-tabs__content {
      padding: 0 !important;
    }
  }

</style>
