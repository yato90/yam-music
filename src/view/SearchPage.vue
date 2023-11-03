<script>
import AudioPlayer from '../components/AudioPlayer.vue';
import { searchTracks } from '../api/deezerApi.js';
export default {
    components:{
        AudioPlayer,
    },
    data() {
        return {
            searchQuery: '', // Запрос для поиска
            searchResults: [], // Результаты поиска
            isLoading: false, // Индикатор загрузки
        };
    },
    methods: {
        async performSearch() {
            this.isLoading = true;
            this.searchResults = [];
            try {
                const results = await searchTracks(this.searchQuery);
                if (results.length > 0) {
                    this.searchResults = results;
                }
            } catch (error) {
                console.error('Произошла ошибка при подключении к api');
            } finally {
                this.isLoading = false;
            }
        },
        playTrack(track) {
            this.$refs.audioPlayerRef.isPlaying = true;
            this.$refs.audioPlayerRef.startPlayback(track);
        },
    },
};
</script>

<template>
    <div class="grow search-page">
        <input v-model="searchQuery" class="text-gray-700 bg-white rounded border-gray-300" @input="performSearch" placeholder="Введите запрос" />
        <div v-if="isLoading">Загрузка результатов...</div>
        <section v-else class="grid place-items-center grid-cols-1 sm:grid-cols-4 gap-3">
            <div v-for="(track, index) in searchResults" :key="index" class="bg-gray-900 rounded">
                <div class="group relative">
                    <img class="w-full block rounded" :src="track.image" alt="album-image" />
                    <div class="absolute bg-black rounded bg-opacity-0 group-hover:bg-opacity-60 w-full h-full top-0 flex items-center group-hover:opacity-100 transition justify-evenly">
                        <button @click="playTrack(track)" class="hover:scale-110 opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="p-2">
                    <h3 class="text-white text-lg">Название: {{ track.title }}</h3>
                    <p class="text-gray-400">Артист: {{ track.artist }}</p>
                    <p class="text-gray-400">Альбом: {{ track.album }}</p>
                </div>
            </div>
        </section>
        <AudioPlayer ref="audioPlayerRef" />
    </div>
</template>

<style scoped>
.search-page {
    padding: 5%;
}
input {
    width: 90%;
    padding: 10px;
    font-size: 16px;
    margin-bottom: 20px;
}
button {
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>
  