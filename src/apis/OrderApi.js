import { axiosClient } from './axiosClient';
import { getUserInfo } from '../utils/localstorage';
const OrderApi = {
  createOrder(order) {
    const url = '/api/order';
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.post(url, order);
  },
  getAll() {
    const url = `/api/order`;
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.get(url);
  },
  getByUserId(userId) {
    const url = `/api/order/user/${userId}`;
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.get(url);
  },
  getOne(id) {
    const url = `/users/${id}/orders`;
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.get(url);
  },
  getOrderDetail(id) {
    const url = `/orders/${id}`;
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.get(url);
  },
  update(id, data) {
    const url = `/orders/${id}`;
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.put(url, data);
  },
  remove(id) {
    const url = `/orders/${id}`;
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.delete(url);
  }
};
export default OrderApi;
