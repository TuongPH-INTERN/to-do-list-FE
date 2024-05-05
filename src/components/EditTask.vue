<template>
  <div class="card mx-auto col-8 mt-5">
    <form class="col-10 mx-auto my-5">
  <div class="form-group">
    <h1 class="text-primary text-center mb-4 font-weight-bold">EDIT TASK</h1>
    <label for="task-name" class="mb-1">Task description:</label>
    <input required type="text" class="form-control" id="task-name"  placeholder="Enter task description"
    v-model="task.task_name"
    >
  </div>
  <br>
  <div class="form-group">
    <label for="date" class="mb-1">Time to do:</label>
    <input required type="datetime-local" class="form-control" id="date"
    v-model="task.date"
    >
  </div>
<br>
  <button type="submit" class="btn btn-warning" @click="updateTaskClick()">Submit</button>
    <button type="button" class="btn btn-dark mx-3" @click="backHome">Back to home</button>
</form>
  </div>
</template>

<script>
import * as taskAPI from '../utils/task'
import moment from 'moment'

export default {
  name: 'EditTask',
  data () {
    return {
      task: {}
    }
  },
  created () {
    const taskID = this.$route.params.id
    this.showTask(taskID)
  },
  methods: {
    async showTask (id) {
      try {
        const response = await taskAPI.show(id)
        if (response.data.task) {
          this.task = response.data.task
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
          this.backHome()
        }
      } catch (error) {
        console.error('Error:', error)
      }
    },
    updateTaskClick: function () {
      if (this.task.task_name.trim() === '' || this.task.date === '') {
        this.$toasted.error('Please enter both name task and date')
        return
      }
      this.task.date = moment(this.task.date).format('YYYY-MM-DD HH:mm:ss')
      this.updateTask(this.$route.params.id, this.task)
    },

    backHome: function () {
      this.$router.push({name: 'Todos'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
