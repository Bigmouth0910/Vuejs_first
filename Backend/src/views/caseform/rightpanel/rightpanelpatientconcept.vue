<template>
  <div>
    <el-container>
      <el-header>
        <b>插入 標準數據源</b>
        <el-input
          placeholder="輸入關鍵字進行過濾"
          clearable
          style="margin-top: 10px"
          v-model="filterElementText">
        </el-input>
      </el-header>
      <el-tree
        class="filter-tree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterElementNode"
        :expand-on-click-node="true"
        ref="treeElement"
        node-key="id"
        highlight-current
        @node-click="handleElementNodeClick">
      </el-tree>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'RightpanelDataSource',
  components: {

  },
  data() {
    const data = [{
      id: 'element1',
      label: '標準數據源',
      icon: 'el-icon-plus',
      children: [{
        id: 'element1-1',
        label: '年齡（歲）'
      }, {
        id: 'element1-1',
        label: '年齡（月）'
      }, {
        id: 'element1-1',
        label: '審核醫師簽名'
      }, {
        id: 'element1-1',
        label: '特殊檢查標誌'
      }, {
        id: 'element1-1',
        label: '性別代碼'
      }, {
        id: 'element1-1',
        label: '醫療機構組織機構代碼'
      }, {
        id: 'element1-1',
        label: '診斷機構名稱'
      }, {
        id: 'element1-1',
        label: '診斷日期'
      }, {
        id: 'element1-1',
        label: '診療過程描述'
      }, {
        id: 'element1-1',
        label: '症狀開始日期時間'
      }, {
        id: 'element1-1',
        label: '症狀描述'
      }, {
        id: 'element1-1',
        label: '症狀停止日期時間'
      }, {
        id: 'element1-1',
        label: '住院號'
      }]
    }, {
      id: 'element2',
      label: '一般治療處置記錄',
      icon: 'el-icon-plus',
      children: [{
        id: 'element1-1-1',
        label: '一般治療處置記錄1'
      }]
    }, {
      id: 'element3',
      label: '助產記錄',
      icon: 'el-icon-plus',
      children: [{
        id: 'element1-1-1',
        label: '助產記錄1'
      }]
    }, {
      id: 'element4',
      label: '護理操作記錄',
      icon: 'el-icon-plus',
      children: [{
        id: 'element1-1-1',
        label: '護理操作記錄1'
      }]
    }, {
      id: 'element5',
      label: '護理評估與計劃',
      icon: 'el-icon-plus',
      children: [{
        id: 'element1-1-1',
        label: '護理評估與計劃1'
      }]
    }, {
      id: 'element5',
      label: '知情告知信息',
      icon: 'el-icon-plus',
      children: [{
        id: 'element1-1-1',
        label: '知情告知信息1'
      }]
    }]

    return {
      filterElementText: '',
      data: data,
      defaultProps: {
        children: 'children',
        label: 'label',
        icon: 'icon'
      }
    }
  },
  watch: {
    filterElementText(val) {
      this.$refs.treeElement.filter(val)
    }

  },

  methods: {
    handleElementNodeClick(data) {
      console.log('model node:', data)
    },

    filterElementNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<style lang="scss" scoped>
  .filter-tree {
    margin-top: 2vh;
  }
</style>
