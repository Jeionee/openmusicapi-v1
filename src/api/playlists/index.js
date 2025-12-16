const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'playlists',
    register: async (server, { service, songService, validator, playlistSongValidator }) => {
        const handler = new PlaylistsHandler(service, songService, validator, playlistSongValidator);
        server.route(routes(handler));
    },
};
