<template>
  <div>
    <div style="margin-bottom:10px">
      <b> 插入 圖片庫 </b>
    </div>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item v-for="data in pictureFolders" :key="data.PIC_FOLDER_KEY" :title="data.FOLDER_NAME"
        :name="data.FOLDER_NAME">
        <div class="demo-image__lazy">
          <img v-for="picture in filterPictures(data)" :key="picture.FILE_PATH" :src="filePath(picture.FILE_PATH)"
            class="picture-item" @click="addImageToEditor(picture.FILE_PATH)" />
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { pictureFolderInfo } from '@/api/picture_folder'
import { pictureInfo } from '@/api/picture'

export default {
  name: 'RightPanelPictures',
  components: {
  },
  data() {
    return {
      editor: undefined,
      editorId: 'caseform',
      list: [],
      listLoading: true,
      listQuery: {
        FOLDER_ID: undefined
      },
      pictureTreeData: [],
      pictureFolders: [],
      activeNames: [],
      urls: []
    }
  },
  created() {
    this.getPictureTree()
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      pictureFolderInfo({})
        .then(response => {
          this.pictureTreeData = response.data.result.rows
          pictureInfo(this.listQuery)
            .then(response => {
              this.list = response.data.result.rows
              this.total = response.data.result.count
              this.getPictureFolderList(this.pictureTreeData)
              this.listLoading = false
            })
            .catch(() => {
              this.listLoading = false
            })
        })
    },
    getPictureTree() {

    },
    getPictureFolderList(tlist) {
      tlist.forEach(cur => {
        var tempList = this.list.filter(x => x.FOLDER_ID === cur.ID)
        console.log("cur", cur)
        console.log("tempList", tempList)
        if (tempList.length > 0) {
          this.pictureFolders.push(cur)
        }
        this.getPictureFolderList(cur.children)
      })
    },
    filterPictures(data) {
      return this.list.filter(x => x.FOLDER_ID === data.ID)
    },
    filePath(path) {
      if (path.indexOf('blob') !== -1) return path
      else return process.env.VUE_APP_BASE_API + '/uploads/' + path
    },
    handleChange(val) {
      console.log(val)
    },
    addImageToEditor(filePath) {
      var imgPath = this.filePath(filePath)
      var html = '<span class="oak-field oak-left" style="width:auto" contenteditable="false">[</span><img src="' + imgPath + '" width="120px" height="120px" /><span class="oak-field oak-right" style="width:auto" contenteditable="false">]</span>'
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

<style scoped>
.picture-item {
  cursor: pointer;
  width: 120px;
  height: 120px;
  padding: 10px
}
</style>
