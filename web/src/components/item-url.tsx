import { Copy, Trash } from '@phosphor-icons/react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { api } from '../shared/api-fetch'
import { type Url, useUrls } from '../store/urls'
import { Button } from "./ui/button"

interface ItemUrlProps {
  item: Url
}

export function ItemUrl({ item: { id, compactUrl, originalUrl, accessCount } }: ItemUrlProps) {
  const accessText = `${accessCount} ${accessCount === 1 ? 'acesso' : 'acessos'}`;
  const { deleteUrl } = useUrls();

  const navigate = useNavigate();

  const handleUrlClick = () => {
    navigate(`/${compactUrl}`);
  }

  const removeUrl = async () => {
    try {
      const response = await api.delete(`/delete-url/${id}`);
      if (response.status === 200) {
        toast('URL removida com sucesso', { type: 'success' });
        deleteUrl(id);
      }
    } catch (error) {
      if ((error as { status: number }).status === 404) {
        toast('URL não encontrada', { type: 'warning' });
      } else if ((error as { status: number }).status === 500) {
        toast('Erro ao remover URL', { type: 'error' });
      }
    }
  }

  const copyUrlToClipboard = async () => {
    await navigator.clipboard.writeText(originalUrl)
    toast('URL copiada para a área de transferência', { type: 'info' });
  }

  return (
    <div className="flex flex-row justify-between items-center gap-4 py-3 w-full border-t border-gray-200">
      <div
        className="cursor-pointer flex flex-col w-[147px] md:w-[320px]"
        onClick={handleUrlClick}
        // biome-ignore lint/a11y/useSemanticElements: <explanation>
        role='button'
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleUrlClick()}
      >
        <span className="text-md text-blue-base truncate">{compactUrl}</span>
        <span className="text-sm text-gray-500 truncate">{originalUrl}</span>
      </div>

      <div className="flex flex-row justify-end gap-4 items-center">
        <span className="text-sm text-gray-500 whitespace-nowrap">{accessText}</span>

        <div className="flex flex-row gap-1">
          <Button
            variant="secondary"
            size="small"
            icon={<Copy size={16} className="text-gray-600" />}
            onClick={copyUrlToClipboard}
          />
          <Button
            variant="secondary"
            size="small"
            icon={<Trash size={16} className="text-gray-600" />}
            onClick={removeUrl}
          />
        </div>
      </div>
    </div>
  )
}