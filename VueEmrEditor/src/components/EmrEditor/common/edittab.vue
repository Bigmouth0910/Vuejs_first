<template>
  <div style="display:flex">
    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_juzuo.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 居左 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_juyou.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 居右 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_juzhong.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 居中 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_tupianjuzuo.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 圖片居左 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_tupianjuyou.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 圖片居右 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_tupianjuzhong.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 圖片居中 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_duanqianju.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 段前距 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_duanhouju.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 段後距 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_xingjianju.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 行間距 </span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row  toolbar-item-row">
            <img src="../../../icons/icons/edit_youxuliebiao.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 有序列表 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_wuxuliebiao.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 無序列表 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_shouxingsuojin.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 自行縮進 </span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span > 段落</span>
      </div>
    </div>

    <div class="el-col-class">
      <div style="display:flex">
        <div style="padding-left:15px;padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/edit_shangbiao.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 上標 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_xiabiao.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 下標 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_jiacu.png" class="toolbar-item-img"/>
            <span class="toolbar-item">加粗</span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row  toolbar-item-row" >
            <img src="../../../icons/icons/edit_daxie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 大寫 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_xiaoxie.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 小寫 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_xieti.png" class="toolbar-item-img"/>
            <span class="toolbar-item">斜體</span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/edit_shanchuxian.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 刪除線 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_xiahuaxian.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 下劃線 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_zifubiankuang.png" class="toolbar-item-img"/>
            <span class="toolbar-item">字符邊框</span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/edit_beijingse.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 背景色 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_zitiyanse.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 字體顏色 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_zitidaxiao.png" class="toolbar-item-img"/>
            <span class="toolbar-item">字體大小</span>
          </div>
        </div>
        <div style="padding-right:15px">
          <div class="el-row toolbar-item-row" >
            <img src="../../../icons/icons/edit_ziti.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 字體 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_qingchuzihao.png" class="toolbar-item-img"/>
            <span class="toolbar-item"> 清除字號 </span>
          </div>
          <div class="el-row toolbar-item-row">
            <img src="../../../icons/icons/edit_qingchuziti.png" class="toolbar-item-img"/>
            <span class="toolbar-item">清除字體</span>
          </div>
        </div>
      </div>
      <div class="bottom_title">
        <span > 字體</span>
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

  .toolbar-item-img {
    width:16px;
    height:16px;
    margin-right:5px;
    margin-bottom:2px;
  }

  .toolbar-item-row {
    cursor:pointer;
    display:flex;
    justify-content:left;
    align-items:center;
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
