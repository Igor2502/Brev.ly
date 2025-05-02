import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import logoIcon from '../assets/Logo_Icon.svg';
import { api } from '../shared/api-fetch';
import { type Url, useUrls } from '../store/urls';

export function Redirect() {
  const { urls, loadUrls } = useUrls();
  const { slug } = useParams();
  const navigate = useNavigate();
  const hasRedirected = useRef(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleRedirect = async () => {
      if (!slug || hasRedirected.current) return;

      // Carregar URLs se necessário
      if (urls.size === 0 && !isLoading) {
        setIsLoading(true);
        await loadUrls();
        setIsLoading(false);
        return;
      }

      const urlList: Array<Url> = Array.from(urls.values());
      const foundUrl = urlList.find((url) => url.compactUrl === slug);

      if (foundUrl) {
        hasRedirected.current = true;

        setTimeout(async () => {
          try {
            await api.get(`/${foundUrl.id}`);
            window.open(foundUrl.originalUrl, '_blank');
          } finally {
            navigate('/', { replace: true });
          }
        }, 2000);
      } else {
        navigate('/404', { replace: true });
      }
    };

    handleRedirect();
  }, [slug, urls, navigate, loadUrls, isLoading]);

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
