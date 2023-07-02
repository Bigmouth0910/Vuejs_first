<template>
  <div>
    <el-tabs :tab-position="tabPosition"  >
      <!-- style="overflow: auto;height:1000px;" -->
      <!-- <el-tab-pane >
        <span slot="label"><i class="el-icon-s-operation"></i></span>
        <RightPanelSettings/>
      </el-tab-pane> -->
      <el-tab-pane style="overflow:auto;">
        <span slot="label"><i class="el-icon-paperclip"></i></span>
        <RightPanelElement/>
      </el-tab-pane>
      <el-tab-pane >
        <span slot="label"><i class="el-icon-cold-drink"></i></span>
        <RightPanelDictionary/>
      </el-tab-pane>
      <!-- <el-tab-pane >
        <span slot="label"><i class="el-icon-document"></i></span>
        <RightPanelPatientConcept/>
      </el-tab-pane> -->
      <el-tab-pane >
        <span slot="label"><i class="el-icon-picture-outline"></i></span>
        <RightPanelPictures/>
      </el-tab-pane>
      <el-tab-pane >
        <span slot="label"><i class="el-icon-eleme"></i></span>
        <RightPanelSpecialCharacters/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
// import RightPanelSettings from './rightpanelsettings'
import RightPanelElement from './rightpanelelement'
import RightPanelDictionary from './rightpaneldictionary'
// import RightPanelPatientConcept from './rightpanelpatientconcept'
import RightPanelPictures from './rightpanelpictures'
import RightPanelSpecialCharacters from './rightpanelspecialcharacters'

export default {
  name: 'Rightpanel',
  components: {
    // RightPanelSettings,
    RightPanelElement,
    RightPanelDictionary,
    // RightPanelPatientConcept,
    RightPanelPictures,
    RightPanelSpecialCharacters
  },
  data() {
    return {
      tabPosition: 'left'
    }
  }
}
</script>
