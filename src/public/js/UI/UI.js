import {toggleShowComponent} from "../helpers.js";

// NAVBAR --------------------------------------------------
const btnUser = document.getElementById("user-button");
const containerUser = document.getElementById("user-container");
const btnUserResponsive = document.getElementById("user-button-bottom");
const containerUserResponsive = document.getElementById("user-container-bottom");
const btnSearch = document.getElementById("btn-search");
const containerSearch = document.getElementById("container-search");

toggleShowComponent(btnUser, containerUser)
toggleShowComponent(btnUserResponsive, containerUserResponsive)

btnSearch.addEventListener("click", () => {
	containerUser.classList.contains("hidden")
		? null
		: containerUser.classList.add("hidden");
	containerSearch.classList.toggle("hidden");
	document.getElementById("txt-search").focus();
});

if (document.getElementById("btn-back")) {
	const btnBack = document.getElementById("btn-back");
	btnBack.setAttribute(
		"href",
		document.referrer.length > 0 ? document.referrer : "/"
	);
}

// ADD CATEGORY --------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
	const currentPage = document.getElementById("current-page").value || "";

	if (currentPage === "categories.index" || currentPage === "pages.home") {
		const randomColor = document.getElementById("random-color").value;

		const btnAddCategory = document.getElementById("btn-add-category");
		const btnCloseCategory = document.getElementById("btn-close-category");
		const btnSubmitCategory = document.getElementById("btn-submit-category");
		const containerAddCategory = document.getElementById(
			"container-add-category"
		);

		btnAddCategory.classList.add(
			`bg-${randomColor}-600`,
			`hover:bg-${randomColor}-700`
		);
		btnCloseCategory.classList.add(
			`bg-${randomColor}-600`,
			`hover:bg-${randomColor}-700`
		);
		btnSubmitCategory.classList.add(
			`bg-${randomColor}-600`,
			`hover:bg-${randomColor}-700`
		);
		
		if (document.getElementById('btn-welcome')) {
			document.getElementById('btn-welcome').classList.add(
				`bg-${randomColor}-600`,
				`hover:bg-${randomColor}-700`
			);
		}

		btnAddCategory.addEventListener("click", () => {
			btnAddCategory.classList.add("hidden");
			btnCloseCategory.classList.remove("hidden");
			containerAddCategory.classList.remove("hidden");
			document.getElementById("txt-category").focus();
		});
		
		if (document.getElementById('home-title')) document.getElementById("home-title").classList.add(`text-${randomColor}-700`) 

		btnCloseCategory.addEventListener("click", () => {
			btnCloseCategory.classList.add("hidden");
			btnAddCategory.classList.remove("hidden");
			containerAddCategory.classList.add("hidden");
		});

	}
});

// ADD TASK -------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
	const currentPage = document.getElementById("current-page").value || "";

	if (currentPage === "categories.show") {
		const btnOptions = document.getElementById("optionsButton");
		const containerOptions = document.getElementById("optionsContainer");

		toggleShowComponent(btnOptions, containerOptions);
		const btnAddCategory = document.getElementById("btn-add-category");
		const btnCloseCategory = document.getElementById("btn-close-category");
		const containerAddCategory = document.getElementById(
			"container-add-category"
		);

		btnAddCategory.addEventListener("click", () => {
			btnAddCategory.classList.add("hidden");
			btnCloseCategory.classList.remove("hidden");
			containerAddCategory.classList.remove("hidden");
			document.getElementById("txt-category").focus();
		});

		btnCloseCategory.addEventListener("click", () => {
			btnCloseCategory.classList.add("hidden");
			btnAddCategory.classList.remove("hidden");
			containerAddCategory.classList.add("hidden");
		});
	}
});
