import { Link } from "react-router-dom";
import type { Dictionary, Language } from "@/i18n";
import aboutImage from "@/assets/image.png";


export default function MainAbout({
    text,
    language,
}: {
    text: Dictionary;
    language: Language;
}) {
    return (
        <section className="w-full bg-background px-6 py-20 sm:py-24">
            <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
                <div className="relative flex min-h-64 items-center justify-center md:min-h-96">
                    <img
                        src={aboutImage}
                        alt=""
                        className="relative h-auto w-full max-w-sm opacity-80"
                    />
                </div>
                <div className="flex flex-col gap-5">
                    <h2 className="text-4xl leading-[1.1] font-normal tracking-tight text-(--text-900) sm:text-5xl">
                        {text.about.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-(--text-600)">{text.about.description}</p>
                    <div className="border-l-4 border-(--fmi-light-blue) pl-5">
                        <h3 className="mb-2 text-xl font-bold text-(--text-900)">{text.about.mission_title}</h3>
                        <p className="leading-relaxed text-(--text-600)">{text.about.mission_description}</p>
                    </div>
                    <Link
                        to={`/${language}/about`}
                        className="w-fit rounded-4xl bg-(--fmi-blue) px-6.5 py-3.5 font-normal text-white transition-opacity hover:opacity-90"
                    >
                        {text.about.learn_more}
                    </Link>
                </div>
            </div>
        </section>
    );
}