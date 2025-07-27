<script setup>
import { ref } from 'vue'

const currentUsername = ref('')
const currentPassword = ref('')
const currentEmail = ref('')
const currentName = ref('')
const signUp = async (e) => {
  e.preventDefault()
  const newUser = {
    username: currentUsername.value,
    password: currentPassword.value,
    email: currentEmail.value,
    name: currentName.value,
  }
  try {
    console.log(newUser)
    const res = await fetch('http://localhost:8000/api/register', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })

    const data = await res.json()

    if (!res.ok) {
      console.log('Error')
    }
    console.log('Registration Successfull.')
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <form @submit.prevent="signUp">
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
      <label for="name">Name</label>
      <input
        v-model="currentName"
        type="text"
        class="form-control"
        id="name"
        placeholder="Name"
        required
      />
    </div>
    <div class="form-group">
      <label for="email">Email</label>
      <input
        v-model="currentEmail"
        type="email"
        class="form-control"
        id="email"
        placeholder="Email"
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
