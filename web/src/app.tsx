import logoBrevly from "./assets/Logo.svg";
import { MyUrls } from "./components/my-urls";
import { NewUrl } from "./components/new-url";

export function App() {
  return (
    <main className="h-dvh flex items-center justify-center">
      <div className="w-full max-w-[956px] flex flex-col items-center sm:items-start">
        <img src={logoBrevly} alt="Brevly Logo" className="w-24 h-24 sm:self-center md:self-start" />
        <div className="flex flex-row items-start justify-center gap-4 w-full">
          <NewUrl />
          <MyUrls />
        </div>
      </div>
    </main>
  )
}