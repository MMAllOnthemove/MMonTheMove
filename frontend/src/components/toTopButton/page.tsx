"use client"
import { useState, useEffect } from "react";
import { Button } from "../ui/button";

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <Button
            onClick={scrollToTop}
            className={`fixed bottom-5 right-5 p-3 bg-blue-500 text-white transition-opacity ${isVisible ? "opacity-100" : "opacity-0"
                }`}
        >
            Top
        </Button>
    );
};

export default BackToTop;
