export default function({ $axios }) {
    $axios.onRequest(config => {
        console.log('Making request to ' + config.url)
    })

    // $axios.onError(error => {
    //     // console.log(error);
    //     const code = parseInt(error.response && error.response.status)
    //     if (code === 403 || code === 401) {
    //         redirect(
    //             `/shop/?guu_token=${$auth.$storage.getUniversal('guuToken')}`
    //         )
    //     }
    // })
}
