export const useRouteParams = () => {
    const router = useRouter();
    return router.currentRoute.value.params
}