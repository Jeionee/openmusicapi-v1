const handler = require("./albumsHandler");
const routes = (handler) => [
    {
        method: 'POST',
        path: '/albums',
        handler: handler.postAlbumsHandler,
    },
    {
        method: 'GET',
        path: '/albums/{id}',
        handler: handler.getAlbumsByIdHandler,
    },
    {
        method: 'PUT',
        path: '/albums/{id}',
        handler: handler.editAlbumsByIdHandler,
    },
    {
        method: 'DELETE',
        path: '/albums/{id}',
        handler: handler.deleteAlbumsByIdHandler,
    },
];

module.exports = routes;