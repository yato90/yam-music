<script>
export default {
    data() {
        return {
            isPaused: false,
            currentTime: '0:00',
            duration: '0:00',
            progress: 0,
            isPlaying: false,
            volume: 0.1,
        };
    },
    methods: {
        togglePlay() {
            const audio = document.getElementById('myAudio'); // Получаем аудио-элемент
            if (audio) {
                if (this.isPaused) {
                    audio.play();
                } else {
                    audio.pause();
                }
                this.isPaused = !this.isPaused;
            }
        },
        adjustVolume() {
            const audio = document.getElementById('myAudio');
            if (audio) {
                audio.volume = this.volume;
            }
        },
        formatTime(time) {
            const minutes = Math.floor(time / 60);
            const seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        startPlayback(track) {
            const audioPlayer = this.$refs.audioPlayer;
            if (!audioPlayer.paused) {
                audioPlayer.pause();
            }
            audioPlayer.src = track.sound;
            audioPlayer.play();
            this.isPlaying = true;
        },
        stopPlayback() {
            const audioPlayer = this.$refs.audioPlayer;
            audioPlayer.pause();
            this.isPlaying = false;
        },
    },
    watch: {
        isPlaying(newVal) {
            if (newVal) {
                const audio = document.getElementById('myAudio');
                if (audio) {
                    audio.addEventListener('timeupdate', () => {
                        this.currentTime = this.formatTime(audio.currentTime);
                        this.duration = this.formatTime(audio.duration);
                        this.progress = (audio.currentTime / audio.duration) * 100;
                    });
                }
            }
        },
    },
};

</script>

<template>
    <div class="fixed bottom-0 left-0 w-full z-10 bg-gray-950 shadow-lg rounded-lg" v-show="isPlaying">
        <button @click="stopPlayback" class="absolute right-0 bottom-24" type="button">
            <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="35px" height="35px" viewBox="0 0 24 24">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 22C7.28595 22 4.92893 22 3.46447 20.5355C2 19.0711 2 16.714 2 12C2 7.28595 2 4.92893 3.46447 3.46447C4.92893 2 7.28595 2 12 2C16.714 2 19.0711 2 20.5355 3.46447C22 4.92893 22 7.28595 22 12C22 16.714 22 19.0711 20.5355 20.5355C19.0711 22 16.714 22 12 22ZM8.96965 8.96967C9.26254 8.67678 9.73742 8.67678 10.0303 8.96967L12 10.9394L13.9696 8.96969C14.2625 8.6768 14.7374 8.6768 15.0303 8.96969C15.3232 9.26258 15.3232 9.73746 15.0303 10.0303L13.0606 12L15.0303 13.9697C15.3232 14.2625 15.3232 14.7374 15.0303 15.0303C14.7374 15.3232 14.2625 15.3232 13.9696 15.0303L12 13.0607L10.0303 15.0303C9.73744 15.3232 9.26256 15.3232 8.96967 15.0303C8.67678 14.7374 8.67678 14.2626 8.96967 13.9697L10.9393 12L8.96965 10.0303C8.67676 9.73744 8.67676 9.26256 8.96965 8.96967Z" fill="#ffffff"></path> 
            </svg>
        </button>
        <div class="flex">
            <div class="w-full">
                <div class="flex justify-center items-center mt-2 pl-4 pr-4">
                    <div class="text-white rounded-full bg-red-light shadow-lg">
                        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" @click="togglePlay">
                            <path v-if="!isPaused" d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"></path>
                            <path v-else d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z"></path>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-8 py-3">
            <div class="flex justify-between text-sm text-grey-darker">
                <p>{{ currentTime }}</p>
                <div class="volume-control">
                    <input
                id="volume"
                type="range"
                min="0"
                max="1"
                step="0.1"
                v-model="volume"
                @input="adjustVolume"
                >
                </div>
                <p>{{ duration }}</p>
            </div>
            <div class="mt-1">
                <audio id="myAudio" ref="audioPlayer"></audio>
                <div class="h-1 rounded-full flex">
                    <div :style="{ width: progress + '%' }" class="h-1 bg-white rounded-full relative">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
  