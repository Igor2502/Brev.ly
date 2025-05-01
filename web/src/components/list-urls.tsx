import { Link } from '@phosphor-icons/react'
import { ItemUrl } from './item-url'
import { useEffect, useState } from 'react'
import { api } from '../shared/api-fetch'

type Url = {
  id: number
  originalUrl: string
  compactUrl: string
  accessCount: number
}

export function ListUrls() {
  const [urls, setUrls] = useState<Array<Url>>([]);

  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await api.get<Array<Url>>('/list-urls');
        setUrls(response.data);
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    }
    fetchUrls();
  }, []);

  const hasData = urls.length > 0

  return (
    <div className="flex flex-col w-full max-w-full gap-2 items-center md:max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-base scrollbar-hover:scrollbar-thumb-blue-dark">
      {hasData ? (
        urls.map(item => (
          <ItemUrl key={item.id} item={item} />
        ))
      ) : (
        <>
          <div className="w-full border-t border-gray-200" />
          <div className="flex flex-col items-center gap-2 py-4 w-full">
            <Link size={32} className="text-gray-400" />
            <span className="text-xs text-gray-500">ainda não existem links cadastrados</span>
          </div>
        </>
      )}
    </div>
  )
}