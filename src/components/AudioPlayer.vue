<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            isPaused: false,
            currentTime: '0:00',
            duration: '0:00',
            progress: 0,
            isPlaying: false,
            volume: 0.1,
            isInLibrary: false,
        };
    },
    computed: {
    ...mapState(['currentTrack']),
    ...mapState(['library']),
    },
    methods: {
        togglePlay() {
            let audio = document.getElementById('myAudio');
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
            let audio = document.getElementById('myAudio');
            if (audio) {
                audio.volume = this.volume;
            }
        },
        formatTime(time) {
            let minutes = Math.floor(time / 60);
            let seconds = Math.floor(time % 60);
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
        ...mapActions(['setCurrentTrack']),
        startPlayback(track) {
            let audioPlayer = this.$refs.audioPlayer;
            if (!audioPlayer.paused) {
                audioPlayer.pause();
            }
            audioPlayer.src = track.sound;
            audioPlayer.play();
            this.isPlaying = true;
            this.currentTrack = track;
            this.setCurrentTrack(track);
            this.isInLibrary = this.isTrackInLibrary(this.library, track);
        },
        stopPlayback() {
            let audioPlayer = this.$refs.audioPlayer;
            audioPlayer.pause();
            this.isPlaying = false;
        },
        rewindBackward(){
            let audioPlayer = this.$refs.audioPlayer;
            if (audioPlayer) {
                audioPlayer.currentTime -= 10;
            }
        },
        rewindForward(){
            let audioPlayer = this.$refs.audioPlayer;
            if (audioPlayer) {
                audioPlayer.currentTime += 10;
            }
        },
        ...mapActions(['addTrackToLibrary']),
        ...mapActions(['removeTrackFromLibrary']),
        toggleLibraryStatus(track) {
            this.isInLibrary = !this.isInLibrary;
            let index = this.findTrackIndexInLibrary(track);
            if (this.isInLibrary) {
                this.addTrackToLibrary(track);
            } else {
                if (index !== -1) {
                    this.removeTrackFromLibrary(index);
                }
            }
        },
        isTrackInLibrary(library, track) {
            return library.some((libraryTrack) => libraryTrack.sound === track.sound);
        },
        findTrackIndexInLibrary(track) {
            return this.library.findIndex((libraryTrack) => libraryTrack.sound === track.sound);
        },
    },
    watch: {
        isPlaying(newVal) {
            if (newVal) {
                let audio = document.getElementById('myAudio');
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
    <div class="fixed bottom-0 left-0 w-full z-10 bg-gray-900 shadow-lg" v-show="isPlaying">
        <button @click="stopPlayback" class="absolute right-0 bottom-14" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </button>
        <div class="flex w-full justify-between">
            <div class="flex items-center mt-2 pl-4 pr-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-2 hover:scale-125" @click="rewindBackward">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 hover:scale-125" @click="togglePlay">
                    <path v-if="!isPaused" stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                    <path v-else stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ml-2 hover:scale-125" @click="rewindForward">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l6-6m0 0l-6-6m6 6H9a6 6 0 000 12h3" />
                </svg>
            </div>
            <div class="w-full mx-8 py-3">
                <div class="flex justify-between text-white">
                    <div class="flex items-center">
                        <div class="text-white text-[14px] font-[300] ml-3">{{ currentTrack  ? currentTrack.artist : '-' }}</div>
                        <div class="text-white text-[14px] font-[300] ml-3">{{ currentTrack  ? currentTrack.title : '-' }}</div>
                    </div>
                    <div class="flex">
                        <button @click="toggleLibraryStatus(currentTrack)" class="hover:text-gray-400 mr-2 w-6 h-6">
                            <svg v-if="isInLibrary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                            </svg>
                            <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                        </button>
                        <div class="group cursor-pointer">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 group-hover:text-gray-400">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                            </svg>
                            <div class="relative right-14 bottom-8 opacity-0 group-hover:opacity-100 w-16 -mt-3">
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
                        </div>
                    </div>
                </div>
                <div class="flex justify-between text-sm text-grey-darker">
                    <p>{{ currentTime }}</p>
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
    </div>
</template>

<style scoped>
</style>
  