import utils from './utils.js';
import ls from './ls.js';

//load list

loadTodos();
//add event listeners

document.querySelector('#addBtn').onclick = newTodo;
document.querySelector('#activeFilter').onclick = applyFilter;
document.querySelector('#allFilter').onclick = applyFilter;
document.querySelector('#completed').onclick = applyFilter;



function newTodo() {
	//create a new to do item on the list
	const todo = createTodo();
	const todoDiv= createTodoElement(todo);
	addToList(todoDiv);
	ls.saveTodo(todo);

}

function createTodo(){
const input = document.querySelector('#todoInput');
const newTodo = {id: Date.now(), content: input.value, completed:false}
input.value = '';
return newTodo;
}

function createTodoElement(todo){
	//todo div creation
	const todoDiv = document.createElement('div');
	todoDiv.classList.add('todo');

//complete button
const completeBtn = document.createElement('button');
completeBtn.classList.add('complete-btn');
completeBtn.onclick = toggleComplete;
completeBtn.setAttribute('data-id', todo.id);


//todo content
const todoContent = document.createElement('div');
todoContent.innerText = todo.content;
todoContent.classList.add('todo-content');
if(todo.completed) {
	todoContent.classList.add('completed');
	completeBtn.innerText = 'X';
}

//delete button
const deleteBtn = document.createElement('button');
deleteBtn.setAttribute('data-id', todo.id);
deleteBtn.classList.add('todo-delete-btn');
deleteBtn.innerText = "X";
deleteBtn.onclick = deleteTodo;

todoDiv.appendChild(completeBtn);
todoDiv.appendChild(todoContent);
todoDiv.appendChild(deleteBtn);


return todoDiv;
}

function addToList(todoDiv){
	//add to document
	document.querySelector('#todos').appendChild(todoDiv);
}


function loadTodos(){
	const todoList = ls.getTodoList();
	todoList.forEach(todo => {
		const el = createTodoElement(todo)
		addToList(el);
	})
}


//event handlers
function deleteTodo(e){
const btn = e.currentTarget;
ls.deleteTodo(btn.getAttribute('data-id'));
document.querySelector('#todos').innerHTML = '';
loadTodos();
}


function toggleComplete(e){
	const btn = e.currentTarget;
    ls.toggleComplete(btn.getAttribute('data-id'));
    document.querySelector('#todos').innerHTML = '';
    loadTodos();
}




function applyFilter(e){
	//clear the list
	document.querySelector('#todos').innerHTML = '';

	//declare variables
	let filteredTodos = [];
	const allTodos = ls.getTodoList();

//check which filter to apply
if (e.currentTarget.id == 'activeFilter'){
    filteredTodos = utils.activeFilter(allTodos)
} else if (e.currentTarget.id == 'allFilter'){
	filteredTodos = allTodos;
} else if (e.currentTarget.id == 'completed'){
	filteredTodos = utils.completedFilter(allTodos);
}

	//draw the list
	filteredTodos.forEach(todo => {
		const el = createTodoElement(todo);
		addToList(el);
		})
}