import {
  ArrowLeft,
  BookOpen,
  BookOpenCheck,
  ChevronRight,
  CirclePlay,
  ExternalLink,
  FolderGit2,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { courses, getGitHubTreeUrl, lessons } from "@/data/courseCatalog";
import { isLanguage } from "@/i18n";

export default function CourseDetail() {
  const { lang, courseId } = useParams();
  if (!isLanguage(lang) || !courseId) return null;

  const course = courses.find((item) => item.slug === courseId);
  if (!course) {
    return (
      <main className="min-h-screen bg-background px-6 pb-12 pt-32">
        <p className="mx-auto max-w-4xl text-(--text-600)">
          {lang === "ro" ? "Cursul nu a fost găsit." : "Course not found."}
        </p>
      </main>
    );
  }

  const courseLessons = lessons
    .filter((lesson) => lesson.courseSlug === course.slug && lesson.language === lang)
    .sort((left, right) => left.order - right.order);
  const courseHref = `/${lang}/courses/${course.slug}`;

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 pb-10 pt-32 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <Link
          className="group col-span-full inline-flex w-fit items-center gap-2 rounded-lg border border-(--border) bg-(--fmi-accent) px-4 py-2 text-sm font-semibold text-(--text-800) transition hover:bg-(--navbar-gray)"
          to={`/${lang}/courses`}
        >
          <ArrowLeft aria-hidden="true" className="size-4 transition group-hover:-translate-x-0.5" />
          {lang === "ro" ? "Toate cursurile" : "All courses"}
        </Link>

        <header
          className={`relative overflow-hidden rounded-2xl bg-(--fmi-blue) px-6 py-8 text-white sm:px-10 sm:py-10 ${
            courseLessons.length > 0
              ? "lg:col-start-1 lg:row-start-2"
              : "lg:col-span-full"
          }`}
        >
          <div className="flex max-w-4xl flex-col gap-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-white/75">
              <BookOpenCheck aria-hidden="true" className="size-4" />
              {lang === "ro" ? "Prezentare curs" : "Course overview"}
            </p>
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
              {course.title[lang]}
            </h1>
            <span className="w-fit rounded-md border border-white/20 bg-white/10 px-3 py-1.5 text-sm font-semibold">
              {course.category[lang]}
            </span>
            <div className="mt-2 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/20 pt-5 text-base text-white/80">
              <span className="inline-flex items-center gap-2">
                <FolderGit2 aria-hidden="true" className="size-4" />
                {course.sources.length} {lang === "ro" ? "surse" : "sources"}
              </span>
              <span className="inline-flex items-center gap-2">
                <BookOpen aria-hidden="true" className="size-4" />
                {courseLessons.length} {lang === "ro" ? "lecții" : "lessons"}
              </span>
            </div>
          </div>
        </header>

        {courseLessons.length > 0 && (
          <aside className="flex max-h-[34rem] min-h-0 w-full flex-col gap-4 overflow-hidden rounded-2xl border border-(--border) bg-(--fmi-accent) p-5 sm:p-6 lg:col-start-2 lg:row-start-2">
            <div className="flex items-baseline justify-between gap-4 border-b border-(--border) pb-3">
              <h2 className="text-xl font-bold text-(--text-900)">
                {lang === "ro" ? "Lecții" : "Lessons"}
              </h2>
              <span className="text-sm text-(--text-500)">
                {courseLessons.length}
              </span>
            </div>
            <ol className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
              {courseLessons.map((lesson, index) => (
                <li key={lesson.slug}>
                  <Link
                    className="group flex items-start gap-3 rounded-lg border border-(--border) bg-background p-3 transition-colors hover:bg-(--navbar-gray)"
                    to={`${courseHref}/${lesson.slug}`}
                  >
                    <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-(--navbar-gray) text-(--text-600)">
                      <CirclePlay aria-hidden="true" className="size-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="mb-1 block text-sm text-(--text-500)">
                        {lang === "ro" ? `Lecția ${index + 1}` : `Lesson ${index + 1}`}
                      </span>
                      <span className="block text-base font-semibold leading-5 text-(--text-900)">
                        {lesson.title}
                      </span>
                      <span className="mt-1 block text-sm leading-5 text-(--text-600)">
                        {lesson.description}
                      </span>
                    </span>
                    <ChevronRight
                      aria-hidden="true"
                      className="mt-1 size-4 shrink-0 text-(--text-500) group-hover:text-(--text-800)"
                    />
                  </Link>
                </li>
              ))}
            </ol>
          </aside>
        )}

        <section
          className={`flex min-w-0 flex-col gap-3 py-1 ${
            courseLessons.length > 0
              ? "lg:col-start-1 lg:row-start-3"
              : "lg:col-span-full"
          }`}
        >
          <h2 className="text-2xl font-bold tracking-tight text-(--text-900)">
            {lang === "ro" ? "Despre curs" : "About this course"}
          </h2>
          <p className="max-w-3xl text-base leading-7 text-(--text-600) sm:text-lg sm:leading-8">
            {course.description[lang] &&
            course.description[lang] !== course.category[lang]
              ? course.description[lang]
              : lang === "ro"
                ? "Răsfoiește lecțiile și materialele disponibile pentru acest curs."
                : "Browse the lessons and course materials available for this subject."}
          </p>
        </section>

        <section className="col-span-full flex min-w-0 flex-col gap-6">
          {course.sources.map((source) => (
            <article
              key={source.id}
              className="flex flex-col gap-5 rounded-2xl border border-(--border) bg-(--fmi-accent) p-5 sm:p-6"
            >
              <div className="flex flex-col gap-3 border-b border-(--border) pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-(--navbar-gray) text-(--text-600)">
                    <FolderGit2 aria-hidden="true" className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-(--text-500)">
                      {lang === "ro" ? "Materiale externe" : "External materials"}
                    </p>
                    <h2 className="text-lg font-bold text-(--text-900)">
                      {source.label}
                    </h2>
                  </div>
                </div>
                <a
                  className="inline-flex w-fit items-center gap-2 rounded-lg border border-(--border) px-4 py-2 text-sm font-semibold text-(--text-800) transition hover:bg-(--navbar-gray)"
                  href={getGitHubTreeUrl(source)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {lang === "ro" ? "Vezi repository-ul" : "View repository"}
                  <ExternalLink aria-hidden="true" className="size-3.5 text-(--text-500)" />
                </a>
              </div>
              {source.folders.length > 0 && (
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {source.folders.map((folder) => (
                    <li key={folder.path}>
                      <a
                        className="group flex h-full items-center gap-3 rounded-xl border border-(--border) bg-background p-4 transition hover:bg-(--navbar-gray)"
                        href={getGitHubTreeUrl(source, folder.path)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold text-(--text-900)">
                            {folder.label}
                          </span>
                          <span className="block truncate text-xs text-(--text-500)">
                            {folder.path}
                          </span>
                        </span>
                        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-(--text-500) transition group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
          {course.sources.length === 0 && (
            <p className="rounded-2xl border border-(--border) bg-(--fmi-accent) p-6 text-(--text-600)">
              {lang === "ro" ? "Nu există încă materiale externe." : "No external materials are available yet."}
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
