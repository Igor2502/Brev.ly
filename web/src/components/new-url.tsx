import { Button } from "./ui/button";
import { Header } from "./ui/header";
import { Input } from "./ui/input";

export function NewUrl() {
	return (
		<div className="flex flex-col gap-2 max-w-[366px] md:max-w-[380px] w-full">
			<div className="flex flex-col bg-gray-100 h-[340px] rounded-2xl p-6 md:p-8 justify-between">
				<Header title="Novo link" />
				<Input label="link original" type="text" placeholder="www.exemplo.com.br" />
				<Input label="link encurtado" type="text" fixedPrefix="brev.ly/" />
				<Button
					variant="primary"
					size="large"
					label="Salvar link"
				/>
			</div>
		</div>
	);
}
