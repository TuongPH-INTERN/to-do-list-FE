<template>
  <div class="card mx-auto col-8 mt-5">
  <form @submit.prevent="handleSubmit">
  <div class="form-group">
    <label for="exampleInputEmail1">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="data.email">
    <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div class="form-group">
    <label for="exampleInputPassword1">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" v-model="data.password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
  </div>
</template>

<script>
import * as loginAPI from '../utils/login'

export default {
  name: 'Login',
  data () {
    return {
      data: {
        email: '',
        password: ''
      }
    }
  },
  created () {
  },
  methods: {
    async handleSubmit () {
      try {
        const response = await loginAPI.post(this.data)
        if (response.status === 200 && response.data.access_token) {
          localStorage.setItem('token', response.data.access_token)
          this.$toasted.success('Login successfully')
          this.$router.push({ name: 'Todos' })
        }
      } catch (error) {
        this.$toasted.error('An error. Please try again')
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
