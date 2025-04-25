export function Button() {
  return (
    <button
      type="button"
      disabled={true}
      className="bg-blue-base hover:bg-blue-dark text-white rounded-md h-12 w-full text-md disabled:opacity-50 disabled:pointer-events-none aria-disabled:opacity-50 aria-disabled:pointer-events-none">
      Salvar link
    </button>
  )
}