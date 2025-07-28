<script setup>
import { ref } from 'vue'

const currentCaption = ref('')
const currentText = ref('')
const currentPrice = ref('')
const currentFile = ref(null)

const handleFileUpload = (event) => {
  event.preventDefault()
  currentFile.value = event.target.files[0]
}

const handlePostUpload = async (event) => {
  event.preventDefault()

  const newPost = {
    caption: currentCaption.value,
    post_text: currentText.value,
    post_image: currentFile.value,
    price: currentPrice.value,
  }

  try {
    const res = await fetch('http://localhost:8000/api/posts', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newPost),
    })

    if (!res.ok) {
      console.log('Error while networking')
      return
    }

    const data = res.json()
    console.table(data)
  } catch (error) {
    console.error('Error: ' + error.message)
  }
}
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-md-8 col-lg-6">
      <form
        method="post"
        class="border p-4 rounded shadow-sm bg-white"
        enctype="multipart/form-data"
        @submit.prevent="handlePostUpload"
      >
        <h3 class="mb-4 text-center">Create new post</h3>

        <div class="mb-3">
          <label for="caption">Post Caption</label>
          <input type="text" v-model="currentCaption" />
          <!-- <error name="caption"></error> -->
        </div>
        <div class="mb-3">
          <label for="post_text">Post Text</label>
          <textarea class="form-control" v-model="currentText"></textarea>
          <!-- <error name="post_text"></error> -->
        </div>
        <div class="mb-3">
          <label for="post_image">Post Image</label>
          <input type="file" name="post_image" @change="handleFileUpload" />
          <!-- <error name="post_image"></error> -->
        </div>

        <div class="mb-3">
          <label for="price">Price</label>
          <input type="number" v-model="currentPrice" />
          <!-- <error name="price"></error> -->
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>
