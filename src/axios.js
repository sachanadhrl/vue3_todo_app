import axios from "axios"

const axiosUser = axios.create({
  baseURL: `https://todo.api.devcode.gethired.id`
})

export default axiosUser