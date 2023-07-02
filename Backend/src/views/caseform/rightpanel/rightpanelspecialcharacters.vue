<template>
  <div>
    <div style="margin-bottom:10px">
      <b > 插入 特殊字符 </b>
    </div>

    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item title="特殊字符" name="1">
        <div style="word-wrap: break-word;margin-left:10px;">
          <span  v-for="ch in this.specialCharacters" :key="ch"  class="span-text"  @click="addToEditor(ch)"><nobr>{{ch}}&nbsp;</nobr></span>
        </div>
      </el-collapse-item>
      <el-collapse-item title="羅馬字符" name="2">
      </el-collapse-item>
      <el-collapse-item title="數學字符" name="3">
      </el-collapse-item>
      <el-collapse-item title="醫學字符" name="4">
      </el-collapse-item>
      <el-collapse-item title="其他字符" name="5">
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>

export default {
  name: 'RightpanelPictures',
  components: {
  },
  data() {
    return {
      editor: undefined,
      editorId: 'caseform',
      activeNames: ['1'],
      specialCharacters: ['Co.', 'a.m.', 'p.m.', 'No', 'RP', 'QD', 'BID', 'TID', 'QID', 'QH', 'Q2H', 'g/l', 'mg/l', 'mmHg', 'cmH2O', 'PaCO2', 'PaO2', 'SIMV']
    }
  },
  methods: {
    handleChange(val) {
      // console.log(val);
    },
    addToEditor(ch) {
      var html = '<span class="oak-field" style="width:auto" contenteditable="false">' + '<span>' + ch + '</span>' + '<span class="oak-field" style="width:auto" contenteditable="false"></span>'

      if (this.editor === undefined || this.editor === null) {
        this.editor = UE.getEditor(this.editorId)
      }
      if (this.editor !== null) {
        this.editor.execCommand('inserthtml', html)
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  .span-text {
    font-weight: 100;
    font-size: 20px;
    color: #333333;
    font-family: 'Dosis', sans-serif;
    margin-right: 10px;
    cursor: pointer;
  }
</style>
