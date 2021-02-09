import axios from "axios";

const changeState = async (taskId) => {
	try {
		const response = await axios.put(`/tasks/${taskId}/state`);
		return response.data;
	} catch (err) {
		return null;
	}
};

const addTask = async () => {
	const categoryUrl = document.getElementById("category-url").value;
	const description = document.getElementById("txt-category").value;
	const res = await axios.post(`/tasks/${categoryUrl}`, { description });

	return res.data;
};

const editTask = async () => {
	const form = document.getElementById("form-edit-task")
	const data = new FormData(form);

	const txtTask = document.getElementById("txt-edit-task");
	const id = txtTask.getAttribute("task-id");

	// serielize
	let description = data.get("description")
	description = description.replace('<script>', '')
	description = description.replace('</script>', '')

	const res = await axios.put(`/tasks/${id}`, { description });

	return res.data;
};

const deleteTask = async (id) => {
	const res = await axios.delete(`/tasks/${id}`);

	return res.data;
};

const changeProgressBar = async (stats) => {
	if (document.getElementById("progress-category")) { /** DENTRO DE PAGINA SHOW */
		const progressBar = document.getElementById("progress-category");
		const tasksPercent = document.getElementById("tasks-percent");
		const tasksCompleted = document.getElementById("tasks-completed");
		const tasksTotal = document.getElementById("tasks-total");
		
		console.log({ progressBar, tasksPercent, tasksCompleted, tasksTotal, stats });
		
		tasksCompleted.textContent = stats.completed;
		tasksTotal.textContent = stats.tasks;
		tasksPercent.textContent = `(${stats.percent}%)`;
		progressBar.style.width = `${stats.percent}%`;
	} else { /** DENTRO DE PAGINA PRINCIPAL */
		if (document.getElementById(`progress-category-${stats.id}`)) { /** SI LA CATEGORIA SE ENCUENTRA ENTRE LAS CATEGORIAS RECIENTES LA LLEVAMOS AL PRINCIPIO */
			const progressBar = document.getElementById(`progress-category-${stats.id}`);
			const tasksTotal = document.getElementById(`tasks-total-${stats.id}`)
			const tasksPercent = document.getElementById(`tasks-percent-${stats.id}`);
			const categoryDate = document.getElementById(`category-date-${stats.id}`)
			
			progressBar.style.width = `${stats.percent}%`;
			tasksPercent.textContent = `${stats.percent}%`;
			categoryDate.textContent = "hace unos segundos"

			const parent = progressBar.parentNode.parentNode
			
			parent.remove()
			
			const containerCategories = document.getElementById('container-categories')
			containerCategories.prepend(parent);
			
		} else { /** SI NO SE ENCUENTRA LA CREAMOS Y LA ENVIAMOS AL PRINCIPIO */
			const category = stats.category;
			const containerCategories = document.getElementById('container-categories')

			const html = `
				<a class="w-9/12 md:w-6/12 lg:w-4/12 flex-none bg-white rounded shadow-sm p-4 relative pb-6 mb-2"
                    href="/categories/${category.url}">
                    <div class="flex justify-between items-start">
                        <div class="leading-none">
                            <h4 class="font-semibold text-xl leading-none break-word">${category.name}</h4>
                            <p class="text-gray-400 text-sm" id="tasks-total-2">${category.Tasks.length} Tareas</p>
                        </div>
                        <p class="text-${category.color}-500 text-3xl font-bold ml-2" id="tasks-percent-2">${stats.percent}%</p>
                    </div>
                    <div class="bg-${category.color}-200 shadow w-full rounded">
                        <div class="bg-${category.color}-500 leading-none py-1 rounded my-1" id="progress-category-${category.id}"
                            style="width: ${stats.percent}%"></div>
                    </div><small class="block text-xs text-gray-400 absolute right-4 bottom-2">hace unos segundos</small>
                </a>
			`

			containerCategories.innerHTML = html + containerCategories.innerHTML
		}

		

	}
};

const generateOrDestroyProgressBar = (data, generate = true) => {
	const stats = data.stats;
	const category = data.category;
	const containerProgressBar = document.getElementById(
		"container-progress-bar"
	);

	if (generate) {
		const textEmptyTasks = document.getElementById("text-empty-tasks");

		const html = `
			<div>
				<p class="text-xs m-0">
					Progreso:
					<span class="ml-1 font-medium">
						<span id="tasks-completed">${stats.completed}</span>
						<span class="mx-1">/</span>
						<span id="tasks-total">${stats.tasks}</span>
					</span>
					<span class="ml-2" id="tasks-percent">(${stats.percent}%)</span>
				</p>
                <div class="bg-${category.color}-200 shadow w-full rounded mt-1">
                    <div class="bg-${category.color}-600 leading-none pt-1 pb-2 rounded" style="width: ${stats.percent}%" id="progress-category"></div>
                </div>
            </div>
		`;

		textEmptyTasks.parentNode.removeChild(textEmptyTasks);
		containerProgressBar.innerHTML = html;
	} else {
		const containerTasks = document.getElementById("container-tasks");

		const html = `
		<p class="text-gray-400 text-center mt-4">Sin progreso</p>
		`;

		containerProgressBar.innerHTML = html;
		containerTasks.innerHTML = `
			<div class="bg-white p-3 rounded text-center text-gray-400 border text-sm" id="text-empty-tasks">No hay tareas registradas. Añade una!</div>
		`;
	}
};

const toggleShowFormAdd = (
	show = true /* 0 = Ocultar formulario, 1 = Mostrar*/
) => {
	const btnAdd = document.getElementById("btn-add-category");
	const containerAdd = document.getElementById("container-add-category");
	const btnClose = document.getElementById("btn-close-category");
	const txtTask = document.getElementById("txt-category");

	txtTask.value = "";

	if (show) {
		btnAdd.classList.remove("hidden");
		btnClose.classList.add("hidden");
		containerAdd.classList.add("hidden");
	} else {
		btnAdd.classList.add("hidden");
		btnClose.classList.remove("hidden");
		containerAdd.classList.remove("hidden");
	}
};

const drawTask = (data) => {
	const category = data.category;
	const stats = data.stats;
	const task = data.task;

	const containerTasks = document.getElementById("container-tasks");

	const html = `
		<label class="flex items-center p-3 bg-white rounded shadow-sm w-full leading-none cursor-pointer">
			<input class="task border-${category.color}-600 text-${category.color}-600 form-checkbox p-4 rounded-full border-2" type="checkbox" task-id="${task.id}" />
			<span class="ml-4 block break-word mr-2 w-full" id="label-task-${task.id}"></span>
			<div class="flex ml-auto space-x-2 text-gray-400">
				<button class="hover:text-${category.color}-300 btn-edit-task" task-id="${task.id}">
					<svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path>
					</svg>
				</button>
				<button class="hover:text-${category.color}-300 btn-delete-task" task-id="${task.id}">
					<svg class="w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
					</svg>
				</button>
			</div>
		</label>
	`;

	containerTasks.innerHTML = html + containerTasks.innerHTML;
	document.getElementById(`label-task-${task.id}`).innerText = task.description;

	listenerChangeState();
	listenerDeleteTask();
	listenerEditTask();
};

const generateFormEditTask = (id, value) => {
	const label = document.getElementById(`label-task-${id}`);

	const html = `
		<form id="form-edit-task">
			<input required type="text" name="description" maxlength="50" id="txt-edit-task" task-id="${id}" value='${value}' class="border border-gray-400 p-1 w-full" onfocus="const value = this.value; this.value = null; this.value=value">
		</form>
	`;

	label.innerHTML = html;

	const txtEditTask = document.getElementById("txt-edit-task");
	txtEditTask.focus();

	txtEditTask.addEventListener("blur", () => (label.innerHTML = value));

	document
		.getElementById("form-edit-task")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const newTask = await editTask();
			label.innerText = newTask.task.description;
		});
};

const removeTask = (btnTask) => {
	const labelTask = btnTask.parentNode.parentNode;
	labelTask.remove();
};

const listenerChangeState = () => {
	document.querySelectorAll(".task").forEach((task) => {
		task.addEventListener("change", async (e) => {
			const stats = await changeState(task.getAttribute("task-id"));
			changeProgressBar(stats.stats);
		});
	});
};

const listenerAddTask = () => {
	document
		.getElementById("form-add-task")
		.addEventListener("submit", async (e) => {
			e.preventDefault();
			const data = await addTask();
			if (data.stats.tasks == 1)
				/** Primera tarea creada */
				generateOrDestroyProgressBar(data, true);
			/** ya hay mas tareas */ else changeProgressBar(data.stats);

			toggleShowFormAdd(true);
			drawTask(data);
		});
};

const listenerDeleteTask = () => {
	document.querySelectorAll(".btn-delete-task").forEach((btn) => {
		btn.addEventListener("click", async () => {
			const text = btn.parentNode.parentNode.children[1].textContent;
			const taskId = btn.getAttribute("task-id");
			/** span con el nombre de la tarea */

			if (confirm(`Se eliminará la tarea "${text}"`)) {
				const data = await deleteTask(taskId);

				if (data.stats.tasks) changeProgressBar(data.stats);
				else generateOrDestroyProgressBar(data, false);

				removeTask(btn);
			}
		});
	});
};

const listenerEditTask = () => {
	document.querySelectorAll(".btn-edit-task").forEach((btn) => {
		btn.addEventListener("click", async () => {
			const text = btn.parentNode.parentNode.children[1].textContent;
			// /** span con el nombre de la tarea */
			const taskId = btn.getAttribute("task-id");

			await generateFormEditTask(taskId, text);
		});
	});
};

// --------------------------------------------

listenerChangeState();
listenerAddTask();
listenerDeleteTask();
listenerEditTask();
