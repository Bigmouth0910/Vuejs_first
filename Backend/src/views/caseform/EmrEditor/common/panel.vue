<template>
    <div class="panel" :class="className">
        <h2 class="panel-title">{{title}}</h2>
        <div class="panel-content">
            {{children}}
        </div>
    </div>
</template>
<script>
export default {
  props: ['className', 'title', 'children']
}
</script>
