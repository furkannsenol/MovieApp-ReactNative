import { database } from "../database/movieDB";

export const FavoriteDBService = {
    insertFavorite: async (id, title, overview, backdrop_path, poster_path, release_date, vote_average) => {
        try {
            await database.createFavoriteTable();
            const favoriteId = await database.insertFavorite(id, title, overview, backdrop_path, poster_path, release_date, vote_average);
            //console.log(favoriteId)
            return favoriteId;
        } catch (error) {
            console.error('Failed to insert favorite:', error);
            throw new Error('Failed to insert favorite');
        }
    },
    getAllFavorites: async () => {
        try {
            const favorite = await database.getAllFavorites();
            return favorite;
        } catch (error) {
            return null
        }
    },
    deleteFavoriteTable: async () => {
        try {
            await database.deleteFavoriteTable();

        } catch (error) {
            throw new Error('Failed to delete table favorite');
        }
    },
    deleteFavorite: async (id) => {
        try {
            const affectedRows = await database.deleteFavorite(id)
            //console.log(favoriteId)
            return affectedRows;
        } catch (error) {
            throw new Error('Failed to delete data favorite');
        }
    }
};