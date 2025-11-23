const mapDBToModel = ({ id, name, year }) => ({
    id,
    name,
    year,
});

const mapDBSongs = ({
    id, title, year, performer, genre, duration, albumId,
}) => ({
    id,
    title,
    year,
    performer,
    genre,
    duration,
    albumId,
});

module.exports ={ mapDBToModel, mapDBSongs };