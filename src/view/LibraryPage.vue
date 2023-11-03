<script>
import AudioPlayer from '../components/AudioPlayer.vue';
import { mapState, mapActions } from 'vuex';
export default {
    components:{
        AudioPlayer,
    },
    data() {
        return {
        };
    },
    computed: {
    ...mapState(['library']),
    },
    methods: {
        playTrack(track) {
            this.$refs.audioPlayerRef.isPlaying = true;
            this.$refs.audioPlayerRef.startPlayback(track);
        },
        ...mapActions(['removeTrackFromLibrary']),
        removeTrack(index) {
            this.removeTrackFromLibrary(index);
        },
    },
};
</script>

<template>
    <div class="library-page w-full">
        <ul>
            <li class="bg-gray-900 rounded p-2 justify-between" v-for="(track, index) in library" :key="index">
                <div class="track-info">
                <img :src="track.image" alt="Album Cover" />
                <div>
                    <h2>{{ track.title }}</h2>
                    <p>{{ track.artist }}</p>
                </div>
                </div>
                <div>
                    <button @click="playTrack(track)">
                        <svg data-v-a2f28f11="" xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-play-circle-fill" viewBox="0 0 16 16">
                            <path data-v-a2f28f11="" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"></path>
                        </svg>
                    </button>
                    <button @click="removeTrack(index)">
                        <svg fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40" stroke="#ffffff" viewBox="0 0 24 24">
                            <path d="M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path> 
                        </svg>
                    </button>
                </div>
            </li>
        </ul>
        <AudioPlayer ref="audioPlayerRef"/>
    </div>
</template>

<style scoped>
.library-page {
padding: 20px;
}
h1 {
font-size: 24px;
margin-bottom: 20px;
}
ul {
list-style: none;
padding: 0;
}
li {
display: flex;
align-items: center;
justify-content: space-between;
margin-bottom: 20px;
}
.track-info {
display: flex;
align-items: center;
}
.track-info img {
width: 60px;
height: 60px;
margin-right: 20px;
}
.track-info h2 {
font-size: 16px;
margin: 0;
}
.track-info p {
font-size: 14px;
margin: 0;
}
</style>
  