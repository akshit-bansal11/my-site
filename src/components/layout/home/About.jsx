//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    DEPENDENCIES    |--------------------//
//--------------------|____________________|--------------------//
import { useState, useRef, useEffect, React } from "react";
import { motion } from "framer-motion";



//--------------------|‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|--------------------//
//--------------------|    MAIN RENDER     |--------------------//
//--------------------|____________________|--------------------//
export default function About({
    text = "Building Practical Web Experiences",
    delay = 150,
    animateBy = "words",
    direction = "top",
    className = "text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-center",
}) {
    const buildKeyframes = (from, steps) => {
        const keys = new Set([
            ...Object.keys(from),
            ...steps.flatMap((s) => Object.keys(s)),
        ]);
        const keyframes = {};
        keys.forEach((k) => {
            keyframes[k] = [from[k], ...steps.map((s) => s[k])];
        });
        return keyframes;
    };

    const BlurText = ({
        text,
        delay,
        className,
        animateBy,
        direction,
        threshold = 0.1,
        rootMargin = "0px",
        animationFrom,
        animationTo,
        easing = (t) => t,
        onAnimationComplete,
        stepDuration = 0.35,
    }) => {
        const elements = animateBy === "words" ? text.split(" ") : text.split("");
        const [inView, setInView] = useState(false);
        const ref = useRef(null);

        useEffect(() => {
            if (!ref.current) return;
            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setInView(true);
                        observer.unobserve(ref.current);
                    }
                },
                { threshold, rootMargin }
            );
            observer.observe(ref.current);
            return () => observer.disconnect();
        }, [threshold, rootMargin]);

        const defaultFrom =
            direction === "top"
                ? { filter: "blur(10px)", opacity: 0, y: -50 }
                : { filter: "blur(10px)", opacity: 0, y: 50 };

        const defaultTo = [
            { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
            { filter: "blur(0px)", opacity: 1, y: 0 },
        ];

        const fromSnapshot = animationFrom ?? defaultFrom;
        const toSnapshots = animationTo ?? defaultTo;

        const stepCount = toSnapshots.length + 1;
        const totalDuration = stepDuration * (stepCount - 1);
        const times = Array.from({ length: stepCount }, (_, i) =>
            stepCount === 1 ? 0 : i / (stepCount - 1)
        );

        return (
            <div>
                <p
                    ref={ref}
                    className={`blur-text ${className} flex flex-wrap justify-center`}
                >
                    {elements.map((segment, index) => {
                        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

                        const spanTransition = {
                            duration: totalDuration,
                            times,
                            delay: (index * delay) / 1000,
                            ease: easing,
                        };

                        return (
                            <motion.span
                                key={index}
                                className="inline-block will-change-[transform,filter,opacity]"
                                initial={fromSnapshot}
                                animate={inView ? animateKeyframes : fromSnapshot}
                                transition={spanTransition}
                                onAnimationComplete={
                                    index === elements.length - 1 ? onAnimationComplete : undefined
                                }
                            >
                                {segment === " " ? "\u00A0" : segment}
                                {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
                            </motion.span>
                        );
                    })}
                </p>

            </div>
        );
    };

    return (
        <div>
            <motion.section
                id="about"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="w-full flex flex-col items-center text-center px-6 py-12"
            >
                {/* Headline */}
                <BlurText
                    text={text}
                    delay={delay}
                    animateBy={animateBy}
                    direction={direction}
                    className={`${className} bg-gradient-to-r from-amber-400 via-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-xl`}
                />

                {/* Subtext */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    className="mt-6 max-w-3xl text-neutral-400 text-sm md:text-lg lg:text-xl leading-relaxed"
                >
                    <p>
                        Hi, I’m <span className="text-white font-medium">Akshit Bansal</span> — a{" "}
                        <span className="text-amber-400">Full-Stack Developer</span> passionate about
                        crafting practical, scalable, and visually appealing web applications.
                    </p>
                    <p className="mt-3">
                        I specialize in the <span className="text-pink-400">MERN stack</span> and love
                        solving real problems by blending clean code with thoughtful design.
                        From seamless UIs to reliable backends, I enjoy turning ideas into
                        experiences people actually use.
                    </p>
                </motion.div>
            </motion.section>F
        </div>
    );
}