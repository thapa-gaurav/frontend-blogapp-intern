<script setup>
import { ref, onMounted } from 'vue'
const props = defineProps(['id'])

const showdata = ref({
  data: {},
})

const getData = async (uri = `http://localhost:8000/api/posts/${props.id}`) => {
  try {
    const res = await fetch(uri)
    if (!res.ok) {
      console.log('error')
    }

    showdata.value.data = await res.json()
    console.log(showdata.value.data)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getData()
})
</script>

<template>
  <div class="row justify-content-center">
    <div class="col-sm-6 mb-3 mb-sm-0">
      <div class="card" style="width: 20rem">
        <div v-if="showdata.data.postImage">
          <img
            :src="`http://localhost:8000/storage/${showpost.data.postImage}`"
            class="card-img-top"
            alt="..."
          />
        </div>
        <div v-else>
          <p>No image found.</p>
        </div>
        <h5 class="card-title">{{ showdata.data.caption }}</h5>
        <p class="card-text">{{ showdata.data.postText }}</p>
        <ul class="list-group list-group-flush">
          <!-- <li class="list-group-item">Created by: {{ showdata.data.user.username }}</li> -->
          <li class="list-group-item">Likes: {{ showdata.data.likeCount }}</li>
          <li class="list-group-item">Price: {{ showdata.data.price }}</li>
        </ul>
        <div class="card-body">
          <div class="row mx-1 justify-content-between">
            <RouterLink :to="{ name: 'displaypost' }">All Posts</RouterLink>
            <!-- <a href="{{route('post-index')}}" class="btn btn-primary">All posts</a> -->
            <!-- <a href="{{route('post-edit',$post)}}" class="btn btn-secondary">Edit</a>
            <form action="{{route('post-destroy',$post)}}" method="post">
              @csrf @method('delete')
              <button class="deleteButton btn btn-danger">Delete</button>
            </form>
            <form action="{{route('esewa',$post)}}" method="post">
              @csrf
              <button class="btn btn-danger">Pay</button>
            </form> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
