import axios from "axios";

const addTask = async (url, descriptionTask) => {
	try {
		const res = await axios.post(`/tasks/${url}`, {
			description: descriptionTask,
		});
		return res.data;
	} catch (err) {
		return { ok: false, err };
	}
};

const editTask = async (url, descriptionTask) => {
	try {
		const res = await axios.put(`/tasks/${url}`, {
			description: descriptionTask,
		});
		return res.data;
	} catch (err) {
		return { ok: false, err };
	}
};

const changeStateTask = async (url) => {
	try {
		const res = await axios.put(`/tasks/${url}/state`)
		return res.data
	}
	catch(err) { return {ok: false, err}}
}

const deleteTask = async (url) => {
	try {
		const res = await axios.delete(`/tasks/${url}`);
		return res.data;
	} catch (err) {
		return { ok: false, err };
	}
};

export default {addTask, editTask, deleteTask, changeStateTask};
