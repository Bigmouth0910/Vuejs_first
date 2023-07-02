<template>
  <div style="display:flex">
    <div class="el-col-class">
      <div style="display:flex">
        <div  style="padding-right:15px">
          <div class="el-row toolbar-item-row-big" >
            <img src="../../../icons/icons/insert_charutupian.png" class="toolbar-item-img-big"/>
          </div>
          <div class="el-row toolbar-item-row-big" >
            <span class="toolbar-item"> 插入圖片 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row-big" >
            <img src="../../../icons/icons/insert_charushijian.png" class="toolbar-item-img-big"/>
          </div>
          <div class="el-row toolbar-item-row-big">
            <span class="toolbar-item"> 插入時間 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row-big" >
            <img src="../../../icons/icons/insert_charuriqi.png" class="toolbar-item-img-big"/>
          </div>
          <div class="el-row toolbar-item-row-big">
            <span class="toolbar-item"> 插入日期 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row-big" >
            <img src="../../../icons/icons/insert_charufengefu.png" class="toolbar-item-img-big"/>
          </div>
          <div class="el-row toolbar-item-row-big">
            <span class="toolbar-item"> 插入分隔符 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/insert_chaolianjie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 超鏈接 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/insert_quxiaochaolianjie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 取消超鏈接 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/insert_charuteshuzifu.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 插入特殊字符 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/insert_charunianlingshuruyu.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 插入年齡輸入域 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/insert_charuxingbieshuruyu.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 插入性別輸入域 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/insert_charuriqishuruyu.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 插入日期輸入域 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/insert_charuanniu.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 插入按鈕 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/insert_charufuxuankuang.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 插入複選框 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/insert_charudanxuankuang.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 插入單選框 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row">
            <span class="toolbar-item"> 插入批註 </span>
          </div>
        </div>
      </div>
      <div class="bottom_title" style="margin-top:25px">
        <span > 功能插入</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex;">
        <div style="padding-left:15px;padding-right:15px;text-align:center">
          <div>
            <el-select v-model="value1" placeholder="選擇插入的醫學表達式">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
          <div>
            <el-select v-model="value2" placeholder="選擇插入的圖標">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="bottom_title" style="margin-top:25px;">插入醫學表達式</div>
    </div>
  </div>
</template>

<script>
export default {
  name: '插入',
  data() {
    return {
      options1: [{
        value: 'item1-1',
        label: '表達式1'
      }, {
        value: 'item1-2',
        label: '表達式2'
      }],
      options2: [{
        value: 'item2-1',
        label: '圖標1'
      }, {
        value: 'item2-2',
        label: '圖標2'
      }],
      value1: '',
      value2: ''
    }
  }
}
</script>

<style scoped>
  .el-col-class {
    border-right: solid 1px #E4E7ED;
  }

  .toolbar-item-img-big {
    width:48px;
    height:48px;
    margin-right:5px;
    margin-bottom:2px;
  }

  .toolbar-item-row-big {
    cursor:pointer;
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .toolbar-item-row {
    cursor:pointer;
    display:flex;
    justify-content:left;
    align-items:center;
  }

  .toolbar-item-img {
    width:16px;
    height:16px;
    margin-right:5px;
    margin-bottom:2px;
  }

  .toolbar-item {
    color:#444444;
    font-size:14px;
    cursor: pointer;
    line-height: 25px;
  }

  .bottom_title{
    color:#2D64B3;
    text-align: center;
    margin-top:10px;
  }

</style>
