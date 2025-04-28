import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-dvh">
      <h1 className="text-3xl font-bold text-red-600">404</h1>
      <p className="text-gray-600">Ops! Página não encontrada.</p>
      <Link to="/" className="mt-4 text-blue-500 hover:underline">
        Voltar para Home
      </Link>
    </div>
  );
}