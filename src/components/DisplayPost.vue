<script setup>
import { onMounted, ref } from 'vue'

const postData = ref({
  data: [],
  links: {},
  meta: {},
})

const getPostData = async (uri = 'http://localhost:8000/api/posts') => {
  try {
    const res = await fetch(uri)
    if (!res.ok) {
      console.log('error')
    }

    postData.value = await res.json()
    console.table(postData)
  } catch (error) {
    console.log(error)
  }
}
onMounted(() => {
  getPostData()
})
</script>
<template>
  <section class="content">
    <div class="card">
      <div class="card-body">
        <table id="example1" class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Text</th>
              <th>Caption</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(post, index) in postData.data" :key="index">
              <td>{{ index + 1 }}</td>
              <td v-if="post.postImage">
                <img
                  :src="`http://localhost:8000/storage/${post.postImage}`"
                  alt="Post Image"
                  style="width: 50px; height: 50px; object-fit: cover"
                />
              </td>
              <td v-else>No Image available.</td>
              <td>{{ post.postText }}</td>
              <td>{{ post.caption }}</td>
              <td>
                <!--TODO:  Needs to have router -->
                <a href="{{route('post-show',$post->id)}}" class="btn btn-success btn-sm"
                  ><i class="fa fa-eye" aria-hidden="true"></i
                ></a>
                <a href="{{route('post-edit',$post->id)}}" class="btn btn-primary btn-sm"
                  ><i class="fa fa-pencil-alt" aria-hidden="true"></i
                ></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <ul class="pagination" v-if="postData.links">
      <a
        v-if="postData.links.prev"
        :href="postData.links.prev"
        @click.prevent="getPostData(postData.links.prev)"
        class="page-link"
      >
        Prev
      </a>
      <a
        v-if="postData.links.next"
        :href="postData.links.next"
        @click.prevent="getPostData(postData.links.next)"
        class="page-link"
      >
        Next
      </a>
    </ul>
  </section>
</template>
