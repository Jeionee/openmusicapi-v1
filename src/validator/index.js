const InvariantError = require('../exceptions/InvariantError');
const { AlbumSchema, SongSchema } = require('./schema');

const AlbumValidator = {
    validateAlbumPayload: (payload) => {
        const validationResult = AlbumSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

const SongValidator = {
    validateSongPayload: (payload) => {
        const validationResult = SongSchema.validate(payload);
        if (validationResult.error) {
            throw new InvariantError(validationResult.error.message);
        }
    },
};

module.exports = { AlbumValidator, SongValidator };