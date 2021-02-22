export function toggleShowComponent(btnAction, container) {
	document.addEventListener("mouseup", (e) => {
		if (btnAction) {
			if (btnAction.contains(e.target)) container.classList.toggle("hidden");
			else if (
				!container.contains(e.target) &&
				!container.classList.contains("hidden")
			)
				container.classList.add("hidden");
		} else {
			if (!container.contains(e.target) && !container.classList.contains("hidden"))
				container.classList.add("hidden");
		}
	});
}
