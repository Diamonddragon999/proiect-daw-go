import { Link } from "react-router-dom";
import heroImg from "@/assets/image.png";
import type { Dictionary, Language } from "@/i18n";


export default function Hero({ text, language }: { text: Dictionary; language: Language }) {
    return (
        <div className="bg-(--fmi-blue) w-full h-screen flex flex-col text-white selection:bg-white selection:text-black">
            <main className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
                    <div className="flex flex-col gap-6 text-left">
                        <div className="gap-2 flex flex-col">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.1] text-balance text-white">
                           {text.hero.main_text.replace("-","\u2011")}
                        </h1>
                        <p className="text-lg text-(--text-white-900) leading-relaxed max-w-xl">
                            {text.hero.secondary_text.replace("-","\u2011")}
                        </p>
                        </div>
                        <div className="flex flex-wrap gap-4 pt-2">
                            <Link to={`/${language}/courses`} className="px-6.5 py-3.5 rounded-4xl bg-(--navbar-gray) text-(--text-900) font-normal shadow-lg hover:bg-(--navbar-gray-highlight) transition-all duration-200 cursor-pointer">
                                {text.hero.cta_courses}
                            </Link>
                            <Link to={`/${language}/contribute`} className="px-6.5 py-3.5 rounded-4xl hover:bg-(--navbar-gray-highlight)/50 backdrop-blur-md border border-(--navbar-gray) text-(--text-white-900) font-normal transition-all duration-200 cursor-pointer">
                                {text.hero.cta_contribute}
                            </Link>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <div className="w-full max-w-md mx-auto">
                            <img src={heroImg} alt="FMI Platform Preview" className="w-full h-auto" />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}