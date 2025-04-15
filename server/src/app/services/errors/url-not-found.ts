export class UrlNotFound extends Error {
	constructor(message: string) {
		super(message);
		this.name = "UrlNotFound";
	}
}
