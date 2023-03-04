// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'primevue/resources/themes/tailwind-light/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '/static/style.css',
    ],
    build: {
        transpile: ['primevue']
    }
})
