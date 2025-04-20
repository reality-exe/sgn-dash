<template>
    <div>
        <NuxtParticles id="tsparticles" :options="particleOptions" />
    </div>
</template>

<script lang="ts" setup>
const particleOptions = {
    fullScreen: {
        enable: true,
        zIndex: 0
    },
    particles: {
        color: {
            value: "#aa4fe3"
        },
        links: {
            color: "#6b4191",
            enable: true
        },
        move: {
            enable: true,
            speed: 0.25
        },
        number: {
            value: 120
        }
    }
};
</script>
