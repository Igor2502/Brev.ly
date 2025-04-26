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
      <div className="flex flex-col w-[157px] md:w-[320px]">
        <span className="text-md text-blue-base">{compactUrl}</span>
        <span className="text-sm text-gray-500">{originalUrl}</span>
      </div>

      <div className="flex flex-row justify-between gap-5 items-center">
        <span className="text-sm text-gray-500">{accessText}</span>

        <div className="flex flex-row gap-2">
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