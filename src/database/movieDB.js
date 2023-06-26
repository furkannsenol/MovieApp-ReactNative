import SQLite from 'react-native-sqlite-storage';

//SQLite.enablePromise(true);

const databaseName = 'Movie.db';
const databaseVersion = '1.0';
const databaseDisplayName = 'Movie Database';
const databaseSize = -1;

const db = SQLite.openDatabase({
    name: databaseName,
    location: 'default',
    //createFromLocation: '~www/Movie.db',
    version: databaseVersion,
    displayName: databaseDisplayName,
    size: databaseSize,
});
//PRIMARY KEY
const createFavoriteTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {//SQLite run
            tx.executeSql(//SQL query run
                `CREATE TABLE IF NOT EXISTS tblFavorite (
                    id INTEGER,
                    title TEXT,
                    overview TEXT,
                    backdrop_path BLOB,
                    poster_path TEXT,
                    release_date TEXT,
                    vote_average REAL,
                    add_date DATETIME DEFAULT CURRENT_TIMESTAMP
                    )`,
                [],
                () => resolve(),
                (_, error) => reject(error)
            );
        });
    });
};

const insertFavorite = (id, title, overview, backdrop_path, poster_path, release_date, vote_average) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'INSERT INTO tblFavorite (id, title, overview, backdrop_path, poster_path, release_date, vote_average) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [id, title, overview, backdrop_path, poster_path, release_date, vote_average],
                (_, result) => resolve(result.insertId),
                (_, error) => reject(error)
            );
        });
    });
};

const getAllFavorites = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM tblFavorite ORDER BY add_date DESC',
                [],
                (_, { rows }) => {
                    const favorites = [];
                    for (let i = 0; i < rows.length; i++) {
                        favorites.push(rows.item(i));
                    }
                    resolve(favorites);
                },
                (_, error) => reject(error)
            );
        });
    });
};

const deleteFavoriteTable = () => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {//SQLite run
            tx.executeSql(//SQL query run
                `DROP TABLE tblFavorite`,
                [],
                () => resolve(),
                (_, error) => reject(error)
            );
        });
    });
}

const deleteFavorite = (id) => {
    return new Promise((resolve, reject) => {
        db.transaction((tx) => {//SQLite run
            tx.executeSql(//SQL query run
                `DELETE FROM tblFavorite WHERE id = ?`,
                [id],
                (_, result) => {
                    const affectedRows = result.rowsAffected;
                    resolve(affectedRows);
                },
                (_, error) => reject(error)
            );
        });
    });
}


export const database = {
    createFavoriteTable,
    insertFavorite,
    getAllFavorites,
    deleteFavoriteTable,
    deleteFavorite
};
