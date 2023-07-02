<template>
    <div class="vestige-reservation">
        <ul class="vestige-list">
            <li v-for="(v, i) in marks" :key="i" class="list">
                <p>{{v.author}} {{v.date}}</p>
                <p>{{v.type}}</p>
                <p>{{v.desc}}</p>
            </li>
        </ul>
    </div>
</template>
<script>
export default {

  props: ['marks']

}

</script>
