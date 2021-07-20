<template>
  <section class="flex w-full">
    <div class="m-auto">
      <div class="mt-10">
        <h1 class="text-2xl text-center">tensorflow object detection</h1>
        <div class="flex flex-wrap justify-center my-3">
          <div class="w-full flex flex-wrap justify-center">
            <div class="w-full">
              <button v-if="!isStreaming" @click="opencamera" class="btn w-full">
                capture img
              </button>
              <div v-else class="w-full flex justify-center">
                  <div class=" w-1/2 flex justify-between">
               <button  @click="snapshot" class="btn ">
                takesnapshot
               </button>
              <button  @click="stopstreaming" class="btn ">
                stop streaming
              </button>
              </div>
              </div>
            </div>
            <div
              class="
                w-40
                flex
                justify-center
                my-2
                h-40
                border-2 border-gray-400
              "
            >
              <video ref="videoref" autoplay="true" width="400" height="400" />
            </div>
          </div>
          <div class="block m-2 justify-center">
            <img
              ref="imgref"
              src="https://images.unsplash.com/photo-1501162946741-4960f990fdf4"
              alt="upload img"
              width="250"
              crossorigin="anonymous"
            />
          </div>
          <div class="w-full text-center my-2">
            <button @click="detect" class="p-2 btn">
              <span v-if="isloading == true">loading ......</span>
              <span v-else> Detect object</span>
            </button>

            <div v-if="result.length > 0" class="w-full">
              <p>{{ result[0].class }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {onBeforeUnmount, ref } from "@vue/runtime-core";

require("@tensorflow/tfjs-backend-cpu");
require("@tensorflow/tfjs-backend-webgl");
const cocoSsd = require("@tensorflow-models/coco-ssd");
export default {
  setup() {
    const imgref = ref("");
    const result = ref([]);
    const videoref = ref("");
    const isStreaming = ref(false);
    const isloading = ref(false);

    async function detect() {
      console.log(imgref.value);
      const img = imgref.value;
      isloading.value = true;
      const model = await cocoSsd.load();
      const predictions = await model.detect(img);
      result.value = predictions;
      isloading.value = false;
    }

    function snapshot(){
        const canvas=document.createElement("canvas")
        
        const ctx=canvas.getContext("2d");
        ctx.drawImage(videoref.value,0,0,150,150);
        const data =  canvas.toDataURL('img/png');
        imgref.value.setAttribute('src',data);
    }
    function stopstreaming() {
      const stream = videoref.value.srcObject;
      const tracks = stream.getTracks();
      tracks.map((track) => track.stop());
      isStreaming.value = false;
    }
    async function opencamera() {
      if (navigator.mediaDevices.getUserMedia) {
        // const devices = await navigator.mediaDevices.enumerateDevices();
        // const cams = devices.filter((device) => device.kind === "videoinput");
        //  const camid=cams[0].deviceId; 
        navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        // navigator.mediaDevices.getUserMedia({ video: {deviceId:{exact:camid}} }).then((stream) => {
            isStreaming.value=true;
          videoref.value.srcObject = stream;
        });
      }
    }

    onBeforeUnmount(() => {
      stopstreaming()
    })

    return { imgref,snapshot, result, detect, isloading, opencamera, videoref,isStreaming ,stopstreaming};
  },
};
</script>

<style>
</style>