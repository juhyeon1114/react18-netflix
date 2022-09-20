export const requests = {
    getVideos: (id) => (`/movie/${id}/videos`),
    fetchNowPlaying: '/movie/now_playing',
    fetchNetflixOriginals: '/discover/tv?with_networks=213',
    fetchTrending: '/trending/all/week',
    fetchTopRated: '/movie/top_rated',
    fetchActionMovies: '/discover/movie?with_genre=28',
    fetchComedyMovies: '/discover/movie?with_genre=35',
    fetchHorrorMovies: '/discover/movie?with_genre=27',
    fetchRomanceMovies: '/discover/movie?with_genre=10749',
    fetchDocumentaries: '/discover/movie?with_genre=99',
}
