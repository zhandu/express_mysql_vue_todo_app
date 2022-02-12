const App = {
    data() {
        return {
            newTodo: '',
            todos: []
        }
    },
    computed: {
        nbOfTodos() {
            return this.todos.length
        },
        nbOfCompletedTodos() {
            return this.todos.filter(t => t.done).length
        },
        nbOfTodosToDo() {
            return this.todos.filter(t => !t.done).length
        },
    },
    methods: {
        formatDate(value, withTime) {
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit'
            }
            if (withTime) {
                options.hour = '2-digit'
                options.minute = '2-digit'
                options.second = '2-digit'
            }
            return new Intl.DateTimeFormat('en-US', options).format(new Date(value))
        },
        addNewTodo() {
            const title = this.newTodo.trim()

            if (!title) return

            fetch('/api/todo', {
                method: 'post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({title})
            })
            .then(res => res.json())
            .then(({todo}) => {
                this.todos.unshift(todo)
                this.newTodo = ''
            })
            .catch(e => console.log(e))
        },
        toggleTodoDone(id) {
            fetch(`/api/todo/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(todo => {
                const idx = this.todos.findIndex(t => t.id === id)
                this.todos[idx] = todo
            })
            .catch(e => console.log(e))
        },
        deleteTodo(id) {
            fetch(`/api/todo/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then(() => {
                const idx = this.todos.findIndex(t => t.id === id)
                this.todos.splice(idx, 1)
            })
            .catch(e => console.log(e))
        }
    },
    created() {
        fetch('/api/todo', {
            method: 'get'
        })
        .then(res => res.json())
        .then(todos => this.todos = todos)
        .catch(e => console.log(e))
    }
}
  
Vue.createApp(App).mount('#app')