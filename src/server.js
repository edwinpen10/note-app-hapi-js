require('dotenv').config();

const Hapi = require('@hapi/hapi');
//const routes = require('./routes');
const notes = require('./api/notes');
//const NotesService = require('./services/inMemory/NotesService');
const NotesService = require('./services/postgres/NotesService');
const NotesValidator = require('./validator/notes');

// users
const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const init = async () => {

  const notesService = new NotesService();
  const usersService = new UsersService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

 //server.route(routes);

 await server.register([
      {
          plugin: notes,
          options: {
            service: notesService,
            validator: NotesValidator,
          },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
 ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
