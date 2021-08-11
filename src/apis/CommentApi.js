import { axiosClient } from "./axiosClient";
import { getUserInfo } from "../utils/localstorage";

const CommentApi = {
	getAll() {
		const url = `/comments?_sort=created_at&_order=desc`;
		return axiosClient.get(url);
	},
	get(id) {
		const url = `/comments/${id}`;
		return axiosClient.get(url);
	},
	add(comments){
		const url = `/660/comments`;
		const { token } = getUserInfo();
		axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
		return axiosClient.post(url,comments)
	},
	edit(id, comments){
		const url = `/660/comments/${id}`;
		const { token } = getUserInfo();
		axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
		return axiosClient.put(url, comments)
	},
	remove(id){
		const url = `/660/comments/${id}`;
		const { token } = getUserInfo();
		axiosClient.defaults.headers.common.Authorization = `Bearer ${token}`;
		return axiosClient.delete(url)
	}
};
export default CommentApi;
