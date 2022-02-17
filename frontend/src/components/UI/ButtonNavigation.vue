<template>
    <nav class="cluster cluster--stretched pt-300">
        <a :href="hrefL" class="btn btn--xl">
            <span>{{ buttonL }}</span>
        </a>
        <a :href="hrefR" class="btn btn--xl">
            <span>{{ buttonR }}</span>
        </a>
    </nav>
</template>

<script>
import { computed } from 'vue';

export default {
    props: [
        'button-l',
        'button-r',
        'href-l',
        'href-r'
    ],
    setup(props){
        const buttonL = computed(()=>{
            return props['button-l']
        });

        const buttonR = computed(()=>{
            return props['button-r']
        });

        const hrefL = computed(()=>{
            return props['href-l']
        });

        const hrefR = computed(()=>{
            return props['href-r']
        });
    }
}
</script>

