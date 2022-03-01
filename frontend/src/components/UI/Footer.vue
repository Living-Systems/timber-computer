<template>
    <footer :class="footerClass"
        class="mx-body mt-400">
        <section v-if="!simpleFooter"
            class="md:flex justify-between pb-1000 border-t">
            <dl class="mt-600 md:w-1/4">
                <dt>Team</dt>
                <dd class="mt-400">Martin Bittmann</dd>
                <dd>Leonard Schrage</dd>
                <dd>Daniel Dieren</dd>
                <dd>Julia Dorn</dd>
            </dl>

            <dl class="mt-600 md:w-1/2">
                <dt>Timber Computer is funded by</dt>
                <dd class="mt-400">
                    <span class="sr-only">Federal Ministry of Education and Research</span>
                    <img src="../../../public/assets/logo-ministry-en.svg"
                         alt="" />
                </dd>
            </dl>

            <div class="mt-600 md:w-1/4">
                <p>
                    With Neo-Metabolism<br>
                    Carsten Goertz<br>
                    Ghikhan Blossfeld-Lau
                </p>

                <p class="mt-400">
                    And <a href="https://humans-machines.com">Humans & Machines</a><br>
                    Crew
                </p>
            </div>
        </section>

        <section class="md:flex flex-row-reverse justify-between border-t">
            <nav class="my-400 cluster cluster--x-200">
                <!-- TODO: Add pages here -->
                <a href="mailto:mail@timber.computer">Contact</a>
                <a v-for="page in pages" :href="'/learn/' + page.attributes.slug" :key="page">{{ page.attributes.title }}</a>
            </nav>
            <div class="my-400">
                ©{{ year }}
            </div>
        </section>

    </footer>
</template>

<script setup>
const props = defineProps(['footerClass', 'simpleFooter']);

const year = new Date().getFullYear();

import { getAllLegalsWithSlugs } from '../../lib/api';
const getLegals = await getAllLegalsWithSlugs();
const pages    = getLegals.data;
</script>