import logoBrevly from "../assets/Logo.svg";
import { Button } from "./button";
import { Header } from "./header";
import { Input } from "./input";

export function NewUrl() {
	return (
		<div className="flex flex-col gap-2 max-w-[360px] w-full">
			<img src={logoBrevly} alt="Brevly Logo" className="w-24 h-24 mx-auto md:mx-0" />
			<div className="flex flex-col bg-gray-100 h-[340px] rounded-2xl p-8 justify-between">
				<Header />
				<Input />
				<Input />
				<Button />
			</div>
		</div>
	);
}
