import axios from "axios";

const searchCategoriesAndTasks = async (arg) => {
	try {
		const res = await axios.get(`/search/${arg}`);
		return res.data;
	} catch (err) {
		return { ok: false, err };
	}
};


export default {searchCategoriesAndTasks}