<template>
    <div class="building-components__row | p-body">
            <div>
                <img src="../../public/assets/dummy-component.png" alt="">
                <p>{{ element.attributes.Name }}</p>
            </div>
            <!-- <p class="border-2 border-solid rounded-full border-current">A+</p> -->
            <p>A+</p>
            <p>{{ element.attributes.CradleToSite }}</p>
            <p>{{ element.attributes.CradleToLife }}</p>
            <p>{{ element.attributes.CradleToCradle }}</p>
    </div>
</template>

<script>
export default {
    props: {
        element: Object,
    }
}
</script>