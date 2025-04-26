import { DownloadSimple } from '@phosphor-icons/react';
import { ListUrls } from "./list-urls";
import { Button } from "./ui/button";
import { Header } from "./ui/header";

export function MyUrls() {
  return (
    <div className="flex flex-col gap-2 max-w-[360px] md:max-w-[580px] w-full bg-gray-100 rounded-2xl p-8">
      <div className="flex flex-row mb-4">
        <Header title="Meus links" />
        <Button
          variant="secondary"
          size="medium"
          label="Baixar CSV"
          icon={<DownloadSimple size={16} className="text-gray-600" />}
        />
      </div>

      <ListUrls />
    </div>
  )
}