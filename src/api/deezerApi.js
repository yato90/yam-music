import axios from 'axios';

export async function searchTracks(query) {
  try {
    const options = {
      method: 'GET',
      url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
      params: {
        q: query,
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
        // Создаем объекты track на основе данных из ответа API
        const searchResults = response.data.data.map(apiTrack => {
            return {
            title: apiTrack.title,
            artist: apiTrack.artist.name,
            album: apiTrack.album.title,
            image: apiTrack.album.cover_medium,
            sound: apiTrack.preview,
            };
        });
        return searchResults;
    }
    return [];
  } catch (error) {
    console.error('Произошла ошибка при выполнении запроса:', error);
    throw error;
  }
};
