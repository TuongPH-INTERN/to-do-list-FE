<template>
  <div class="container m-2 p-2 rounded mx-auto bg-light shadow">
    <!-- App title section -->
    <div class="row m-1 p-3">
      <div class="col">
        <div
          class="p-1 h1 text-primary text-center mx-auto display-inline-block"
        >
          <u>My Todo-s</u>
        </div>
      </div>
    </div>
    <!-- Create todo section -->
    <div class="row m-1 p-3">
      <div class="col col-11 mx-auto">
        <div
          class="row bg-white rounded shadow-sm p-2 add-todo-wrapper align-items-center justify-content-center"
        >
          <div class="col">
            <input
            required
              class="form-control form-control-lg border-0 add-todo-input bg-transparent rounded"
              type="text"
              placeholder="Add new .."
              v-model="task.task_name"
            />
          </div>
          <div class="col-auto m-0 px-2 d-flex align-items-center">
            <input type="datetime-local" v-model="task.date"/>
          </div>
          <div class="col-auto px-0 mx-0 mr-2">
            <button type="button" class="btn btn-primary" @click="addTaskClick()">Add</button>
          </div>
        </div>
      </div>
    </div>
    <div class="p-2 mx-4 border-black-25 border-bottom"></div>
    <!-- View options section -->
    <div class="row m-1 p-3 px-5 justify-content-end">
       <div class="col-6 d-flex align-items-center mx-5">
          <label class="text-secondary my-2 pr-2 view-opt-label mx-3">Search:</label>
          <input type="text" class="col-9 form-control" placeholder="Search by key word">
        </div>
        <div class="col-auto d-flex align-items-center mx-5">
          <label class="text-secondary my-2 pr-2 view-opt-label">Filter</label>
          <select class="custom-select custom-select-sm btn my-2">
            <option value="all" selected>All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
            <option value="has-due-date">Has due date</option>
          </select>
        </div>
        <div class="col-auto d-flex align-items-center px-1 pr-3">
          <label class="text-secondary my-2 pr-2 view-opt-label">Sort</label>
          <select class="custom-select custom-select-sm btn my-2">
            <option value="added-date-asc" selected>Added date</option>
            <option value="due-date-desc">Due date</option>
          </select>
          <i
            class="fa fa fa-sort-amount-asc text-info btn mx-0 px-0 pl-1"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Ascending"
          ></i>
          <i
            class="fa fa fa-sort-amount-desc text-info btn mx-0 px-0 pl-1 d-none"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Descending"
          ></i>
        </div>

    </div>
    <table class="table text-center">
      <thead>
        <tr class="table-dark">
          <th scope="col" class="col-1">#</th>
          <th scope="col" class="col-5">Task</th>
          <th scope="col" class="col-2">Date</th>
          <th scope="col" class="col-1">Status</th>
          <th scope="col" class="col-3">Action</th>
        </tr>
      </thead>
      <tbody v-for="(todo, index) in todos" :key="todo.id">
          <tr :class="{
            'table-secondary': todo.status === 3,
            'table-info': todo.status === 2
          }">
            <th scope="row">{{index+1}}</th>
            <td>{{todo.task_name}}</td>
            <td>{{todo.date}}</td>
            <td v-if="todo.status === 1">Doing</td>
            <td v-else-if="todo.status === 2">Completed</td>
            <td v-else-if="todo.status === 3">Expired</td>
            <td>
              <button v-if="todo.status !== 2" type="button" class="btn btn-success btn-sm" @click="completeTask(todo.id)">
                Complete
              </button>
          <router-link :to="{name:'editTask', params:{id:todo.id}}" custom v-slot="{ navigate }">
  <button type="button" class="btn btn-warning btn-sm" @click="navigate">
    Edit
  </button>
</router-link>
          <button type="button" class="btn btn-danger btn-sm" @click="deleteTaskClick(todo.id)">
            Delete
          </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import * as taskAPI from '../utils/task'
import moment from 'moment'

export default {
  name: 'Todos',
  data () {
    return {
      todos: [],
      task: {
        task_name: '',
        date: ''
      }
    }
  },
  created () {
    this.getTask()
  },
  methods: {
    async getTask () {
      try {
        const response = await taskAPI.get()
        if (response.data.tasks.data) {
          this.todos = response.data.tasks.data
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },

    async addTask (data) {
      try {
        const response = await taskAPI.post(data)
        if (response.status === 200) {
          this.$toasted.success('Task added successfully')
          this.getTask()
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },

    async updateTask (id, data) {
      try {
        const response = await taskAPI.put(id, data)
        if (response.status === 200) {
          this.$toasted.success('Task updated successfully')
          this.getTask()
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },

    async deleteTask (id) {
      try {
        const response = await taskAPI.destroy(id)
        if (response.status === 200) {
          this.$toasted.success('Task deleted successfully')
          this.getTask()
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },

    addTaskClick: function () {
      if (this.task.task_name.trim() === '' || this.task.date === '') {
        this.$toasted.error('Please enter both name task and date')
        return
      }
      this.task.date = moment(this.task.date).format('YYYY-MM-DD HH:mm:ss')
      this.addTask(this.task)
    },

    completeTask: function (id) {
      if (confirm('Are you sure you want to complete this item?')) {
        let param = {
          'status': '2',
          'isChangeStatus': true
        }
        this.updateTask(id, param)
      }
    },

    deleteTaskClick: function (id) {
      if (confirm('Are you sure you want to delete this item?')) {
        this.deleteTask(id)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  font-family: "Open Sans", sans-serif;
  line-height: 1.6;
}

.add-todo-input,
.edit-todo-input {
  outline: none;
}

.add-todo-input:focus,
.edit-todo-input:focus {
  border: none !important;
  box-shadow: none !important;
}

.view-opt-label,
.date-label {
  font-size: 0.8rem;
}

.edit-todo-input {
  font-size: 1.7rem !important;
}

.todo-actions {
  visibility: hidden !important;
}

.todo-item:hover .todo-actions {
  visibility: visible !important;
}

.todo-item.editing .todo-actions .edit-icon {
  display: none !important;
}
</style>
