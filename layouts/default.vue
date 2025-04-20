<script setup>
useHead({
    title: "Stargate Network | Gate List"
})
const particleOptions = {
    fullScreen: {
        enable: true,
        zIndex: -1
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

<template>
  <NuxtParticles id="tsparticles" :options="particleOptions" />
  <div>
    <slot />
  </div>
</template>
