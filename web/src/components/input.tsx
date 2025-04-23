export function Input() {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs text-gray-500">link original</span>
      <input
        type="text"
        className="border border-1 border-gray-300 rounded-md text-gray-400 text-sm h-12 p-1"
        placeholder="www.exemplo.com.br"
      />
    </div>
  )
}