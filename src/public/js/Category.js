import axios from "axios";

const editCategory = async () => {
	const txtCategory = document.getElementById("txt-edit-category");
	const url = txtCategory.getAttribute("category-url");
	const name = txtCategory.value;

	const res = await axios.put(`/categories/${url}`, { name });

    console.log(res.data)
    
	return res.data;
};

const generateFormEditCategory = () => {
	const label = document.getElementById(`label-category`);
	const url = label.getAttribute("category-url");
	const value = label.textContent;

	document.getElementById("optionsContainer").classList.add("hidden");
	
	const html = `
        <form id="form-edit-category" class="block w-full">
            <input value="${value}" maxlength="32" id="txt-edit-category" category-url="${url}" class="form-input block w-full" onfocus="const value = this.value; this.value = null; this.value=value">
        </form>
    `;

	label.innerHTML = html;

	const txtEditCategory = document.getElementById("txt-edit-category");
	txtEditCategory.focus();

	txtEditCategory.addEventListener("blur", () => (label.innerHTML = value));

	document
		.getElementById("form-edit-category")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const newCategory = await editCategory();
			label.innerHTML = newCategory.category.name;
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
