import axios from "axios";

const editCategory = async (url, nameCategory) => {
    try {
        const res = await axios.put(`/categories/${url}`, {name: nameCategory} )
        return res.data;
    } catch (err) {
        return {ok: false, eror: err}
    }
}


export default {editCategory}