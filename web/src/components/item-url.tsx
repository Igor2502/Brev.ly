import { Copy, Trash } from '@phosphor-icons/react'
import { Button } from "./ui/button"

interface ItemUrlProps {
  item: {
    id: number
    originalUrl: string
    compactUrl: string
    accessCount: number
  }
}

export function ItemUrl({ item: { compactUrl, originalUrl, accessCount } }: ItemUrlProps) {
  const accessText = `${accessCount} ${accessCount === 1 ? 'acesso' : 'acessos'}`;

  return (
    <div className="flex flex-row justify-between items-center gap-4 py-3 w-full border-t border-gray-200">
      <div className="flex flex-col w-[147px] md:w-[320px]">
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
          />
          <Button
            variant="secondary"
            size="small"
            icon={<Trash size={16} className="text-gray-600" />}
          />
        </div>
      </div>
    </div>
  )
}