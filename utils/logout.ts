export default async function logout () {
    useCookie('accessToken').value = null;
    useCookie('refreshToken').value = null;

    useState('user').value = null;
    /**
     * TODO: use after logout.post.ts is completed
     await useFetch('/api/v1/auth/logout', {method: 'POST', body: {

  }})
     */
    return Promise.resolve()
}