class AlbumsHandler {
	constructor(service, songsService, validator) {
		this._service = service;
		this._songsService = songsService;
		this._validator = validator;

		this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
		this.getAlbumsByIdHandler = this.getAlbumsByIdHandler.bind(this);
		this.editAlbumsByIdHandler = this.editAlbumsByIdHandler.bind(this);
		this.deleteAlbumsByIdHandler = this.deleteAlbumsByIdHandler.bind(this);
	}

	async postAlbumsHandler(request, h) {
		await this._validator.validateAlbumPayload(request.payload);
		const { name, year } = request.payload;

		const albumId = await this._service.addAlbum({ name, year });

		const response = h.response({
			status: "success",
			message: "Album berhasil ditambahkan",
			data: {
				albumId,
			},
		});
		response.code(201);
		return response;
	}

	async getAlbumsByIdHandler(request, h) {
		const { id } = request.params;
		const album = await this._service.getAlbumById(id);

		const songs = await this._songsService.getSongsByAlbumId(id);

		return {
			status: "success",
			data: {
				album: {
					...album,

					songs: songs.map(song => ({
						id: song.id,
						title: song.title,
						performer: song.performer,
					})),
				}
			}
		};
	}

	async editAlbumsByIdHandler(request, h) {
		await this._validator.validateAlbumPayload(request.payload);
		const { id } = request.params;
		const { name, year } = request.payload;

		await this._service.editAlbumById(id, { name, year });

		return {
			status: "success",
			message: "Album berhasil diperbarui",
		};
	}

	async deleteAlbumsByIdHandler(request, h) {
		const { id } = request.params;
		await this._service.deleteAlbumById(id);

		return {
			status: "success",
			message: "Album berhasil dihapus",
		};
	}
}

module.exports = AlbumsHandler;
