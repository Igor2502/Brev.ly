interface InputProps {
  label?: string
  type?: string
  placeholder?: string
  value?: string
}

export function Input({ label, type, placeholder, value }: InputProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <span className="text-xs text-gray-500">{label}</span>
      <input
        type={type}
        className="border-1 border-gray-300 rounded-md text-gray-400 text-sm h-12 p-1"
        placeholder={placeholder}
        value={value}
      />
    </div>
  )
}