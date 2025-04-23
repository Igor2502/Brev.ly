import { Button } from "./button";
import { Header } from "./header";
import { Input } from "./input";

export function NewUrl() {
	return (
		<div className="flex flex-col bg-gray-100 max-w-[360px] h-[340px] w-full rounded-2xl p-8 justify-between">
			<Header />
			<Input />
			<Input />
			<Button />
		</div>
	);
}
