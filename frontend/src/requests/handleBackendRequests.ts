import axios from "axios";

const getData = async () => {
    const req = await axios.get('http://localhost:3000/')
    return req.data.message
}

export default { getData }