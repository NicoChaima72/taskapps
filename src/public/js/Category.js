import axios from "axios";

const editCategory = async () => {
	const form = document.getElementById("form-edit-category");
	const data = new FormData(form)

	const txtCategory = document.getElementById("txt-edit-category");
	const url = txtCategory.getAttribute("category-url");

	let name = data.get("name");
	name = name.replace("<script>", "");
	name = name.replace("</script>", "");
	
	const res = await axios.put(`/categories/${url}`, { name });

	return res.data;
};

const generateFormEditCategory = () => {
	const label = document.getElementById(`label-category`);
	const url = label.getAttribute("category-url");
	const value = label.textContent;

	document.getElementById("optionsContainer").classList.add("hidden");
	
	const html = `
        <form id="form-edit-category" class="block w-full">
            <input required value='${value}' name="name" maxlength="32" id="txt-edit-category" category-url="${url}" class="form-input block w-full" onfocus="const value = this.value; this.value = null; this.value=value">
        </form>
    `;

	console.log(html)
	label.innerHTML = `${html}`;
	const txtEditCategory = document.getElementById("txt-edit-category");
	txtEditCategory.focus();

	txtEditCategory.addEventListener("blur", () => (label.innerHTML = value));

	document
		.getElementById("form-edit-category")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const newCategory = await editCategory();
			label.innerText = newCategory.category.name;
		});
};

const listenerEditCategory = () => {
	document
		.getElementById("btn-edit-category")
		.addEventListener("click", async () => {
			generateFormEditCategory();
		});
};

// ----------------------------------------------------------

listenerEditCategory();
