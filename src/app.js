require('./db/connection');
const yargs = require('yargs');
const { addUser } = require('./utils');
const { listUsers } = require('./utils');
const { findUser } = require('./utils');
const { updateUser } = require('./utils');
const { updatePass } = require('./utils');
const { deleteUser } = require('./utils');
const { addMovie } = require('./utils');
const { listMovies } = require('./utils');
const { findMovie } = require('./utils');
const { updateMovie } = require('./utils');
const { rateMovie } = require('./utils');
const { deleteMovie } = require('./utils');
const { child }  = require('./utils');
const { averageCat } = require('./utils');
const { showRatings } = require('./utils');
const { showCatWatched } = require('./utils');
const command = process.argv[2];
const user = yargs.argv.user;
const pass = yargs.argv.pass;
const title = yargs.argv.title;
const actor = yargs.argv.actor;
const category = yargs.argv.category;
const rating = yargs.argv.rating;
const newPass = yargs.argv.newPass;
const newName = yargs.argv.newName;

const app = () => {
    if (command === 'add user') {
        addUser(user, pass);
    } else if (command === 'list users') {
        listUsers();                        //shows all users//
    } else if (command === 'find user') {
        findUser(user, pass);              //searches for specified user//
    } else if (command === 'update user') {
        updateUser(user, newName);
    } else if (command === 'update password') {
        updatePass(user, newPass);            
    } else if (command === 'delete user') {
        deleteUser(user, pass);             // requires password//
    } else if (command === 'add movie') {
        addMovie(user, pass, title, actor, category); // requires password//
    } else if (command === 'list movies') { 
        listMovies();
    } else if (command === 'find movie') {
        findMovie(user, pass, title);        // requires password//
    } else if (command === 'update movie') { 
        updateMovie(user, title);           //updates watched to true//
    } else if (command === 'rate') {
        rateMovie(user, title, rating);
    } else if (command === 'delete movie') { 
        deleteMovie(user, pass, title);        // requires password//
    } else if (command === 'child friendly') {
        child();                               // case statement - advises child-friendliness of films based on category //
    } else if (command === 'average') {
        averageCat(user, category);       //shows a specified user's average rating for film's they've watched in a specified category //
    } else if (command === 'show actor ratings') {
        showRatings();                      // join - shows username, title, actor & rating - to see which actors were most in popular films //
    } else if (command === 'show categories watched') {
        showCatWatched();                   // join - shows username, title, category & watched - to see which categories are being watched & which are just being added to lists but not watched & by which user //
    }
};

app();