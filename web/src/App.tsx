import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HomeExperience from "@/components/HomeExperience";
import About from "@/pages/About";
import Courses from "@/pages/Courses";
import Contribute from "@/pages/Contribute";
import CourseDetail from "@/pages/CourseDetail";
import LessonDetail from "@/pages/LessonDetail";
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
      <HomeExperience language={lang} text={dict} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/en" replace />} />
      <Route path="/:lang" element={<LanguageLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="courses" element={<Courses />} />
        <Route path="courses/:courseId" element={<CourseDetail />} />
        <Route path="courses/:courseId/:lessonId" element={<LessonDetail />} />
        <Route path="contribute" element={<Contribute />} />
      </Route>
    </Routes>
  );
}
