const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
    name: 'playlists',
    register: async (server, { service, validator, playlistSongValidator }) => {
        const handler = new PlaylistsHandler(service, validator, playlistSongValidator);
        server.route(routes(handler));
    },
};
