import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logoIcon from '../assets/Logo_Icon.svg';

export function Redirect() {

  const urls = [
    { id: 1, originalUrl: 'https://example.com', compactUrl: 'https://brev.ly/abc123456', accessCount: 30 },
    { id: 2, originalUrl: 'https://example.org', compactUrl: 'https://brev.ly/xyz789', accessCount: 15 },
    { id: 3, originalUrl: 'https://example.com', compactUrl: 'https://brev.ly/abc123', accessCount: 1 },
    { id: 4, originalUrl: 'https://example.org', compactUrl: 'https://brev.ly/xyz789', accessCount: 0 },
    { id: 5, originalUrl: 'https://example.com', compactUrl: 'https://brev.ly/abc123', accessCount: 18 },
    { id: 6, originalUrl: 'https://example.org', compactUrl: 'https://brev.ly/xyz789', accessCount: 6 },
  ];

  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!slug) return;

    const fullUrl = `https://brev.ly/${slug}`;
    const foundUrl = urls.find(url => url.compactUrl === fullUrl);

    if (foundUrl) {
      const timer = setTimeout(() => {
        window.open(foundUrl.originalUrl, '_blank');
        navigate('/', { replace: true }); // Volta para Home depois de abrir nova aba
      }, 2000);

      return () => clearTimeout(timer); // limpar timeout se o componente desmontar
    }

    navigate('/404', { replace: true });
  }, [slug, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex flex-col items-center justify-center max-h-[296px] max-w-[580px] bg-gray-100 px-12 py-16 gap-6'>
        <img src={logoIcon} alt="Logo Brev.lyv" className="w-12 h-12" />
        <h1 className="text-xl text-gray-600">
          Redirecionando...
        </h1>
        <p className="text-md text-gray-500 text-center">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?&nbsp;
          <Link to={`/${slug}`} className="text-blue-500 hover:underline">
            Acesse aqui
          </Link>
        </p>
      </div>
    </div>
  );
}
