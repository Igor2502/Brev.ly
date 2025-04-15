export class UrlAlreadyExists extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UrlAlreadyExists";
	}
}
