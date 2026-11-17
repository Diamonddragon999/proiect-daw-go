import { Link, useParams } from "react-router-dom";
import { dictionaries, isLanguage } from "@/i18n";

export default function About() {
  const { lang } = useParams();
  if (!isLanguage(lang)) return null;

  const text = dictionaries[lang].about;

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-36 text-(--text-900)">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16 max-w-3xl">
          <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-(--text-500)">
            FMI-lib
          </p>
          <h1 className="text-4xl leading-[1.05] font-normal tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {text.title}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-(--text-600) sm:text-xl">
            {text.description}
          </p>
        </header>

        <section className="grid gap-5 md:grid-cols-2">
          <article className="rounded-[2rem] bg-(--fmi-accent) p-8 shadow-sm sm:p-10">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-(--text-900) sm:text-3xl">
              {text.mission_title}
            </h2>
            <p className="text-lg leading-relaxed text-(--text-600)">
              {text.mission_description}
            </p>
          </article>
          <article className="rounded-[2rem] bg-(--fmi-blue) p-8 text-white sm:p-10">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {text.materials_title}
            </h2>
            <p className="text-lg leading-relaxed text-white/85">
              {text.materials_description}
            </p>
          </article>
        </section>

        <section className="mt-20">
          <div className="mb-8 max-w-2xl">
            <h2 className="text-3xl leading-tight font-normal tracking-tight text-(--text-900) sm:text-4xl">
              {text.principles_title}
            </h2>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {text.principles.map((principle, index) => (
              <li
                key={principle}
                className="rounded-3xl border border-(--border) bg-(--fmi-accent) p-6"
              >
                <span className="mb-5 block text-sm font-semibold tracking-widest text-(--fmi-blue)">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed text-(--text-600)">{principle}</p>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <Link
            to={`/${lang}/courses`}
            className="inline-flex rounded-4xl bg-(--fmi-blue) px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {text.courses_link}
          </Link>
        </div>
      </div>
    </main>
  );
}
