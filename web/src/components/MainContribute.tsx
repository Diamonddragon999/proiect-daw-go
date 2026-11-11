import { Link } from "react-router-dom";
import type { Dictionary, Language } from "@/i18n";


export default function MainContribute({
    text,
    language,
}: {
    text: Dictionary;
    language: Language;
}) {
    return (
        <section className="w-full bg-background px-6 py-20 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
                <div className="flex flex-col gap-5">
                    <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-(--text-900) sm:text-5xl">
                        {text.contribute.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-(--text-600)">{text.contribute.description}</p>
                </div>
                <div className="flex flex-col items-start gap-6 rounded-4xl bg-(--fmi-blue) p-8 text-white shadow-xl sm:p-10">
                    <h3 className="text-3xl leading-[1.1] font-normal tracking-tight sm:text-4xl">
                        {text.contribute.preview_title}
                    </h3>
                    <p className="text-lg leading-relaxed text-white/85">{text.contribute.preview_description}</p>
                    <Link
                        to={`/${language}/contribute`}
                        className="rounded-4xl bg-(--navbar-gray) px-6.5 py-3.5 font-normal text-(--text-900) transition-colors hover:bg-(--navbar-gray-highlight)"
                    >
                        {text.contribute.preview_link}
                    </Link>
                </div>
            </div>
        </section>
    );
}