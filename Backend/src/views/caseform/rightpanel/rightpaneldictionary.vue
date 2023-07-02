<template>
  <div>
    <el-container>
      <el-header>
        <b>插入 字典</b>
      </el-header>
      <div  style="overflow: auto;">
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
    </el-container>
  </div>
</template>

<script>
import { conceptInfo } from '@/api/concept'
import { conceptdataInfo } from '@/api/conceptdata'

export default {
  name: 'RightpanelDictionary',
  components: {

  },
  watch: {
    filterConceptText(val) {
      this.$refs.tree.filter(val)
    }
  },
  data() {
    return {
      editor: undefined,
      editorId: 'caseform',
      conceptTreeData: [],
      filterConceptText: ''
    }
  },
  created() {
    this.getConceptTree()
  },
  methods: {
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
      var placeStyle = 'width:auto'
      var orgID = data.F_CODE
      var gTitle = data.F_FULLNAME.replace(/\"/g, '&quot;')
      var options = gTitle
      var defaultValue = gTitle
      var bindData = []

      conceptdataInfo({ F_PARENTID: data.F_ID })
        .then(response => {
          this.list = response.data.result.rows
          for (var i = 0; i < this.list.length; i++) {
            bindData.push({
              VALUE: this.list[i].F_FULLNAME,
              TEXT: this.list[i].F_FULLNAME,
              SELECTED: false
            })
          }
          var obj = {
            type: 'select',
            dynaUrl: '',
            orgname: gTitle,
            orgID: orgID || '',
            color: '#3c3c3c',
            defaultValue: defaultValue,
            bindData: bindData
          }
          var objStr = JSON.stringify(obj).replace(/\"/g, "\'")

          var html = '<span class="oak-field oakplugin" style="' + placeStyle + '" oakplugin="select" id="' + orgID + '" title="' + gTitle + '" obj="' + objStr + '" contenteditable="false">'
          html += '<span class="oak-field oak-left" style="' + placeStyle + '" contenteditable="false">[</span>'
          html += '<span class="oak-field oak-field-value" style="color: ' + obj.color + '">' + options + '</span>'
          html += '<span class="oak-field oak-right" style="' + placeStyle + '" contenteditable="false">]</span>'
          html += '</span>'

          if (this.editor === undefined || this.editor === null) {
            this.editor = UE.getEditor(this.editorId)
          }
          if (this.editor !== null) {
            this.editor.execCommand('inserthtml', html)
          }
        })
        .catch(() => {
          this.$notify({
            title: '錯誤',
            message: '網絡錯誤！',
            type: 'info',
            duration: 2000
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-tree {
    margin-top: 2vh;
  }
</style>
