const connection = require('../db/connection');
const sql = require('../db/connection');

exports.addUser = (username, password) => {
    try {
        const user = {
            username: username,
            pass: password
        }
        sql.query("INSERT INTO users SET ?", user)
        console.log('User added');
        connection.end();
    } catch (error) {
        console.log(error)
    }
};

exports.listUsers = () => {
 sql.query("SELECT * FROM users", (error, results) => {
        if (error) {
            console.log(error);
        } console.log(results);
        connection.end();
    })
};


exports.findUser = (username, password) => {
    const user = {
        username: username,
        pass: password,
    }
    sql.query("SELECT * FROM users WHERE username=?", user.username, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
        connection.end();
    });
};
    
exports.updateUser = (username, newName) => {
    const user = {
        username: username
    }
    sql.query("UPDATE users SET username=? WHERE username=?", [newName, user.username], (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
            console.log('Username updated');
            connection.end();
    }) 
 };  
    
exports.updatePass = (username, newPass) => {
    const user = {
        username: username
    }
    sql.query("UPDATE users SET pass=? WHERE username=?", [newPass, user.username], (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
            console.log('Password updated');
            connection.end();
    })
};

exports.deleteUser = (username, pass) => { //password check//
    const user = [username, pass]
    sql.query("DELETE FROM movies WHERE userID = (SELECT id from users WHERE username = ? AND pass = ?)", user)
    sql.query("DELETE FROM users WHERE username=?", user, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
            console.log('User deleted');
            connection.end();
    })
};
    

exports.addMovie = (user, pass, title, actor, category) => { //password check//
    const movie = [title, actor, category, user, pass];
    sql.query("INSERT INTO movies SET title = ?, actor = ?, category = ?, userID = (SELECT id from users WHERE username = ? AND pass = ?)", movie, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
        console.log('Movie added to list');
        connection.end();
    })
};

exports.listMovies = () => {
    sql.query("SELECT * FROM movies", (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
        connection.end();
    })
};

exports.findMovie = (user, pass, title) => { //password check //
    const movie = [title, user, pass]
    sql.query("SELECT * FROM movies WHERE title = ? AND userID = (SELECT id from users WHERE username = ? AND pass = ?)", movie, (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
        connection.end();
    })
};

exports.updateMovie = (user, title) => {
    const movie = [title, user];
    sql.query("UPDATE movies SET watched = 'true' WHERE title = ? AND userID = (SELECT id from users WHERE username = ?)", movie,  (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
            console.log('Movie status updated to watched');
            connection.end();
    });
};

exports.rateMovie = (user, title, rating) => {
    const movie = [rating, title, user];
    sql.query("UPDATE movies SET rating = ? WHERE title = ? AND userID = (SELECT id from users WHERE username = ?)", movie, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
            console.log('Movie rating updated');
            connection.end();
    }) 
};

exports.deleteMovie = (user, pass, title) => { //password check//
    const movie = [title, user, pass];
    sql.query("DELETE FROM movies WHERE title = ? AND userID = (SELECT id from users WHERE username = ? AND pass = ?)", movie, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
            console.log('Movie deleted from list');
            connection.end();
    })
};


exports.child = () => {
    sql.query("SELECT *, CASE WHEN category = 'horror' THEN 'this is definitely not for kids' WHEN category = 'thriller' THEN 'this is probably not for kids' WHEN category = 'musical' THEN 'this might be appropriate for kids' WHEN category = 'animation' THEN 'this is probably child-friendly' ELSE 'child-friendliness unknown' END AS children FROM movies", (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
        connection.end();
    })
};

exports.averageCat = (user, category) => {
    const calc = [category, user];
    sql.query("SELECT AVG(rating) FROM movies WHERE category = ? AND watched = 'true' AND userID = (SELECT id FROM users WHERE username = ?)", calc, (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
        connection.end();
    })
};

exports.showRatings = () => {
    sql.query("SELECT users.username, movies.title, movies.actor, movies.rating FROM users INNER JOIN movies ON movies.userID = users.id WHERE movies.rating IS NOT NULL AND movies.actor IS NOT NULL", (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
        connection.end();
    })
};

exports.showCatWatched = () => {
    sql.query("SELECT users.username, movies.title, movies.category, movies.watched FROM users INNER JOIN movies ON movies.userID = users.id", (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
        connection.end();
    })
};