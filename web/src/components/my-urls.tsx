import { Header } from "./ui/header";
import { ListUrls } from "./list-urls";

export function MyUrls() {
  return (
    <div className="flex flex-col gap-2 max-w-[580px] w-full bg-gray-100 rounded-2xl p-8">
      <div className="flex flex-row">
        <Header />
      </div>

      <div className="border-b border-gray-200 mb-4" />

      <ListUrls />
    </div>
  )
}