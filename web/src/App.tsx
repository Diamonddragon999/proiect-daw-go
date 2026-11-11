import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MainAbout from "@/components/MainAbout";
import MainContribute from "@/components/MainContribute";
import { dictionaries, isLanguage } from "@/i18n";

function LanguageLayout() {
  const { lang } = useParams();
  if (!isLanguage(lang)) return <Navigate to="/en" replace />;
  return (
    <>
      <Navbar hasScrollAnimation text={dictionaries[lang]} />
      <Outlet />
    </>
  );
}

function Home() {
  const { lang } = useParams();
  if (!isLanguage(lang)) return null;
  const dict = dictionaries[lang];
  return (
    <div className="h-full">
      <Hero language={lang} text={dict} />
      <MainAbout language={lang} text={dict} />
      <MainContribute language={lang} text={dict} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<LanguageLayout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
}
