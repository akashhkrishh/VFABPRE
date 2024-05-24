import axios from 'axios';



axios.defaults.baseURL = "http://localhost:8302"

axios.interceptors.request.use((config) => {
    config.headers.setAuthorization(localStorage.getItem('token'))
    return config;

})


axios.interceptors.response.use((res) => {
    if (res.status == 401) {
        alert("Invalid")
    }

    return res;
})

export {
    axios as apiHelper
};
