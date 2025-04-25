import { Button } from "./ui/button";
import { Header } from "./ui/header";
import { Input } from "./ui/input";

export function NewUrl() {
	return (
		<div className="flex flex-col gap-2 max-w-[360px] w-full">
			<div className="flex flex-col bg-gray-100 h-[340px] rounded-2xl p-8 justify-between">
				<Header />
				<Input />
				<Input />
				<Button />
			</div>
		</div>
	);
}
