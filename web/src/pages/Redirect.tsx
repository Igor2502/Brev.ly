import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    <div className="flex flex-col items-center justify-center h-dvh">
      <div className="animate-pulse text-blue-500 text-lg font-semibold">
        Redirecionando...
      </div>
    </div>
  );
}
