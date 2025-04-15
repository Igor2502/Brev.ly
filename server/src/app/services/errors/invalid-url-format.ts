export class InvalidUrlFormat extends Error {
	constructor(message: string) {
		super(message);
		this.name = "InvalidUrlFormat";
	}
}
