import { Link } from '@phosphor-icons/react'

export function ListUrls() {
  return (
    <div className="flex flex-col w-full gap-2 items-center">
      <Link size={32} className='text-gray-400' />
      <span className='text-xs text-gray-500'>ainda não existem links cadastrados</span>
    </div>
  )
}