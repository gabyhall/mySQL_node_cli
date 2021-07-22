const sql = require('../db/connection');

exports.addUser = (username, password) => {
    try {
        const user = {
            username: username,
            pass: password
        }
        sql.query("INSERT INTO users SET ?", user)
    } catch (error) {
        console.log(error)
    }
};

exports.listUsers = () => {
 sql.query("SELECT * FROM users", (error, results) => {
        if (error) {
            console.log(error);
        } console.log(results);
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
    })
};

exports.deleteUser = (username, pass) => { //password check//
    const user = [username, pass]
    sql.query("DELETE FROM movies WHERE userID = (SELECT id from users WHERE username = ? AND pass = ?)", user)
    sql.query("DELETE FROM users WHERE username=?", user, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
    })
};
    



exports.addMovie = (title, actor, category, user, pass) => { //password check//
    const movie = [title, actor, category, user, pass];
    sql.query("INSERT INTO movies SET title = ?, actor = ?, category = ?, userID = (SELECT id from users WHERE username = ? AND pass = ?)", movie, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
    })
};

exports.listMovies = () => {
    sql.query("SELECT * FROM movies", (error, results) => {
        if (error) {
            console.log(error);
        } console.log(results);
    })
};

exports.findMovie = (user, pass, title) => { //password check //
    const movie = [title, user, pass]
    sql.query("SELECT * FROM movies WHERE title = ? AND userID = (SELECT id from users WHERE username = ? AND pass = ?)", movie, (error, results) => {
        if (error) {
            console.log(error);
        } console.log(results);
    })
};

exports.updateMovie = (user, title) => {
    const movie = [title, user];
    sql.query("UPDATE movies SET watched = 'true' WHERE title = ? AND userID = (SELECT id from users WHERE username = ?)", movie,  (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
    });
};

exports.rateMovie = (user, title, rating) => {
    const movie = [rating, title, user];
    sql.query("UPDATE movies SET rating = ? WHERE title = ? AND userID = (SELECT id from users WHERE username = ?)", movie, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
    })
};

exports.deleteMovie = (user, pass, title) => { //password check//
    const movie = [title, user, pass];
    sql.query("DELETE FROM movies WHERE title = ? AND userID = (SELECT id from users WHERE username = ? AND pass = ?)", movie, (error, result) => { 
        if (error) {
            console.log(error);
        } console.log(result);
    })
};


exports.child = () => {
    sql.query("SELECT *, CASE WHEN category = 'horror' THEN 'this is definitely not for kids' WHEN category = 'thriller' THEN 'this is probably not for kids' WHEN category = 'musical' THEN 'this might be appropriate for kids' WHEN category = 'animation' THEN 'this is probably child-friendly' ELSE 'child-friendliness unknown' END AS children FROM movies", (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
    })
};

exports.averageCat = (user, category) => {
    const calc = [category, user];
    sql.query("SELECT AVG(rating) FROM movies WHERE category = ? AND watched = 'true' AND userID = (SELECT id FROM users WHERE username = ?)", calc, (error, result) => {
        if (error) {
            console.log(error);
        } console.log(result);
    })
};