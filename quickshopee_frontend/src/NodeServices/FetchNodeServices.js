import axios from "axios"

const serverURL = "http://localhost:5000"

const postData = async (url, body) => {
    try {
        var response = await axios.post(`${serverURL}/${url}`, body)
        var result = response.data
        return result
    }
    catch (e) {
        return false
    }
}

const getData = async (url) => {
    try {
        var response = await axios.get(`${serverURL}/${url}`)
        var result = response.data
        return result
    }
    catch (e) {
        return false
    }
}
export { postData, getData, serverURL }
