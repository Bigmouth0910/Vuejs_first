<template>
  <div v-bind::class="className" class="tab" >
    <ul class="tab-list">
      <span v-html="fixed"/>
        <li
v-for="(item, i) in tabs"
:key="i"
class="tab-list-item"
            v-bind:class="{'tab-list-item-active': index === i}"
            @click="click(i)">{{item}}</li>
    </ul>
    <slot :index="index" ></slot>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: 0
    }
  },
  props: ['className', 'tabs', 'fixed'],
  methods: {
    click: function(i) {
      this.index = i
    }
  }
}
</script>
