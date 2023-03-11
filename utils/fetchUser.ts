export default async function fetchUser () {
    if (process.client) {
        const accessToken = useCookie('accessToken');
        if (accessToken.value) {
            const data = await $fetch('/api/v1/auth', {method: 'GET'}) // gets current user
            const userState = useState('user')
            userState.value = data;
            return Promise.resolve(data)
        }
    }
}