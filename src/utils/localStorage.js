export const loadItem = (name) => {
	try {
		const seriallizedState = localStorage.getItem(name);
		if (seriallizedState === null) {
			return undefined;
		}
		return JSON.parse(seriallizedState);
	} catch (err) {
		return undefined;
	}
};


export const saveItem = (name, state) => {
	try {
		const seriallizedState = JSON.stringify(state);
		localStorage.setItem(name, seriallizedState);
	} catch (err) {
		console.error(err);
	}
};


export const removeItem = (name, state) => {
	try {
		const seriallizedState = JSON.stringify(state);
		localStorage.removeItem(name, seriallizedState);
	} catch (err) {
		console.error(err);
	}
};