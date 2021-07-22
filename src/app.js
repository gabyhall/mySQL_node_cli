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
const { updateMovie } = require('./utils');

const { deleteMovie } = require('./utils');
const command = process.argv[2];
const user = yargs.argv.user;
const pass = yargs.argv.pass;
const title = yargs.argv.title;
const actor = yargs.argv.actor;
const watched = yargs.argv.watched;
const rating = yargs.argv.rating;
const newPass = yargs.argv.newPass;
const newName = yargs.argv.new;

const app = () => {
    if (command === 'add user') {
        addUser(user, pass);
    } else if (command === 'list users') {
        listUsers();                    //shows all users//
    } else if (command === 'find user') {
        findUser(user, pass);              //searches for specified user//
    } else if (command === 'update user') {
        updateUser(user, newName);
    } else if (command === 'update password') {
        updatePass(user, newPass);
    } else if (command === 'delete user') {
        deleteUser(user, pass);
    } else if (command === 'add movie') {
        addMovie(title, actor, user);
    } else if (command === 'list movies') {
        listMovies();
    } else if (command === 'update movie') {
        //update movie function here - watched status - add another for rating//
        updateMovie(user, title);
    } else if (command === 'rate') {
        //rate movie function here
    } else if (command === 'delete movie') {
        deleteMovie(user, title);
    }
};

app();