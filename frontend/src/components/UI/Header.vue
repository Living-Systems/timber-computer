<template>
    <nav :class="headerClass"
        class="mx-body min-h-header flex justify-between items-center">
        <a href="/">Timber Computer</a>
        <a :href="linkTo">{{ linkName }} →</a>
    </nav>
</template>

<script setup>

const props = defineProps(['linkTo', 'linkName', 'headerClass']);

</script>