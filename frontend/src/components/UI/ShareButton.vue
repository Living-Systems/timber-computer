<template>
    <button
        :class="buttonStyle + ' btn btn--xl share | w-full lg:w-1/2'"
        @click="shareResult()"
    >
        <span class="whitespace-pre-line text-center">
            Share Result
        </span>
    </button>
</template>

<script setup>
import { storedSelection } from '../../../store/constructions';

const props = defineProps(['buttonStyle','url']);

const selection = storedSelection.get();
let elementIds = [];
for (const construction of selection) {
    for (const component of construction.attributes.components.data){
        elementIds.push(component.attributes.element.data.id);
    }
};
const queryString = '?ids=' + encodeURIComponent(elementIds);

const shareResult = () => {
    if (navigator.share) {
        navigator.share({
            title: 'WebShare API Demo',
            url: props.url + queryString
        }).then(() => {
            console.log('Share Dialog');
        })
        .catch(console.error);
    } else {
        // fallback
        // TODO: Adjust email text
        window.location.href = "mailto:?subject=Your%20Timber%20Computer%20Results&body=Hallo%20,%0A" + props.url + queryString;
    }
}

</script>
