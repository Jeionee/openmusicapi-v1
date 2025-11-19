const handler = require("./songsHandler");
const routes = (handler) => [
    {
        method: "POST",
        path: "/songs",
        handler: handler.addSongsHandler,
    },
    {
        method: "GET",
        path: "/songs",
        handler: handler.getSongsHandler,
    },
    {
        method: "GET",
        path: "/songs/{id}",
        handler: handler.getSongsByIdHandler,
    },
    {
        method: "PUT",
        path: "/songs/{id}",
        handler: handler.editSongsByIdHandler,
    },
    {
        method: "DELETE",
        path: "/songs/{id}",
        handler: handler.deleteSongsByIdHandler,
    },
];

module.exports = routes;