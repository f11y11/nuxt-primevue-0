export default defineNuxtRouteMiddleware(async (to, from) => {
    await fetchUser();
})