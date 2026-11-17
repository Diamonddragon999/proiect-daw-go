import { Link } from "react-router-dom";
import { courses, lessons } from "@/data/courseCatalog";
import type { Dictionary, Language } from "@/i18n";

export default function HomeExperience({
    text,
    language,
}: {
    text: Dictionary;
    language: Language;
}) {
    const featuredCourses = [
        "algoritmi-fundamentali",
        "inteligenta-artificiala",
        "dezvoltarea-aplicatiilor-web",
    ].map((slug) => {
        const course = courses.find((entry) => entry.slug === slug);
        if (!course) throw new Error(`Homepage featured course "${slug}" is missing from the catalog.`);
        return course;
    });
    const featuredLessons = lessons
        .filter((lesson) => lesson.language === language)
        .sort(
            (left, right) =>
                left.courseSlug.localeCompare(right.courseSlug) ||
                left.order - right.order ||
                left.title.localeCompare(right.title),
        )
        .slice(0, 2);

    return (
        <div id="discover">
            <section className="scroll-mt-24 px-6 py-20 sm:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl">
                            <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-(--text-500)">
                                {text.home.courses_eyebrow}
                            </p>
                            <h2 className="text-4xl leading-[1.05] font-normal tracking-tight text-(--text-900) text-balance sm:text-5xl lg:text-6xl">
                                {text.home.courses_title}
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-(--text-600)">
                                {text.home.courses_description}
                            </p>
                        </div>
                        <p className="shrink-0 text-(--text-600)">
                            <span className="text-4xl font-semibold tracking-tight text-(--text-900)">
                                {courses.length}
                            </span>{" "}
                            <span>{text.home.course_count}</span>
                        </p>
                    </div>

                    <div className="mt-10 grid gap-5 md:grid-cols-3">
                        {featuredCourses.map((course, index) => (
                            <Link
                                key={course.slug}
                                to={`/${language}/courses/${course.slug}`}
                                className="group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-[2rem] bg-(--fmi-blue) p-6 text-white transition-transform duration-300 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fmi-blue) sm:p-8"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <span className="rounded-full bg-(--navbar-gray) px-4 py-2 text-xs font-semibold tracking-wide text-(--text-800)">
                                        {course.category[language]}
                                    </span>
                                    <span className="shrink-0 text-sm font-semibold tracking-widest text-white/75">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                </div>
                                <div className="relative z-10 mt-8">
                                    <h3 className="max-w-[17ch] text-2xl leading-tight font-semibold tracking-tight sm:text-3xl">
                                        {course.title[language]}
                                    </h3>
                                    <span className="mt-5 inline-flex items-center gap-2 font-medium">
                                        {text.home.course_cta}
                                        <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Link
                            to={`/${language}/courses`}
                            className="group inline-flex items-center gap-2 font-semibold text-(--text-900)"
                        >
                            {text.home.all_courses}
                            <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>
            </section>

            <section className="px-6 py-12 sm:py-20">
                <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
                    <div className="max-w-xl">
                        <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-(--text-500)">
                            {text.home.challenge_eyebrow}
                        </p>
                        <h2 className="text-4xl leading-[1.05] font-normal tracking-tight text-(--text-900) text-balance sm:text-5xl">
                            {text.home.challenge_title}
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-(--text-600)">
                            {text.home.challenge_description}
                        </p>
                    </div>

                    <div className="rounded-[2rem] bg-(--fmi-blue) p-6 text-white shadow-xl shadow-(--fmi-blue)/15 sm:p-9">
                        <div className="flex items-center justify-between gap-4">
                            <span className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white">
                                {text.home.challenge_label}
                            </span>
                            <span className="text-sm font-semibold tabular-nums">01 / 01</span>
                        </div>
                        <h3 className="mt-7 max-w-xl text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">
                            {text.home.challenge_prompt}
                        </h3>
                        <div
                            aria-hidden="true"
                            className="mt-6 grid max-w-64 grid-cols-8 gap-1.5"
                        >
                            {Array.from({ length: 64 }, (_, index) => (
                                <span
                                    key={index}
                                    className={`aspect-square rounded-[3px] ${
                                        index < 32 ? "bg-white/85" : "bg-white/20"
                                    }`}
                                />
                            ))}
                        </div>
                        <details className="group mt-7 border-t border-white/20 pt-5">
                            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold">
                                {text.home.challenge_reveal}
                                <span aria-hidden="true" className="grid size-9 shrink-0 place-items-center rounded-full bg-white text-xl leading-none text-(--fmi-blue) transition-transform group-open:rotate-45">
                                    +
                                </span>
                            </summary>
                            <p className="mt-4 max-w-xl leading-relaxed text-white/85">
                                {text.home.challenge_answer}
                            </p>
                            <Link
                                to={`/${language}/courses/algoritmi-fundamentali`}
                                className="group mt-5 inline-flex items-center gap-2 font-semibold text-white"
                            >
                                {text.home.challenge_course_link}
                                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                            </Link>
                        </details>
                    </div>
                </div>
            </section>

            <section className="px-6 py-20 sm:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div className="max-w-3xl">
                            <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-(--text-500)">
                                {text.home.lessons_eyebrow}
                            </p>
                            <h2 className="text-4xl leading-[1.05] font-normal tracking-tight text-(--text-900) text-balance sm:text-5xl lg:text-6xl">
                                {text.home.lessons_title}
                            </h2>
                            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-(--text-600)">
                                {text.home.lessons_description}
                            </p>
                        </div>
                        <Link
                            to={`/${language}/courses`}
                            className="group inline-flex shrink-0 items-center gap-2 font-semibold text-(--text-900)"
                        >
                            {text.home.all_courses}
                            <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>

                    {featuredLessons.length > 0 ? (
                        <div className="grid gap-5 md:grid-cols-2">
                            {featuredLessons.map((lesson) => {
                                const course = courses.find(
                                    (entry) => entry.slug === lesson.courseSlug,
                                );

                                return (
                                    <Link
                                        key={`${lesson.courseSlug}-${lesson.slug}`}
                                        to={`/${language}/courses/${lesson.courseSlug}/${lesson.slug}`}
                                        className="group flex min-h-72 flex-col justify-between rounded-[2rem] border border-(--border) bg-(--fmi-accent) p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--fmi-blue) sm:p-8"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <span className="rounded-full bg-(--navbar-gray) px-4 py-2 text-xs font-semibold text-(--text-800)">
                                                {course?.title[language] ?? lesson.courseSlug}
                                            </span>
                                            <span
                                                aria-hidden="true"
                                                className="grid size-12 shrink-0 place-items-center rounded-full bg-(--fmi-blue)/10 text-(--fmi-blue) transition-transform group-hover:rotate-12"
                                            >
                                                <BookIcon />
                                            </span>
                                        </div>
                                        <div className="mt-8">
                                            <h3 className="text-2xl leading-tight font-semibold tracking-tight text-(--text-900) sm:text-3xl">
                                                {lesson.title}
                                            </h3>
                                            <p className="mt-3 line-clamp-2 leading-relaxed text-(--text-600)">
                                                {lesson.description}
                                            </p>
                                            <span className="mt-6 inline-flex items-center gap-2 font-semibold text-(--text-900)">
                                                {text.home.read_lesson}
                                                <ArrowIcon className="transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="rounded-[2rem] border border-(--border) p-8 text-(--text-600)">
                            {text.home.no_lessons}
                        </p>
                    )}
                </div>
            </section>

            <section className="px-6 pt-4 pb-20 sm:pb-28">
                <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center md:gap-14">
                    <div className="max-w-xl">
                        <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-(--text-500)">
                            {text.home.community_eyebrow}
                        </p>
                        <h2 className="text-4xl leading-[1.05] font-normal tracking-tight text-(--text-900) text-balance sm:text-5xl">
                            {text.home.community_title}
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-(--text-600)">
                            {text.home.community_description}
                        </p>
                    </div>
                    <div className="relative isolate overflow-hidden rounded-[2rem] bg-(--fmi-blue) p-8 text-white sm:p-10 lg:p-12">
                        <div
                            aria-hidden="true"
                            className="absolute -top-20 -right-16 -z-10 size-64 rounded-full border-[36px] border-(--fmi-light-blue)/30"
                        />
                        <p className="text-sm font-semibold tracking-[0.16em] text-white/70">
                            {text.home.contribute_eyebrow}
                        </p>
                        <h3 className="mt-5 max-w-md text-3xl leading-tight font-normal tracking-tight text-balance sm:text-4xl">
                            {text.home.contribute_panel_title}
                        </h3>
                        <Link
                            to={`/${language}/contribute`}
                            className="mt-8 inline-flex items-center gap-2 rounded-4xl bg-(--navbar-gray) px-6.5 py-3.5 font-semibold text-(--text-900) transition-colors hover:bg-(--navbar-gray-highlight)"
                        >
                            {text.home.contribute_cta}
                            <ArrowIcon />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

function ArrowIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            aria-hidden="true"
            className={className}
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
        </svg>
    );
}

function BookIcon() {
    return (
        <svg
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 7v14" />
            <path d="M3 18V5a2 2 0 0 1 2-2h3a4 4 0 0 1 4 4 4 4 0 0 1 4-4h3a2 2 0 0 1 2 2v13" />
            <path d="M3 18a2 2 0 0 0 2 2h3a4 4 0 0 1 4 1 4 4 0 0 1 4-1h3a2 2 0 0 0 2-2" />
        </svg>
    );
}
