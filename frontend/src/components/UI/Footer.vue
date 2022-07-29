<template>
    <footer :class="footerClass"
        class="mx-body mt-800">
        <section v-if="!simpleFooter"
            class="md:flex justify-between pb-1000 border-t">
            <dl class="mt-600 md:w-1/4">
                <dt>Team</dt>
                <dd class="mt-400">Leonard Schrage</dd>
                <dd>Martin Bittmann</dd>
                <dd>Daniel Dieren</dd>
                <dd>Julia Dorn</dd>
            </dl>

            <dl class="mt-600 md:w-1/2">
                <dt>Timber Computer is funded by</dt>
                <dd class="mt-400">
                    <span class="sr-only">Federal Ministry of Education and Research</span>
                    <img src="/assets/logo-ministry-en.svg"
                         alt="" />
                </dd>
            </dl>

            <div class="mt-600 md:w-1/4">
                <p>
                    With <a href="https://n-m.world" target="_blank">Neo-Metabolism</a><br>
                    Carsten Goertz<br>
                    Ghikhan Blossfeld-Lau
                </p>

                <p class="mt-400">
                    And <a href="https://humans-machines.com" target="_blank">Humans & Machines</a>
                </p>
            </div>
        </section>

        <section class="flex flex-row-reverse justify-between border-t">
            <nav class="my-400 cluster cluster--x-200">
                <a href="mailto:mail@timber.computer">Contact</a>
                <a v-for="page in pages" :href="'/legal/' + page.attributes.slug" :key="page">
                    {{ page.attributes.title }}
                </a>
            </nav>
            <div class="my-400">
                <span class="copyleft">©</span>{{ year }}
            </div>
        </section>

    </footer>
</template>

<script setup>

import { getAllLegalsWithSlugs } from '../../lib/api';

const props = defineProps(['footerClass', 'simpleFooter']);

const getLegals = await getAllLegalsWithSlugs();
const pages = getLegals.data;

const year = new Date().getFullYear();

</script>