const routes = require('./albumsRoutes');
const AlbumsHandler = require('./albumsHandler');

module.exports = {
    name: 'albums',
    version: '1.0.0',
    register: async (server, { service, songsService, validator }) => {
        const albumsHandler = new AlbumsHandler(service, songsService, validator);
        server.route(routes(albumsHandler));
    },
};