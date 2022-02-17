<template>
    <div class="building-components__comp-row | p-body is-chosen">
            <div>
                <img src="../../../public/assets/dummy-component.png" alt="">
                <p class="whitespace-nowrap">{{ element.attributes.name }}</p>
            </div>
            <!-- <p class="border-2 border-solid rounded-full border-current">A+</p> -->
            <p>A+</p>
            <p>{{ element.attributes.cradleToSite }}</p>
            <p>{{ element.attributes.cradleToLife }}</p>
            <p>{{ element.attributes.cradleToCradle }}</p>
    </div>
</template>

<script>
export default {
    props: {
        element: Object,
    }
}
</script>