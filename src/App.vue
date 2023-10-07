<script>
import NavigationPanel from './components/NavigationPanel.vue';
export default{
  components:{
    NavigationPanel,
  },
  data (){
    return{
      tracks: [],
    }
  },
  methods: {
    
  },
};
</script>

<template>
  <div class="bg-gray-900 min-h-screen flex items-center justify-center">
    <div class="bg-gray-800 flex-1 flex flex-col space-y-5 min-h-screen lg:space-y-0 lg:flex-row lg:space-x-10 sm:p-6 sm:my-2 sm:mx-4 sm:rounded-2xl">
      <NavigationPanel />
      <router-view />
    </div>
  </div>
</template>

<style>
:root{
  background-color: rgb(3 7 18);
}
body {
  margin: 0;
  padding: 0;
}
#app{
  width: 100%;
  max-width: 100%;
  padding: 0;
}
</style>
