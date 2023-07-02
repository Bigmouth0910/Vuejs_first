<template>
  <div style="display:flex">
    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row-big" >
            <img src="../../../icons/icons/form_charubiaoge.png" class="toolbar-item-img-big"/>
          </div>
          <div class="el-row toolbar-item-row-big" >
            <span class="toolbar-item"> 插入表格 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row-big" >
            <img src="../../../icons/icons/form_shanchubiaoge.png" class="toolbar-item-img-big"/>
          </div>
          <div class="el-row toolbar-item-row-big">
            <span class="toolbar-item"> 刪除表格 </span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span > 表格</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/form_biaogeqiancharuxing.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 表格前插入行 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/form_zaishangmiancharuxing.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 在上面插入行 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/form_zaixiamiancharuxing.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 在下面插入行 </span>
          </div>
        </div>
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/form_zaizuomiancharulie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 在左面插入列 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/form_zaiyoumiancharulie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 在右面插入列 </span>
          </div>
          <div class="el-row">
            <span style="line-height:25px"> &nbsp;</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span > 插入</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/form_shanchuxing.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 刪除行 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/form_shanchulie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 刪除列 </span>
          </div>
          <div class="el-row">
            <span style="line-height:25px"> &nbsp;</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span >刪除</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/form_chaifenchengxing.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 拆分成行 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/form_chaifenchenglie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 拆分成列 </span>
          </div>
          <div class="el-row">
            <span style="line-height:25px"> &nbsp;</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span >拆分</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/form_youhebingdanyuange.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 右合併單元格 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/form_xiahebingdanyuange.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 下合併單元格 </span>
          </div>
          <div class="el-row">
            <span style="line-height:25px"> &nbsp;</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span >合併</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: '編輯',
  data() {
    return {
      options: [{
        value: 'Item1',
        label: '文檔效驗1'
      }, {
        value: 'Item2',
        label: '文檔效驗2'
      }],
      value: ''
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
