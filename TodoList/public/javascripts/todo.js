const url="http://localhost:8000/";
const subBtn=document.querySelector('.subBtn');
const todoInput=document.querySelector('.todo-input');
const todoForm=document.querySelector('.todo-form');
const todoList=document.querySelector('tbody');
//추가,삭제,완료
const deleteTodo=(event)=>{
    console.log("hello");
}

const addTodo=(event)=>{
    event.preventDefault();
    const value=document.querySelector('.todo-input').value;
    const obj={
        'value':value,
        'complete':false
    };

    const xhr=new XMLHttpRequest();
    xhr.open('POST',`${url}add`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify(obj));
    xhr.onload=()=>{
        todoInput.value="";
        getTodo();   
    }
}

const getTodo=()=>{
    const xhr=new XMLHttpRequest();
    xhr.open('GET',`${url}list`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send();
    xhr.onload=()=>{
        let lists='';
        let list=JSON.parse(xhr.response).list;
        let index=1;
        list.forEach(element => {
            lists+=`
            <tr id=${index}>
            <td>${index++}</td>
            <td>${element.content}
            <button type="button" class="btn btn-dark delBtn">Delete</button>
            <button type="button" class="btn btn-light clearBtn">Clear</button>
            </td>
            </tr>
            `
        });
    
        todoList.innerHTML=lists;
    }
}


const init=()=>{
    getTodo();
    subBtn.addEventListener('click',addTodo);
    todoForm.addEventListener('submit',addTodo);
}

init();