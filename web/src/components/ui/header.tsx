interface HeaderProps {
	title: string;
}

export function Header({ title }: HeaderProps) {
	return (
		<div className="w-full">
			<h1 className="text-lg text-gray-600">{title}</h1>
		</div>
	);
}
