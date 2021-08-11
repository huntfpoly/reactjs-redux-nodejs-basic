import { axiosClient } from './axiosClient';
import { getUserInfo } from '../utils/localstorage';

const { token } = getUserInfo();
const ProductApi = {
  getAll(props) {
    const price_lte = props.price_lte ? props.price_lte : '';
    const price_gte = props.price_gte ? props.price_gte : '';
    const url = `/api/product?_sort=updated_at&_order=desc&price_lte=${price_lte}&price_gte=${price_gte}`;
    return axiosClient.get(url);
  },
  getOne(id) {
    const url = `/api/product/${id}`;
    return axiosClient.get(url);
  },
  getByCategoryId(id) {
    const url = `/api/product/category/${id}`;
    return axiosClient.get(url);
  },
  add(product) {
    const url = `/api/product`;
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return axiosClient.post(url, product);
  },
  edit(slug, product) {
    // const { token } = getUserInfo();
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    const url = `/api/product/${slug}`;
    return axiosClient.patch(url, product);
  },
  remove(id) {
    const { token } = getUserInfo();
    axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    const url = `/product/${id}`;
    return axiosClient.delete(url);
  },
  search(name) {
    const url = `/product?name_like=${name}`;
    return axiosClient.get(url);
  },

  softDelete(arrayId) {
    const url = `/api/product/`;
    // const { token } = getUserInfo();
    // axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axiosClient.patch(url, arrayId);
  }
};
export default ProductApi;
