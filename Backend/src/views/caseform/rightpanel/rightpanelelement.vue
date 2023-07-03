<template>
  <div>
    <el-container>
      <el-header>
        <b>插入 數據元</b>
      </el-header>
      <div  style="overflow: auto;">
        <el-input
          placeholder="簡稱, 支持模糊搜索"
          clearable
          v-model="filterCodemstText">
        </el-input>

        <el-tree
          class="filter-tree"
          :data="codemstTreeData"
          :props="{ children: 'children',  label: 'CODE_DESC' }"
          default-expand-all
          :filter-node-method="filterNode"
          :expand-on-click-node="false"
          node-key="ID"
          ref="treeCodemst"
          highlight-current
          @node-click="codemstTreeNodeClick">
        </el-tree>
      </div>
    </el-container>
  </div>
</template>

<script>
import { codemstInfo } from '@/api/codemst'
import { codedtlInfo } from '@/api/codedtl'
import { getDoctorNames } from '@/api/external'

export default {
  name: 'RightpanelElement',
  components: {

  },
  watch: {
    filterCodemstText(val) {
      this.$refs.treeCodemst.filter(val)
    }
  },
  data() {
    return {
      editor: undefined,
      editorId: 'caseform',
      codemstTreeData: [],
      filterCodemstText: ''
    }
  },
  created() {
    this.getElementTree()
  },
  methods: {
    getElementTree() {
      codemstInfo()
        .then(response => {
          this.codemstTreeData = response.data.result.rows
        })
    },
    filterNode(value, data, node) {
      if (!value) return true
      return data.CODE_DESC.indexOf(value) !== -1
    },
    codemstTreeNodeClick(data) {
      console.log('tree node=====================================================', data)

      var placeStyle = 'width:auto'
      var orgID = data.CODE_TYPE
      var gTitle = data.CODE_BACKGROUND_DESC.replace(/\"/g, '&quot;')
      var gComment = data.CODE_DESC.replace(/\"/g, '&quot;')//data.CODE_BACKGROUND_DESC.replace(/\"/g, '&quot;')
      var gTooltip = data.CODE_TIP_DESC
      var options = gTitle
      var defaultValue = gTitle
      var bindData = []
      var method = "get"
      var url = "http://localhost:8080/api/external/getDoctorNames" //data.DATA_SOURCE
      if(data.DATA_SOURCE && data.DATA_SOURCE != '') {
      //   getDoctorNames()
      //     .then(response => {
      //       for(var i=0;i<response.data.length;i++) {
      //         bindData.push({
      //           VALUE: response.data[i],
      //           TEXT: response.data[i],
      //           SELECTED: false
      //         })
      //       }
          this.$axios({
            method,
            url
          }).then(response => {
            for(var i=0;i<response.data.length;i++) {
              bindData.push(response.data[i])
              if(response.data[i].SELECTED) options = response.data[i].TEXT
            }
            var obj = {
              type: 'select',
              dynaUrl: data.DATA_SOURCE,
              orgname: gTitle,
              orgID: orgID || '',
              color: '#3c3c3c',
              defaultValue: defaultValue,
              bindData: bindData
            }
            var objStr = JSON.stringify(obj).replace(/\"/g, "\'")

            var html = '<span class="oak-field oakplugin" style="' + placeStyle + '" oakplugin="select" id="' + orgID + '" title="' + gTooltip + '" obj="' + objStr + '" contenteditable="false">'
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
          }).catch(err => {
            this.$notify({
              title: '错误',
              message: err.message,
              type: 'error'
            })
          })
      } else {
        codedtlInfo({ CODE_TYPE: data.CODE_TYPE })
          .then(response => {
            this.list = response.data.result.rows
            for (var i = 0; i < this.list.length; i++) {
              bindData.push({
                VALUE: this.list[i].CODE_DESC,
                TEXT: this.list[i].CODE_DESC,
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
}
</script>

<style lang="scss" scoped>
  .filter-tree {
    margin-top: 2vh;
  }
</style>
