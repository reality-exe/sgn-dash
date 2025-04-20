export default defineNuxtRouteMiddleware(async (to, from) => {
    if (to.fullPath.startsWith("/admin")) {
        const nuxt = useNuxtApp()
        const model = nuxt.$pb.authStore.model
        const test = [];
        if (model) {
            const account = await nuxt.$pb.collection('users').getOne(model.id)
            if (account.tags.includes('admin')) {
                return
            } else {
                return navigateTo('/')
            }
        } else {
            return navigateTo('/')
        }
    }
})
