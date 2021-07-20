<template>
  <div v-if="isloginopen"> 
    <section
       @click="close"
      class="h-screen z-20 w-screen bg-gray-900 fixed top-0 opacity-50"
    ></section>
    <div class="absolute font-bold inset-0">
      <div class="flex h-full">
        <div class="m-auto z-30 bg-white rounded p-2 w-1/3 shadow">
             <GoogleLogin @close-login-from-google="close" />
             <form class="p-2 my-2" @submit.prevent="submit">
              <div class="my-4">
                <label>Email or Username</label>
                <input
                   
                  ref="emailRef"
                  v-model="email"
                  class="rounded shadow p-2 w-full"
                  placeholder="Enter your email or username"
                />
              </div>
              <div class="my-4">
                <label>Password</label>
                <input
                  v-model="password"
                  class="rounded shadow p-2 w-full"
                  type="password"
                  placeholder="enter your password"
                />
              </div>
              <div class="my-4">
                <button
                  type="submit"
                  class="w-full rounded shadow-md bg-gradient-to-r from-red-800 to-pink-800 text-white p-2"
                >
                  <span v-if="!isLoading">Login</span>
                  <span v-else>⌛</span>
                </button>
              </div>
            </form>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import firebase from '../utilities/firebase';
import GoogleLogin from "../components/login/GoogleLogin";

export default {
    components: { GoogleLogin },
    emits: ["close-login"], // <--- add this line
    computed: {
       isloginopen(){
         return this.$store.state.isloginopen
       }
    },
    data() {
        return {
                email:"123@gmail.com",
                password:"123456",
                isLoading:false
        }
    },
     mounted() {
      // this.$refs.emailRef.focus()
      },
    methods: {
        submit(){
         this.isloading=true;
         firebase.auth().signInWithEmailAndPassword(this.email,this.password).
         then(()=>{
          this.email="";
          this.password="";
          this.isLoading=false; 
          this.close();
         })
         .catch((e)=>{
          console.log(e);
          this.isLoading=false;
        })

    },

    close(){
            this.$store.commit("setloginmodel",false)

    },

  
 
    
}
}; 
</script>

<style>
</style>