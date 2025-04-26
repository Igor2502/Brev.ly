import { Link } from '@phosphor-icons/react'
import { ItemUrl } from './item-url'

export function ListUrls() {
  const fakeData = [
    { id: 1, originalUrl: 'https://example.com', compactUrl: 'https://brev.ly/abc123456', accessCount: 30 },
    { id: 2, originalUrl: 'https://example.org', compactUrl: 'https://brev.ly/xyz789', accessCount: 15 },
    { id: 3, originalUrl: 'https://example.com', compactUrl: 'https://brev.ly/abc123', accessCount: 1 },
    { id: 4, originalUrl: 'https://example.org', compactUrl: 'https://brev.ly/xyz789', accessCount: 0 },
    { id: 5, originalUrl: 'https://example.com', compactUrl: 'https://brev.ly/abc123', accessCount: 18 },
    { id: 6, originalUrl: 'https://example.org', compactUrl: 'https://brev.ly/xyz789', accessCount: 6 },
  ]

  const hasData = fakeData.length > 0

  return (
    <div className="flex flex-col w-full max-w-full gap-2 items-center md:max-h-[300px] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-blue-base scrollbar-hover:scrollbar-thumb-blue-dark">
      {hasData ? (
        fakeData.map(item => (
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