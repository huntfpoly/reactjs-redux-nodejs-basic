import { axiosClient } from "./axiosClient";
import { getUserInfo } from "../utils/localstorage";

const CategoryApi = {
    getAll() {
        const url = `/api/category`;
        return axiosClient.get(url);
    },
    getOne(id) {
        const url = `/api/category/${id}`;
        return axiosClient.get(url);
    },
    add(category){
        const url = `/api/category`;
        // const { token } = getUserInfo();
        // axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.post(url,category)
    },
    edit(id, category){
        const url = `/api/category/${id}`;
        // const { token } = getUserInfo();
        // axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.put(url, category)
    },
    remove(id){
        const url = `/categories/${id}`;
        const { token } = getUserInfo();
        axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.delete(url)
    },
    softDelete(arrayId){
        const url = `/api/category/`;
        // const { token } = getUserInfo();
        // axiosClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        return axiosClient.patch(url,arrayId)
    }
};
export default CategoryApi;
