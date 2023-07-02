<template>
    <div class="emra-oak">
      <!-- style="overflow: auto;height:1000px;" -->
        <Ueditor :id="id" :mod="mod" :content="content" :styletype="styletype"/>
    </div>
</template>

<script>
import Ueditor from './ueditor.vue'

export default {
  beforeMount() {
  },
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
    styletype: {
      type: Boolean,
      default: true
    }
  },
  methods: {
  }
}
</script>
