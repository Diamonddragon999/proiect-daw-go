
import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import FMICodexLogo from "./logo";
import { Moon, Sun } from 'lucide-react';
import type { Dictionary } from '@/i18n';


interface NavbarProps {
    text: Dictionary;
    hasScrollAnimation?: boolean;
}

export default function Navbar({ text, hasScrollAnimation = true }: NavbarProps) {
    const pathname = useLocation().pathname;
    const navigate = useNavigate();
    const currentLang = pathname.split('/')[1] || 'en';
    const shouldAnimateOnScroll = hasScrollAnimation && pathname === `/${currentLang}`;
    const [isScrolled, setIsScrolled] = useState(false);
    const isNavbarScrolled = !shouldAnimateOnScroll || isScrolled;

    useEffect(() => {
        if (!shouldAnimateOnScroll) return;

        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [shouldAnimateOnScroll]);

    const navItems = [
        { name: text.nav.home, path: `/${currentLang}` },
        { name: text.nav.about, path: `/${currentLang}/about` },
        { name: text.nav.courses, path: `/${currentLang}/courses` },
        { name: text.nav.contribute, path: `/${currentLang}/contribute` },
    ];

    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    const toggleLanguage = () => {
        const nextLang = currentLang === 'en' ? 'ro' : 'en';
        const newPath = pathname.replace(`/${currentLang}`, `/${nextLang}`);
        navigate(newPath);
    };

    return (
        /* Changed from sticky to absolute so it floats over the top of the page */
        <header className="fixed top-0 left-0 z-50 w-full p-4 bg-transparent transition-all duration-300">
            <div className={`grid h-20 grid-cols-3 grid-rows-[80px] items-center transition-all duration-300 ${
                isNavbarScrolled
                    ? 'rounded-4xl bg-(--fmi-accent) px-5 shadow-md backdrop-blur-md' 
                    : 'bg-transparent shadow-none px-3'
            }`}>
                
                <Link 
                    to={`/${currentLang}`} 
                    className="cursor-pointer justify-self-start flex items-center"
                >
                    <FMICodexLogo inverse={shouldAnimateOnScroll && !isNavbarScrolled} />
                </Link>

                {/* Central navigation pill */}
                <nav className={`bg-(--navbar-gray) p-1 flex rounded-4xl justify-self-center transition-all duration-300 ${
                    !isNavbarScrolled ? 'shadow-sm' : ''
                }`}>
                    {navItems.map((item) => {
                        const isActive = pathname === item.path;

                        return (
                            <Link 
                                key={item.name}
                                to={item.path}
                                className={`menu-item cursor-pointer ${isActive ? 'menu-item-selected' : ''}`}
                            >
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>

                {/* Right-side buttons */}
                <div className='text-(--text-800) flex p-1 gap-3 justify-self-end'>
                    <button 
                        onClick={toggleTheme} 
                        className={`bg-(--navbar-gray) hover:bg-(--navbar-gray-highlight) rounded-3xl p-3 cursor-pointer w-12 transition-all duration-300 ${
                            !isNavbarScrolled ? 'shadow-sm' : ''
                        }`} 
                        aria-label="Toggle theme"
                    >
                        {!isDark ? <Sun/> : <Moon />}
                    </button>
                    <button 
                        onClick={toggleLanguage} 
                        className={`bg-(--navbar-gray) hover:bg-(--navbar-gray-highlight) font-bold rounded-3xl p-3 cursor-pointer uppercase w-12 transition-all duration-300 ${
                            !isNavbarScrolled ? 'shadow-sm' : ''
                        }`}
                        aria-label="Change language"
                    >
                        <span className='relative'>{currentLang}</span>
                    </button>
                </div>
            </div> 
        </header>
    );
}