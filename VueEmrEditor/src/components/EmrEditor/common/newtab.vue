<template>
  <!-- <el-tabs
    type="border-card"
    @tab-click="handleClick"
    style="font-size: 12px;border: solid 1px #E4E7ED">
    <el-tab-pane label="文件"> -->

      <FileTab :transMst="transMst"/>
    <!-- </el-tab-pane> -->
    <!-- <el-tab-pane label="編輯">
      <EditTab/>
    </el-tab-pane>
    <el-tab-pane label="插入">
      <InsertTab/>
    </el-tab-pane>
    <el-tab-pane label="表格">
      <FormTab/>
    </el-tab-pane> -->
    <!-- </el-tabs> -->
</template>

<script>
import FileTab from './filetab'
import EditTab from './edittab'
import InsertTab from './inserttab'
import FormTab from './formtab'

export default {
  name: 'NewTab',
  components: { FileTab, EditTab, InsertTab, FormTab },
  props: ['transMst'],
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}

</script>
<style lang="scss" scoped>

</style>
