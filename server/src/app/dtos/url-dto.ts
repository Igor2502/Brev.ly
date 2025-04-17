export interface UrlDTOProps {
	id?: string;
	originalUrl: string;
	compactUrl: string;
	createdAt: Date;
}

export default class UrlDTO {
	public readonly id?: string;
	public readonly originalUrl: string;
	public readonly compactUrl: string;
	public readonly createdAt: Date;

	constructor(props: UrlDTOProps) {
		this.id = props.id;
		this.originalUrl = props.originalUrl;
		this.compactUrl = props.compactUrl;
		this.createdAt = props.createdAt;
	}
}
