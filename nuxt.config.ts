// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        public: {

        },
        secret: {
            jwtSecret: process.env.JWT_SECRET
        }
    },
    css: [
        'primevue/resources/themes/soho-dark/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        '/assets/style.css',
        // '/assets/theme2.css',
    ],
    build: {
        transpile: ['primevue']
    }
})
