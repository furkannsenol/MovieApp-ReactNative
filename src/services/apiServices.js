import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = '17bcaf6d3a99f8967c98606b11d56a0d'

export const PopularMovieApiService = async (pageNumber) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNumber}`)
        return response.data
    } catch (error) {
        throw new Error('API Hatasi:', error)
    }
}

export const RecentMovieApiService = async (pageNumber) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${pageNumber}`)
        return response.data
    } catch (error) {
        throw new Error('API Hatasi:', error)
    }
}

export const GenreApiService = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
        return response.data
    } catch (error) {
        throw new Error('API Hatasi:', error)
    }
}

export const TeaserTrailerApiService = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`)
        return response.data
    } catch (error) {
        throw new Error('API Hatasi:', error)
    }
}

export const SearchMovieApiService = async (query, pageNumber) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}&page=${pageNumber}`)
        return response.data
        
    } catch (error) {
        throw new Error('API Hatasi:', error)
    }
}