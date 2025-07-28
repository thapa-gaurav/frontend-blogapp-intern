<script setup>
import { ref } from 'vue'

const currentUsername = ref('')
const currentPassword = ref('')

const loginCheck = async (e) => {
  e.preventDefault()
  const loginUser = {
    username: currentUsername.value,
    password: currentPassword.value,
  }
  try {
    const res = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginUser),
    })

    const data = await res.json()

    if (!res.ok) {
      console.log('Error')
    }
    console.log('Login Successfull.')
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form @submit.prevent="loginCheck">
    <div class="form-group">
      <label for="username">Email address</label>
      <input
        v-model="currentUsername"
        type="text"
        class="form-control"
        id="username"
        placeholder="username"
        required
      />
    </div>
    <div class="form-group">
      <label for="password">Password</label>
      <input
        v-model="currentPassword"
        type="password"
        class="form-control"
        id="password"
        placeholder="Password"
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</template>
