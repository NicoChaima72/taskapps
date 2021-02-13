import GeneralService from "../Services/General";

const searchCategoriesAndTasks = async (query) => {
	const res = await GeneralService.searchCategoriesAndTasks(query);
	return res;
};

const drawContainerSearch = (result) => {
	const categories = result.categories;
	const tasks = result.tasks;
	const search = result.search;

	console.log(categories, tasks);
	const resultsSearch = document.getElementById("results-search");

	let categoriesHTML = categories.map((category) => {
		const span = `<span class="font-bold">${search}</span>`;
		const newName = category.name
			.toLowerCase()
			.replace(search.toLowerCase(), span);
		return `
            <a href="/categories/${category.url}" class="flex items-center bg-gray-50 rounded-lg px-4 py-4 group shadow-sm">
                <div class="group-hover:bg-${category.color}-500 p-2 rounded-full bg-${category.color}-400"></div>
                <p class="ml-2 leading-none text-sm break-word">${newName}</p>
            </a>
        `;
	});

	let tasksHTML = tasks.map((task) => {
		const span = `<span class="font-bold">${search}</span>`;
		const newDescription = task.description
			.toLowerCase()
			.replace(search.toLowerCase(), span);

		return `
            <a href="" class="block bg-gray-50 rounded-lg pt-3 pb-2 px-4 group shadow-sm">
                <p class="text-sm mr-2 leading-none break-word">${newDescription}</p>
                <div class="flex items-center mt-1">
                    <p class="p-1 rounded-full bg-${task.Category.color}-400 group-hover:bg-${task.Category.color}-500"></p>
                    <p class="ml-1 text-xs text-gray-400">${task.Category.name}</p>
                </div>
            </a>
        `;
	});

	categoriesHTML = `
        <div>
            <p class="text-gray-400 text-sm mb-1">Categorias</p>
            <div class="space-y-2">
                ${categoriesHTML.join("")}
            </div>
        </div>
    `;

	tasksHTML = `
        <div>
            <p class="text-gray-400 text-sm mb-1">Tareas</p>
            <div class="space-y-2">
                ${tasksHTML.join("")}
            </div>
        </div>
    `;

	let html = ``;

	if (categories.length > 0) html += categoriesHTML;
	if (tasks.length > 0) html += tasksHTML;
	if (html.length == 0)
		html = `<p class="text-sm text-center text-gray-400">No hay resultados</p>`;

	resultsSearch.innerHTML = html;
};

const listenerSearchCategoriesAndTasks = () => {
	const txtSearch = document.getElementById("txt-search");

	txtSearch.addEventListener("input", async () => {
		const resultsSearch = document.getElementById("results-search");

		resultsSearch.innerHTML = `<img class="w-6 mx-auto rotate" src="/img/loader.svg">`;

		if (txtSearch.value.length > 1) {
			resultsSearch.classList.remove("hidden");
			const data = await searchCategoriesAndTasks(txtSearch.value);
			drawContainerSearch(data);
		} else {
			resultsSearch.classList.add("hidden");
		}
	});
};
// -----------------------------------------------------------------

listenerSearchCategoriesAndTasks();
