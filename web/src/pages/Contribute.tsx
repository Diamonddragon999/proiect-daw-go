import { Link, useParams } from "react-router-dom";
import { dictionaries, isLanguage } from "@/i18n";

export default function Contribute() {
  const { lang } = useParams();
  if (!isLanguage(lang)) return null;

  const text = dictionaries[lang].contribute;

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

        <section>
          <div className="mb-8 max-w-2xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-(--text-500)">
              {text.ways_title}
            </p>
            <h2 className="text-3xl leading-tight font-normal tracking-tight text-(--text-900) sm:text-4xl">
              {text.preview_title}
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {text.ways.map((way, index) => (
              <article
                key={way.title}
                className="flex min-h-64 flex-col rounded-[2rem] bg-(--fmi-blue) p-7 text-white sm:p-8"
              >
                <span className="mb-8 text-sm font-semibold tracking-widest text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-3 text-xl font-semibold tracking-tight sm:text-2xl">
                  {way.title}
                </h3>
                <p className="leading-relaxed text-white/85">{way.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-20 rounded-[2rem] bg-(--fmi-blue) p-8 text-white sm:p-10 lg:p-12">
          <div className="mb-8 max-w-2xl">
            <p className="mb-4 text-sm font-semibold tracking-[0.16em] text-white/70">
              FMI-lib
            </p>
            <h2 className="text-3xl leading-tight font-normal tracking-tight sm:text-4xl">
              {text.how_title}
            </h2>
          </div>
          <ol className="grid gap-6 md:grid-cols-3">
            {text.steps.map((step, index) => (
              <li key={step} className="border-t border-white/20 pt-5">
                <span className="mb-4 block text-sm font-semibold tracking-widest text-white/70">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="leading-relaxed text-white/90">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-8 rounded-[2rem] border border-(--border) bg-(--fmi-accent) p-7 sm:p-9">
          <h2 className="mb-3 text-2xl font-semibold tracking-tight text-(--text-900)">
            {text.guidelines_title}
          </h2>
          <p className="max-w-4xl leading-relaxed text-(--text-600)">
            {text.guidelines}
          </p>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            to={`/${lang}/courses`}
            className="rounded-4xl bg-(--fmi-blue) px-6 py-3.5 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {text.courses_link}
          </Link>
          <a
            href="https://github.com/Diamonddragon999/proiect-daw-go"
            target="_blank"
            rel="noreferrer"
            className="rounded-4xl border border-(--border) bg-(--fmi-accent) px-6 py-3.5 font-semibold text-(--text-900) transition-colors hover:bg-(--navbar-gray)"
          >
            {text.repository_link}
          </a>
        </div>
      </div>
    </main>
  );
}
