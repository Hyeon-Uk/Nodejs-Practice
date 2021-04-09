const url="http://localhost:8000/";
const subBtn=document.querySelector('.subBtn');
const todoInput=document.querySelector('.todo-input');
const todoForm=document.querySelector('.todo-form');
const todoList=document.querySelector('tbody');
//추가,삭제,완료
const deleteTodo=(event)=>{
    const targetId=event.target.parentNode.parentNode.id;
    const xhr=new XMLHttpRequest();
    xhr.open('POST',`${url}delete`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({id:targetId}));
    xhr.onload=()=>{
        getTodo();   
    }
}

const clearTodo=(event)=>{
    const targetId=event.target.parentNode.parentNode.id;
    const targetTr=event.target.parentNode.parentNode;

    const xhr=new XMLHttpRequest();
    xhr.open('POST',`${url}clear`);
    xhr.setRequestHeader("Content-type","application/json");
    xhr.send(JSON.stringify({id:targetId}));
    xhr.onload=()=>{
        targetTr.classList.toggle('line');
    }
}

const addTodo=(event)=>{
    event.preventDefault();
    const value=document.querySelector('.todo-input').value;
    const deadLine=document.querySelector('.calendar').value;
    const obj={
        'value':value,
        'deadline':deadLine,
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
            <tr id=${index} class=" ${element.complete===true?"line":""}">
            <td>${index++}</td>
            <td class="contents">${element.content}</td>
            <td>${element.deadline}</td>
            <td>
            <button type="button" class="btn btn-dark delBtn" onClick="deleteTodo(event)">X</button>
            <button type="button" class="btn btn-light clearBtn" onClick="clearTodo(event)">V</button>
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