import logoBrevly from "../assets/Logo.svg";
import { MyUrls } from "../components/my-urls";
import { NewUrl } from "../components/new-url";

export function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-[956px] flex flex-col items-center md:items-start">
        <img src={logoBrevly} alt="Brevly Logo" className="w-24 h-24 sm:self-center md:self-start" />
        <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between gap-4 w-full">
          <NewUrl />
          <MyUrls />
        </div>
      </div>
    </main>
  );
}