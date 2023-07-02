<template>
  <div class="ueditor-oak" >
    <!-- style="height:auto;" -->
    <div class="ueditor-toobar-oak" :hidden="false">
      <Tab
        :tabs="['編輯', '插入', '頁面佈局', '病歷控件', '视图审阅']"
        :fixed="fix">
        <div class="tab-content" slot-scope="props">
          <div class="tab-content-item" v-bind:class="{'tab-content-item-active':props.index===0}">
            <div class="edui-default">
              <div class="edui-toolbar" v-html="editHtml" />
            </div>
          </div>

          <div class="tab-content-item" v-bind:class="{'tab-content-item-active':props.index===1}">
            <div class="edui-default">
              <div class="edui-toolbar" v-html="insertHtml"/>
            </div>
          </div>
          <div class="tab-content-item" v-bind:class="{'tab-content-item-active':props.index===2}">
            <div class="edui-default">
              <div class="edui-toolbar" style="display:flex">
                <div class="edui-box edui-button edui-for-orient">
                  <div :class="{'edui-state-hover':type===false}" @click="layout(false)">
                    <div class="edui-button-wrap">
                      <div
                        unselectable="on"
                        title="橫向"
                        class="edui-button-body">
                        <div class="edui-box edui-icon"/>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="edui-box edui-button edui-for-portrait">
                  <div
                    :class="{'edui-state-hover':type===true}"
                    @click="layout(true)">
                    <div class="edui-button-wrap">
                      <div
                        unselectable="on"
                        title="縱向"
                        class="edui-button-body">
                        <div class="edui-box edui-icon"/>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edui-box edui-button edui-for-papersize" style="margin-left:5px">
                  <div>
                    <div className="edui-button-wrap">
                      <div title="纸张大小">
                        纸张大小:
                        <select
                          id="psize"
                          placeholder="请选择纸张大小"
                          className="edui-box"
                          v-model="selectedSize"
                          @change="onChangeSize($event)"
                        >
                          <option  v-for="(item, i) in sizes" :key="i" :value="item.value">{{item.value}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="edui-box edui-button edui-for-papercolor" style="margin-left:5px">
                  <div>
                    <div className="edui-button-wrap">
                      <div title="背景颜色">
                        背景颜色:
                        <select
                          id="pcolor"
                          placeholder="请选择背景颜色"
                          className="edui-box"
                          v-model="selectedColor"
                          @change="onChangeColor($event)"
                        >
                          <option v-for="(item, i) in colors" :key="i" :value="item">{{item}}</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="tab-content-item" v-bind:class="{'tab-content-item-active':props.index===3}">
            <div class="edui-default">
              <div class="edui-toolbar" v-html="emreHtml"/>
            </div>
          </div>

          <div class="tab-content-item" v-bind:class="{'tab-content-item-active':props.index===4}">
            <div class="edui-default">
              <div class="edui-toolbar">
                <div
v-for="(v, i) in types"
:key="i"
class="edui-button-oak"
                    :class="{'active':index==i}"
:title="{v}"
@click="itemClick(i)">
                  {{v}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Tab>

      <div class="fixed-toobar" :hidden="false">
        <div class="edui-default">
          <div class="edui-toolbar" v-html="fixedHtml"/>
        </div>
      </div>
    </div>

    <div 
      class="ueditor-content-oak" 
      :style="{backgroundColor: selectedColor}">
      <div class="ueditor-content" :style="style">
        <script
          className="ueditor-script-oak"
          :id="id"
          style="width: 100%"
          name="content"
          type="text/plain"
        />
      </div>
    </div>
    <VestigeReservation :marks="actualChange" :isShow="true"/>
  </div>
</template>

<script>
import { validURL } from '@/utils/validate'
import Tab from './common/tab.vue'
import innerHtml from './innerHtml.js'
import VestigeReservation from './vestigeReservation.vue'

export default {
  components: {
    Tab,
    innerHtml,
    VestigeReservation
  },
  watch: {
    styletype(val) {
      this.type = val
      this.layout(val)
      console.log("styletype", val)      
    }
  },
  data() {

    return {
      editor: undefined,
      types: ['設計模式', '編輯模式', '只讀模式', '審閱模式', '留痕模式'],
      type: true,
      index: 0,
      actualChange: [],
      editHtml: undefined,
      fixedHtml: undefined,
      insertHtml: undefined,
      emreHtml: undefined,
      layoutHtml: undefined,
      fix: "<li class='tab-list-item theme'>SMHC-EDITOR</li>",
      style: {
        height: 'auto',
        width: '700px'
      },
        selectedSize: 'A4',
      sizes: [
        { value: "A3", width: "297", height: "420" },
        { value: "A4", width: "210", height: "297" },
        { value: "A5", width: "148", height: "210" },
        { value: "B4", width: "250", height: "353" },
        { value: "B5", width: "176", height: "250" },
      ],
      selectedColor:"#d4d4d4",
      colors: [
        "#ffffff",
        "#e9e9e9",
        "#d3d3d3",
        "#d4d4d4",
        "#bdbebd",
        "#a9a9a9",
        "#949494",
        "#989898",
        "#909090",
        "#888888",
        "#787878",
        "#707070",
        "#6a6a6a",
        "#686868",
      ]
    }
  },
  props: {
    id: {
      type: String,
      default: 'container'
    },
    mod: {
      type: String,
      default: 'design'
    },
    content: {
      type: String,
      default: ''
    },
    styletype: {
      type: Boolean,
      default: true
    }
  },
  activated: function() {
    console.log("activiated")
  },
  deactivated: function() {
    console.log("deactiviated")
  },
  updated: function() {
    console.log('updated1 = ', this.id)
    if(this.editor === undefined) return
    
    if(this.editHtml === undefined)
    {
      setTimeout(() => {
        console.log('editor = ', this.id)
        var html = command(this.editor)
        
        this.editHtml = html.editHtml
        this.fixedHtml = html.fixedHtml
        this.insertHtml = html.insertHtml
        this.emreHtml = html.emreHtml
        this.layoutHtml = html.layoutHtml    
      }, 200)
    }
    
    console.log('updated2 = ', this.id)
    const that = this
    var editor = this.editor
    editor.ready(function() {
      console.log('ready', editor)
      that.editor = editor
      if (that.content === undefined) { editor.setContent('') } else { editor.setContent(that.content) }

      console.log(that.mod)
      switch (that.mod) {
        case 'design':
          that.designPattern()
          that.index = 0
          break
        case 'edit':
          that.editPattern()
          that.index = 1
          break
        case 'readonly':
          that.readonlyPattern()
          that.index = 2
          break
        case 'review':
          that.reviewPattern()
          that.index = 3
          break
        case 'trace':
          that.tracePattern()
          that.index = 4
          break
      }      
    })
  },
  mounted: function() {
    console.log('id = ', this.id)
    var editor = undefined

    try{
      editor = UE.getEditor(this.id, {
        initialFrameWidth: '100%',
        autoHeightEnabled: true
      })
    }catch(e){
      console.log("getEditor", e)
    }
    // console.log("ueditor", editor)


    const that = this
    const before = window.top.changes
    editor.addListener('focus', function(editor) {
      const beforeChanges = before
      const changes = window.top.changes || []
      if (beforeChanges !== changes) {
        that.showChange(changes)
      }
    })
    console.log('addListener = ', this.id)    
    this.editor = editor
  },

  methods: {
    // getHtml(editor) {
    //   var html = undefined
    //   try{
    //     html = command(this.editor)  
    //     this.editHtml = html.editHtml
    //     this.fixedHtml = html.fixedHtml
    //     this.insertHtml = html.insertHtml
    //     this.emreHtml = html.emreHtml
    //     this.layoutHtml = html.layoutHtml    
    //   }catch(e) {
    //     console.log("command(editor)", e)
    //     this.getHtml()
    //   }
    // },
    showChange: function(changes) {
      for (let i = 0; changes.length; i++) {
        if (changes[i]) {
          this.actualChange.push(changes[i])
        }
      }
    },

    // insetTable: function(e) {
    //   const editor = this.editor
    //   const tablePicker = new baidu.editor.ui.TablePicker({
    //     onpicktable: function(t, numCols, numRows) {
    //       editor.execCommand('inserttable', {
    //         numRows: numRows,
    //         numCols: numCols,
    //         border: 1
    //       })
    //     }
    //   })

    //   const tablePop = new baidu.editor.ui.Popup({
    //     content: tablePicker
    //   })
    //   tablePop.showAnchor(e.target)
    // },

    itemClick: function(index) {
      this.index = index
      console.log('alternext', index)
      const type = this.types[index]
      console.log(type)
      switch (type) {
        case '設計模式':
          this.designPattern()
          break
        case '編輯模式':
          this.editPattern()
          break
        case '只讀模式':
          this.readonlyPattern()
          break
        case '審閱模式':
          this.reviewPattern()
          break
        case '留痕模式':
          this.tracePattern()
          break
      }
    },

    designPattern: function() {
      this.editor.body.setAttribute('pattern', 'design')
      this.editor.setEnabled()
    },

    editPattern: function() {
      this.editor.body.setAttribute('pattern', 'edit')
      this.editor.setEnabled()
    },

    readonlyPattern: function() {
      this.editor.body.setAttribute('pattern', 'readonly')
      this.editor.setDisabled()
    },

    reviewPattern: function() {
      this.editor.body.setAttribute('pattern', 'review')
      this.editor.setEnabled()
    },

    tracePattern: function() {
      this.editor.body.setAttribute('pattern', 'trace')
      this.editor.setEnabled()
    },

    layout: function(type) {
      // this.style.width = type ? '700px' : '1000px'      
      this.type = type
      this.changeSize(this.selectedSize)
      this.$emit("setData", type)

      if(this.editor != undefined && this.editor.windows != undefined) {
        const editor = this.editor
        const head = editor.windows.document.getElementsByTagName('head')[0]
        const cssStyle = document.createElement('style')
        cssStyle.id = 'layout'
        cssStyle.innerText = '@page { size: landscape; }'
        if (!type) {
          head.appendChild(cssStyle)
        } else {
          const cssStyle = document.getElementById('layout')
          head.removeChild(cssStyle)
        }
      }
    },
    changeSize(size) {
       var index = this.sizes.findIndex((x) => x.value === size);
      var view = document.querySelector(".ueditor-content");
      var ifram = null;
      if(document.getElementById("ueditor_0"))
        ifram = document.getElementById("ueditor_0").contentWindow;
      else if(document.getElementById("ueditor_1"))
        ifram = document.getElementById("ueditor_1").contentWindow;

      var views = ifram.document.querySelectorAll(".view");
      if (index != "-1") {
        var width = this.sizes[index].width
        var height = this.sizes[index].height
        if(this.type) {
          view.style.width = parseInt(width) + 5 + "mm";
          views[1].style.width = width + "mm";
          view.style.height = "auto";
          views[1].style.height = "auto";
        } else {
          view.style.width = parseInt(height) + 5 + "mm";
          views[1].style.width = height + "mm";
          view.style.height = "auto";
          views[1].style.height = "auto";
        }
      }
    },
    onChangeSize: function(e) {
      console.log(e.target.value);
      this.changeSize(e.target.value)
    },
    onChangeColor: function(e) {

    }
  }
}

</script>

<style lang="scss" scoped>

</style>
