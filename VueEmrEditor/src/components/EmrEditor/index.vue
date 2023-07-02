<template>
    <div class="emra-oak" >
      <!-- style="overflow: auto;height:1000px;" -->
        <Ueditor :id="id" :mod="mod" :content="content" :styleType="styleType" :transMst="transMst" :showToolbar="showToolbar"/>
    </div>
</template>

<script>
import Ueditor from './ueditor'
export default {
  components: {
    Ueditor
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
    styleType: {
      type:Boolean,
      default: true
    },
    transMst: {
      type:Object,
      default: {}
    },
    showToolbar: {
      type:Boolean,
      default: true
    }
  }
}
</script>
