import { DownloadSimple } from '@phosphor-icons/react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../shared/api-fetch';
import { useUrls } from '../store/urls';
import { ListUrls } from "./list-urls";
import { Button } from "./ui/button";
import { Header } from "./ui/header";

export function MyUrls() {
  const [isLoading, setIsLoading] = useState(false);
  const { urls } = useUrls();
  const hasData = urls.size > 0;

  async function exportUrlsToCSV() {
    setIsLoading(true);
    try {
      const response = await api.get('/export-urls-to-csv');
      if (response.status === 200) {
        window.open(response.data.url, '_blank');
      }
    } catch (error) {
      toast('Erro ao exportar os links', { type: 'error' });
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col gap-2 max-w-[366px] md:max-w-[580px] w-full bg-gray-100 rounded-2xl p-6 md:p-8">
      <div className="flex flex-row mb-4">
        <Header title="Meus links" />
        <Button
          variant="secondary"
          size="medium"
          label="Baixar CSV"
          icon={<DownloadSimple size={16} className="text-gray-600" />}
          disabled={!hasData || isLoading}
          onClick={exportUrlsToCSV}
        />
      </div>

      <ListUrls />
    </div>
  )
}