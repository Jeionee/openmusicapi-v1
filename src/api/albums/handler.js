class AlbumsHandler {
	constructor(service, validator) {
		this._service = service;
		this._validator = validator;

		this.postAlbumHandler = this.postAlbumHandler.bind(this);
		this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
		this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
		this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
	}

	postAlbumHandler = async (request, h) => {
		try {
			const { name, year } = request.payload;
			this._validator.validateAlbumPayload(request.payload);
			const albumId = await this._service.addAlbum({ name, year });

			return h.response({
				status: 'success',
				message: 'Album berhasil ditambahkan',
				data: { albumId },
			}).code(201);
		} catch (error) {
			if (error instanceof InvariantError) {
				return h.response({
					status: 'fail',
					message: error.message,
				}).code(400);
			}
			return h.response({
				status: 'error',
				message: 'Internal Server Error',
			}).code(500);
		}
	};


	async getAlbumByIdHandler(request) {
		const { id } = request.params;
		const albums = await this._service.getAlbumById(id);
		const songs = await this._service.getSongByAlbumId(id);

		return {
			status: 'success',
			data: {
				album: {
					...albums,
					songs,
				},
			},
		};
	}

	async putAlbumByIdHandler(request) {
		this._validator.validateAlbumPayload(request.payload);
		const { id } = request.params;

		const album = await this._service.editAlbumById(id, request.payload);
		return {
			status: 'success',
			message: "Album berhasil diperbarui berdasarkan id album",
			data: { album },
		};
	}

	async deleteAlbumByIdHandler(request) {
		const { id } = request.params;

		await this._service.deleteAlbumById(id);

		return {
			status: 'success',
			message: 'Album berhasil dihapus',
		};
	}
}

module.exports = AlbumsHandler;