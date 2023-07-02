<template>
  <div>
    <el-container>
      <div>
        <el-row style="display:flex;justify-content:center;align-items:center;margin-top:10px;margin-bottom:10px">
          <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="24">
            <span class="demo-input-label">模板名稱:</span>
          </el-col>
          <el-col :xl="16" :lg="16" :md="16" :sm="16" :xs="24">
            <el-input
              placeholder=""
              v-model="inputModelName">
            </el-input>
          </el-col>
        </el-row>
        <el-row style="display:flex;justify-content:center;align-items:center;margin-top:10px;margin-bottom:10px">
          <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="24">
            <span class="demo-input-label">模板類型:</span>
          </el-col>
          <el-col :xl="16" :lg="16" :md="16" :sm="16" :xs="24">
            <el-input
              placeholder=""
              v-model="inputModelType">
            </el-input>
          </el-col>
        </el-row>
        <el-row style="display:flex;justify-content:center;align-items:center;margin-top:10px;margin-bottom:10px">
          <el-col :xl="8" :lg="8" :md="8" :sm="8" :xs="24">
            <span class="demo-input-label">寫入模式:</span>
          </el-col>
          <el-col :xl="16" :lg="16" :md="16" :sm="16" :xs="24">
            <el-input
              placeholder=""
              v-model="inputModelMode">
            </el-input>
          </el-col>
        </el-row>
        <div style="text-align:center">
          <el-button type="primary" style="width:40%;margin-top:10px;">頁面設置</el-button>
        </div>
      </div>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'RightpanelSettings',
  components: {
  },
  data() {
    return {
      inputModelName: '入院記錄-腦血管病',
      inputModelType: '入院記錄',
      inputModelMode: ''
    }
  }
}
</script>

