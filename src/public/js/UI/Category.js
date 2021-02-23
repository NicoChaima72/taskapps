import CategoryService from "../Services/Category";

const editCategory = async () => {
	document
		.getElementById("form-edit-category")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const categoryName = document.getElementById("txt-edit-category").value;
			const url = document
				.getElementById(`label-category`)
				.getAttribute("category-url");

			const data = await CategoryService.editCategory(url, categoryName);
			if (!data.ok) {
				alert("Ha ocurrido un error, intentalo más tarde");
				return;
			}

			document.getElementById(`label-category`).innerHTML = data.category.name;
		});
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

	label.innerHTML = `${html}`;
	const txtEditCategory = document.getElementById("txt-edit-category");
	txtEditCategory.focus();

	// destroy form if click out
	txtEditCategory.addEventListener("blur", () => (label.innerHTML = value));

	editCategory();
};

const listenerEditCategory = () => {
	document
		.getElementById("btn-edit-category")
		.addEventListener("click", async () => {
			generateFormEditCategory();
		});
};

// ---------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {
	const currentPage = document.getElementById("current-page").value || "";

	if (currentPage === "categories.show") {
		listenerEditCategory();
	}
});
