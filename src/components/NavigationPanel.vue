<script>
export default {
    data() {
        return {
            isPanelVisible: false,
        };
    },
    methods: {
        togglePanel() {
            this.isPanelVisible = !this.isPanelVisible;
        },
    },
};
</script>

<template>
  <div class="bg-gray-900 px-2 lg:px-4 py-2 lg:py-10 sm:rounded-xl flex lg:flex-col justify-between">
      <nav class="flex items-center flex-row space-x-2 lg:space-x-0 lg:flex-col lg:space-y-2">
        <router-link to="/search" >
          <a class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" title="Главная">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path>
            </svg>
          </a>
        </router-link>
        <router-link to="/library">
          <a class="text-white/50 p-4 inline-flex justify-center rounded-md hover:bg-gray-800 hover:text-white smooth-hover" title="Библиотека">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 sm:h-6 sm:w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
            </svg>
          </a>
        </router-link>
      </nav>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
}
.navigation-panel {
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  z-index: 1;
  overflow-y: auto;
}
.router-link-exact-active {
  background-color: rgb(15 23 42);
}
</style>
  