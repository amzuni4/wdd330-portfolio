function saveTodo(todo) {
	//save the todo list
	const toDoList = getTodoList();

	toDoList.push(todo);
	localStorage.setItem('toDoList', JSON.stringify(toDoList));
}


function deleteTodo(id) {
	// Delete todolist item
	const toDoList = getTodoList();

	const updatedTodos = toDoList.filter(todo => todo.id != id)
	localStorage.setItem('toDoList', JSON.stringify(updatedTodos));

}

function toggleComplete(id){
	const toDoList = getTodoList();
	console.log(id);
	toDoList.forEach(todo => {
		if(todo.id == id ){
			if(todo.completed) {
				todo.completed = false;
			}else (todo.completed = true);

		} 
		console.log(toDoList);
	})
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

function getTodoList(){
	const todoListString = localStorage.getItem('toDoList');
	let todoList = [];

	if (todoListString){
		todoList = JSON.parse(todoListString);
	}

	return todoList;
}
export default{
saveTodo,
getTodoList,
deleteTodo, 
toggleComplete
}