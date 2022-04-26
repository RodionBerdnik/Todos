const api = axios.create({
    baseURL: 'http://localhost:1234',
});
api.interceptors.response.use(
    (res) => [null, res.data],
    (err) => [err, null]
)


function getTodos() {
    return api.get('/todos');
}
function getTodo(id) {
    return api.get('/todos/'+ id);
}
function createTodo(todoData) {
    return api.post('/todos', todoData);
}
function updateTodos(id,todoData) {
    return api.patch('/todos/' + id, todoData);
}
function deleteTodo(id) {
    return api.delete('/todos/', + id);
}


const addForm=document.getElementById('addForm')

addForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const newTodo = {
        title: e.target.title.value,
        completed: false
    }
    const [createdTodoError, createdTodo] = await createTodo(newTodo)
    if (createdTodoError){
        alert('Error creating todo')
        console.warn(createdTodoError)
    } else{
        e.target.reset()
        console.log(createdTodo)
    }
})

const todoList = document.getElementById('todoList')
let TODOS = [];
start();


async function start() {
const [todosError, todos] = await getTodos();
if (todosError){
    console.warn(todosError)
} else{
    TODOS = todos;
    renderTodos(TODOS, todoList);
}

function renderTodos(todos, todoListElem){
    const todosHTML = todos.map(todo => {
        return `<div class="todo">
        <h2 class="todo-title">${todo.title}</h2>
        <h3 class="todo-status">${todo.status ? 'Competed' : 'Uncompeted'}</h3>
    </div>`
    }).join('');
    render(todosHTML, todoListElem)
}

function render(html, element){
    element.innerHTML = html
}
}
// sendBtn.addEventListener('click', async (e) => {
//     const [userError]= await createUser({name:'Petro'})
//     if (!userError){
//         console.log('User created!');
//     } else{
//         console.log('Error user create');
//     }
//     const [, users] =await getUsers();
//     if (users) {
//     console.log(users)
//     }
// });

// async function getData(url) {
//     console.log('Request started!')
//     try {
//         const res = await api.get(url)
//         console.log(res,res.data)
//         }
//         const data = await res.json()
//         console.log(data)
//     } catch (error) {
//         console.warn(error)
//     }
//     console.log('Request finished!')
