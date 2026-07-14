const API = "http://localhost:3000";

// Signup
function signup(){

fetch(API+"/signup",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

username:username.value,
email:email.value,
password:password.value

})

})

.then(res=>res.json())

.then(data=>{

if(data.token){

localStorage.setItem("token",data.token);

window.location="dashboard.html";

}else{

alert(data.message);

}

});

}


// Login
function login(){

fetch(API+"/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

email:email.value,
password:password.value

})

})

.then(res=>res.json())

.then(data=>{

if(data.token){

localStorage.setItem("token",data.token);

window.location="dashboard.html";

}else{

alert(data.message);

}

});

}


// Create Todo
function createTodo(){

fetch(API+"/create_task",{

method:"POST",

headers:{

"Content-Type":"application/json",

Authorization:"Bearer "+localStorage.getItem("token")

},

body:JSON.stringify({

title:title.value,

description:description.value

})

})

.then(res=>res.json())

.then(data=>{

getTodos();

title.value="";

description.value="";

});

}


// Get Todos
function getTodos(){

fetch(API+"/todos",{

headers:{

Authorization:"Bearer "+localStorage.getItem("token")

}

})

.then(res=>res.json())

.then(data=>{

let html="";

data.todos.forEach(todo=>{

html+=`

<div class="todo">

<h3>${todo.title}</h3>

<p>${todo.description}</p>

<div class="todo-buttons">

<button class="edit-btn"
onclick="editTodo('${todo._id}',
'${todo.title}',
'${todo.description}')">

Edit

</button>

<button class="delete-btn"
onclick="deleteTodo('${todo._id}')">

Delete

</button>

</div>

</div>

`;

});

document.getElementById("todos").innerHTML=html;

});

}


// Update Todo
function editTodo(id,title,description){

const newTitle=prompt("Title",title);

const newDescription=prompt("Description",description);

fetch(API+"/todo/"+id,{

method:"PUT",

headers:{

"Content-Type":"application/json",

Authorization:"Bearer "+localStorage.getItem("token")

},

body:JSON.stringify({

title:newTitle,

description:newDescription

})

})

.then(res=>res.json())

.then(()=>{

getTodos();

});

}


// Delete Todo
function deleteTodo(id){

fetch(API+"/todo/"+id,{

method:"DELETE",

headers:{

Authorization:"Bearer "+localStorage.getItem("token")

}

})

.then(res=>res.json())

.then(()=>{

getTodos();

});

}


// Logout
function logout(){

localStorage.removeItem("token");

window.location="login.html";

}