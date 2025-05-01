import { useState } from "react";
import { toast } from 'react-toastify';
import { api } from "../shared/api-fetch";
import { useUrls } from "../store/urls";
import { Button } from "./ui/button";
import { Header } from "./ui/header";
import { Input } from "./ui/input";

export function NewUrl() {
	const [originalUrl, setOriginalUrl] = useState("");
	const [compactUrl, setCompactUrl] = useState("");

	const { addUrl } = useUrls();

	const [isLoading, setIsLoading] = useState(false);

	const submitNewUrl = async () => {
		setIsLoading(true);

		const finalOriginalUrl = originalUrl.startsWith("https://")
			? originalUrl
			: `https://${originalUrl}`;

		setOriginalUrl(finalOriginalUrl);

		try {
			const response = await api.post("/save-url", {
				originalUrl: finalOriginalUrl,
				compactUrl,
			});
			if (response.status === 201) {
				const savedUrl = await api.get(`/find-url/${response.data.urlId}`);

				if (savedUrl.data) {
					addUrl({
						id: response.data.urlId,
						...savedUrl.data,
					});
				}
				toast("URL salva com sucesso", { type: "success", });

			}
		} catch (error) {
			if ((error as { status: number }).status === 400) {
				toast("URL inválida", { type: "warning" });
			} else if ((error as { status: number }).status === 409) {
				toast("URL já cadastrada", { type: "warning" });
			} else {
				toast("Erro ao salvar URL", { type: "error" });
			}
		}

		setOriginalUrl("");
		setCompactUrl("");

		setIsLoading(false);
	}

	return (
		<div className="flex flex-col gap-2 max-w-[366px] md:max-w-[380px] w-full">
			<div className="flex flex-col bg-gray-100 h-[340px] rounded-2xl p-6 md:p-8 justify-between">
				<Header title="Novo link" />
				<Input
					label="link original"
					type="text"
					placeholder="www.exemplo.com.br"
					value={originalUrl}
					onChange={setOriginalUrl}
				/>
				<Input
					label="link encurtado"
					type="text"
					fixedPrefix="brev.ly/"
					value={compactUrl}
					onChange={setCompactUrl}
				/>
				<Button
					variant="primary"
					size="large"
					label="Salvar link"
					onClick={submitNewUrl}
					disabled={isLoading}
				/>
			</div>
		</div>
	);
}
