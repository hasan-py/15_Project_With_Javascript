	// Select Items

let form = document.querySelector('#form');
let input = document.querySelector('#input');
let alert = document.querySelector('#alert');
let clearAll = document.querySelector('#clearAll');
let todoList = document.querySelector('#todoList');
let submitEditBtn = document.querySelector('#seBtn');



	// Edit Option

let editElement;
let editFlag = false;
let editId = ""



	// All EventListener

/* Setup All todo's */
window.addEventListener("DOMContentLoaded",(e)=>{
	allTodos = getLocalStorageItem()
	if(allTodos){	
		allTodos.forEach(function(todo) {
			let todoDiv = `
				<div data-id="${todo.id}" class="flex items-center justify-between hover:bg-gray-200 rounded-full px-8 py-2 ">
				<div class="font-semibold text-gray-800 text-sm md:text-lg break-all mr-2">${todo.todo}</div>
				<div class="flex space-x-2">
					<span class="edit"><svg viewBox="0 0 20 20" fill="currentColor" class="pencil-alt fill-current text-green-500 w-6 h-6 cursor-pointer hover:text-green-600"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg></span>
					<span class="delete"><svg viewBox="0 0 20 20" fill="currentColor" class="trash fill-current text-red-500 w-6 h-6 cursor-pointer hover:text-red-600"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></span>
				</div>
				</div>
			`
			todoList.innerHTML += todoDiv;
		});
	}
	// Allow edit and delete btn click when dom render
	editClick();
	deleteClick();
	setDefault();
})

/*  Form Submit */
form.addEventListener('submit', function(e) {
	e.preventDefault();
	formSubmit();
});

/* Clear items */
clearAll.addEventListener('click', function(e) {
	todoList.innerHTML = "";
	removeAllFromLocalStorage();
	setDefault();
	displayAlert("All todo's deleted","danger");
});



	// All Function

function formSubmit(){
	let value = input.value
	if(value && !editFlag){
		addTodo(value);
	}else if(value && editFlag){
		editTodo(value);
	}
	else{
		displayAlert("Please add something","danger")
	}
}

function setDefault(){
	form.reset();
	editFlag = false;
	editId = "";
	submitEditBtn.textContent = "submit";

	// This is for clearitems show or not
	if(todoList.children.length>0){
		clearAll.classList.remove("hidden");
	}else{
		clearAll.classList.add("hidden");
	}
}

function displayAlert(text,action){
	if (action==="danger"){
		alert.innerHTML = `
			<div class="bg-red-200 text-gray-800 text-sm text-center px-4 py-1 rounded-full font-semibold tracking-widest">${text}</div>

		`
		setTimeout(()=>{
			alert.innerHTML = "";
		},1000)
	}else if(action==="success"){	
		alert.innerHTML = `
			<div class="bg-green-200 text-gray-800 text-sm text-center px-4 py-1 rounded-full font-semibold tracking-widest">${text}</div>

		`
		setTimeout(()=>{
			alert.innerHTML = "";
		},1000)
	}
}


	/* Todo releted function */

function addTodo(todo){
	let id = new Date().getTime().toString();
	let todoElem = `
		<div data-id="${id}" class="flex items-center justify-between hover:bg-gray-200 rounded-full px-8 py-2 ">
			<div class="font-semibold text-gray-800 text-sm md:text-lg break-all mr-2">${todo}</div>
			<div class="flex space-x-2">
				<span class="edit"><svg viewBox="0 0 20 20" fill="currentColor" class="pencil-alt fill-current text-green-500 w-6 h-6 cursor-pointer hover:text-green-600"><path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path><path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd"></path></svg></span>
				<span class="delete"><svg viewBox="0 0 20 20" fill="currentColor" class="trash fill-current text-red-500 w-6 h-6 cursor-pointer hover:text-red-600"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg></span>
			</div>
		</div>
	`
	todoList.innerHTML = todoList.innerHTML + todoElem
	setDefault();
	displayAlert("Todo added successfully","success");
	addToLocalStoraqe(id,todo)

	// Allow edit and delete btn click when dom render
	editClick();
	deleteClick();

}

function editClick(){
	let editBtns = document.querySelectorAll('.edit');
	editBtns.forEach(function(elem) {
		elem.addEventListener('click',function(e){
			editBtns.forEach(b=>{
				b.parentElement.parentElement.classList.remove("bg-gray-200")
			})
			elem.parentElement.parentElement.classList.add("bg-gray-200")
			let currentTargetId = e.currentTarget.parentElement.parentElement.dataset.id
			let currentTargetValue = e.currentTarget.parentElement.parentElement.children[0].textContent
			input.value = currentTargetValue
			input.focus();
			editFlag = true;
			editId = currentTargetId;
			editElement = e.currentTarget.parentElement.parentElement.children[0]
		})
	});
}

function deleteClick(){
	let deleteBtns = document.querySelectorAll('.delete');
	deleteBtns.forEach(function(elem) {
		elem.addEventListener('click',deleteTodo)
	});
}

function editTodo(value){
	editElement.textContent = value
	editElement.parentElement.classList.remove("bg-gray-200");
	displayAlert(`Todo edit success`,"success")
	if(editId){
		editTodoFromLocalStorage(editId,value)
	}
}

function deleteTodo(e,elem){	
	let currentTargetElem = e.currentTarget.parentElement.parentElement
	let currentTargetId = e.currentTarget.parentElement.parentElement.dataset.id
	todoList.removeChild(currentTargetElem)
	removeSingleTodoFromLocalStorage(currentTargetId)
	displayAlert("Todo deleted","danger")
	setDefault();
}



	/* LocalStorage Function */

function getLocalStorageItem(){
	return JSON.parse(localStorage.getItem("todos"))
}

function addToLocalStoraqe(id,todo){
	if (getLocalStorageItem()){
		let array = getLocalStorageItem()
		console.log(array)
		array.push({id:id,todo:todo})
		localStorage.setItem("todos",JSON.stringify(array))
	}else{
		localStorage.setItem("todos",JSON.stringify([{id:id,todo:todo}]))
	}
}

function editTodoFromLocalStorage(id,newValue){
	let todos = getLocalStorageItem()
	todos = todos.map(t=>{
		if(t.id === id ){
			t.todo = newValue
		}
		return t
	})
	localStorage.setItem("todos",JSON.stringify(todos))
	setDefault();
}

function removeSingleTodoFromLocalStorage(id){
	let todos = getLocalStorageItem();
	todos = todos.filter(t=>{
		if (t.id !== id){
			return t
		}
	})
	localStorage.setItem("todos",JSON.stringify(todos))
}

function removeAllFromLocalStorage(){
	localStorage.removeItem("todos");
}