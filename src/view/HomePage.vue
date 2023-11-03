<script>
</script>

<template>
    <div class="flex flex-col items-center justify-center bg-gray-800">
        <div class="w-34 h-36">
            <h2 class="text-4xl font-extrabold sm:text-5xl text-white">
                Yamm<span class="text-indigo-600">Music</span>
            </h2>
            <p class="text-md md:text-xl mt-10">
                Это приложение для музыки, которое позволяет вам
                <router-link to="/search" ><a class="hover:underline" href="#">находить</a></router-link>,
                слушать и добавлять свои любимые треки в
                <router-link to="/library" ><a class="hover:underline" href="#">библиотеку</a></router-link>.
                Наслаждайтесь музыкой в любое время!
            </p>
        </div>
        <div class="m-3">
            <a href="#" title="Quicktoolz On Facebook"
                class="md:w-32 bg-white text-black font-bold rounded border-2 border-gray-600 hover:border-blue-800 hover:bg-gray-900 hover:text-white shadow-md py-2 px-6 items-center">
                <a href="https://github.com/yato90/yam-music" class="mx-auto">Github</a>
            </a>
        </div>
    </div>
  </template>
  
  <style scoped>
  </style>
  