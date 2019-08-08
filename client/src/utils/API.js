import axios from 'axios';

export default {

    uploadPhoto: (data) => {
        return axios.post("/api/image", data)
    }

}