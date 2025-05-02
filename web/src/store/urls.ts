import { enableMapSet } from "immer";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { api } from "../shared/api-fetch";

export type Url = {
	id: string;
	originalUrl: string;
	compactUrl: string;
	createdAt: string;
	accessCount: number;
};

type UrlState = {
	urls: Map<string, Url>;
	addUrl: (url: Url) => void;
	deleteUrl: (urlId: string) => void;
	loadUrls: () => Promise<void>;
};

enableMapSet();

export const useUrls = create<UrlState, [["zustand/immer", never]]>(
	immer((set) => {
		function addUrl(url: Url) {
			set((state) => {
				state.urls.set(url.id, url);
			});
		}

		function deleteUrl(urlId: string) {
			set((state) => {
				state.urls.delete(urlId);
			});
		}

		async function loadUrls() {
			const response = await api.get("/list-urls");
			set((state) => {
				for (const url of response.data) {
					state.urls.set(url.id, url);
				}
			});
		}

		return {
			urls: new Map<string, Url>(),
			addUrl,
			deleteUrl,
			loadUrls,
		};
	}),
);
