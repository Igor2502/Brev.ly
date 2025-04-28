import { useEffect, useRef, useState } from "react";

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  fixedPrefix?: string;
}

export function Input({
  label,
  type = "text",
  placeholder = "",
  value = "",
  fixedPrefix
}: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  function handleFocus() {
    if (inputRef.current && fixedPrefix) {
      const position = inputRef.current.value.length;
      inputRef.current.setSelectionRange(position, position);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="relative w-full">
        {fixedPrefix && (
          <span className="absolute top-1/2 left-3 -translate-y-1/2 text-blue-base pointer-events-none text-sm">
            {fixedPrefix}
          </span>
        )}
        <input
          ref={inputRef}
          id={label}
          type={type}
          className={`peer border-1 border-gray-300 focus:border-blue-base focus:outline-none rounded-md text-gray-400 text-sm h-12 p-1 w-full ${fixedPrefix ? 'pl-15' : 'pl-2'}
`}
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder={!fixedPrefix ? placeholder : undefined}
        />
        {label && (
          <label htmlFor={label} className="absolute -top-5 left-0 text-xs text-gray-500 peer-focus:text-blue-base transition-colors">
            {label}
          </label>
        )}
      </div>
    </div>
  );
}
