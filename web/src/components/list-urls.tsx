import { Link } from '@phosphor-icons/react'
import { useEffect } from 'react'
import { api } from '../shared/api-fetch'
import { type Url, useUrls } from '../store/urls'
import { ItemUrl } from './item-url'


export function ListUrls() {
  const { urls, addUrl } = useUrls();

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    async function fetchUrls() {
      try {
        const response = await api.get<Array<Url>>('/list-urls');
        for (const data of response.data) {
          addUrl({
            ...data,
          });

        }
      } catch (error) {
        console.error('Error fetching URLs:', error);
      }
    }
    fetchUrls();
  }, []);

  const hasData = urls.size > 0;

  return (
    <div className="flex flex-col w-full max-w-full gap-2 items-center md:max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-base scrollbar-hover:scrollbar-thumb-blue-dark">
      {hasData ? (
        Array
          .from(urls.entries())
          .sort((a: [string, Url], b: [string, Url]) => b[1].createdAt.localeCompare(a[1].createdAt))
          .map(([urlId, url]) => (
            <ItemUrl key={urlId} item={url} />
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