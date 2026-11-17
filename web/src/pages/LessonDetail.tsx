import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import { courses, lessons } from "@/data/courseCatalog";
import { isLanguage } from "@/i18n";

export default function LessonDetail() {
  const { lang, courseId, lessonId } = useParams();
  if (!isLanguage(lang) || !courseId || !lessonId) return null;

  const course = courses.find((item) => item.slug === courseId);
  const lesson = lessons.find(
    (item) =>
      item.courseSlug === courseId &&
      item.slug === lessonId &&
      item.language === lang,
  );

  if (!course || !lesson) {
    return (
      <main className="min-h-screen bg-background px-6 pb-12 pt-32">
        <p className="mx-auto max-w-4xl text-(--text-600)">
          {lang === "ro" ? "Lecția nu a fost găsită." : "Lesson not found."}
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <article className="mx-auto w-full max-w-4xl px-4 pb-10 pt-32 sm:px-6">
        <div className="rounded-4xl border border-(--border) bg-(--fmi-accent) px-5 py-6 text-(--text-800) shadow-sm sm:px-10 sm:py-10">
          <Link
            className="group mb-8 inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--fmi-accent) px-4 py-2 text-sm font-semibold text-(--text-800) shadow-sm transition hover:shadow-md"
            to={`/${lang}/courses/${course.slug}`}
          >
            <ArrowLeft
              aria-hidden="true"
              className="size-4 transition group-hover:-translate-x-0.5"
            />
            {lang === "ro" ? "Înapoi la curs" : "Back to course"}
          </Link>

          <div className="flex flex-col gap-5 text-base leading-7 text-(--text-800) [&_h1]:mb-2 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h2]:mt-10 [&_h2]:border-b [&_h2]:border-(--border) [&_h2]:pb-2 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h3]:mt-7 [&_h3]:text-xl [&_h3]:font-bold [&_p]:leading-8 [&_a]:font-semibold [&_a]:text-sky-700 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:font-bold [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2 [&_li]:ml-6 [&_li]:list-disc [&_ol_li]:list-decimal [&_blockquote]:rounded-r-xl [&_blockquote]:border-l-4 [&_blockquote]:border-sky-500 [&_blockquote]:bg-sky-500/5 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:text-(--text-600) [&_pre]:overflow-x-auto [&_pre]:rounded-2xl [&_pre]:border [&_pre]:border-white/10 [&_pre]:bg-slate-950 [&_pre]:p-5 [&_pre]:text-sm [&_pre]:leading-6 [&_pre]:text-slate-100 [&_code]:rounded-md [&_code]:bg-(--navbar-gray) [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-inherit">
            <ReactMarkdown>{lesson.body}</ReactMarkdown>
          </div>
        </div>
      </article>
    </main>
  );
}
