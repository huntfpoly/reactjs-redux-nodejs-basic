import { axiosClient } from './axiosClient';
import { getToken, getUserInfo } from '../utils/localstorage';

const UserApi = {
  register(data) {
    const url = `/register`;
    return axiosClient.post(url, data);
  },
  login(data) {
    const url = `/login`;
    return axiosClient.post(url, data);
  },
  getUser() {
    const url = `/api/user/token`;
    const token = getToken();
    // console.log(token)
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return axiosClient.get(url);
  },
  getAll() {
    const url = `user`;
    const { token } = getToken();
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return axiosClient.get(url);
  },
  update(id, data) {
    const url = `/api/user/update/${id}`;
    const token = getToken();
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return axiosClient.patch(url, data);
  }
};
export default UserApi;
