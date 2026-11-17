import { useParams } from "react-router-dom";
import CourseSearch from "@/components/CourseSearch";
import { courses } from "@/data/courseCatalog";
import { dictionaries, isLanguage } from "@/i18n";

export default function Courses() {
  const { lang } = useParams();
  if (!isLanguage(lang)) return null;

  const text = dictionaries[lang].courses;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 px-4 pb-8 pt-32">
        <header className="flex w-full flex-col items-center gap-2 p-2 text-center">
          <h1 className="text-5xl font-bold text-(--text-900)">{text.title}</h1>
          <p className="text-xl text-(--text-600)">{text.description}</p>
        </header>

        <CourseSearch
          courses={courses}
          emptyMessage={text.empty}
          language={lang}
          layoutSeed="fmi-lib-course-catalog"
          noResultsMessage={text.noResults}
          placeholder={text.search}
        />
      </div>
    </main>
  );
}
