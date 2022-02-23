<template>
    <nav class="cluster | pt-300">
        <a :href="hrefL" class="btn btn--xl w-1/2">
            <span>{{ buttonL }}</span>
        </a>
        <a v-if="hrefR && buttonR" :href="hrefR" class="btn btn--xl  w-1/2">
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

