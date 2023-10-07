<script>
import axios from 'axios';
import AudioPlayer from './AudioPlayer.vue';
import { mapActions } from 'vuex';
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
                const options = {
                    method: 'GET',
                    url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
                    params: {
                        q: this.searchQuery,
                    },
                    headers: {
                        'X-RapidAPI-Key': 'f87092e2femsh3b978dae1f56965p16a01ejsnb3a15f97ba03',
                        'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
                    },
                };
                // Выполняем запрос к Deezer API с использованием axios и Rapid API
                const response = await axios.request(options);
                // Обработка результатов поиска
                if (response.data && response.data.data && response.data.data.length > 0) {
                    this.searchResults = response.data.data;
                }
                // Создаем объекты track на основе данных из ответа API
                this.searchResults = response.data.data.map(apiTrack => {
                    return {
                        title: apiTrack.title,
                        artist: apiTrack.artist.name,
                        album: apiTrack.album.title,
                        image: apiTrack.album.cover_medium,
                        sound: apiTrack.preview,
                    };
                });
            } catch (error) {
                console.error('Произошла ошибка при выполнении запроса:', error);
            } finally {
                this.isLoading = false;
            }
        },
        playTrack(track) {
            this.$refs.audioPlayerRef.isPlaying = true;
            this.$refs.audioPlayerRef.startPlayback(track);
        },
        ...mapActions(['addTrackToLibrary']),
        addToLibrary(track) {
            this.addTrackToLibrary(track);
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
                        </svg>
                        </button>
                        <button @click="addToLibrary(track)" class="hover:scale-110 opacity-0 transform translate-y-3 group-hover:translate-y-0 group-hover:opacity-100 transition">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                            <path d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
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
  