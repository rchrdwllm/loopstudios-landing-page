import { mobileImages, desktopImages } from "./images";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";

window.addEventListener("load", init);
window.addEventListener("resize", () => {
    const width = window.innerWidth;

    updateImages(width);
    updateNavLinks(width);
});

function init() {
    const width = window.innerWidth;

    gsap.registerPlugin(ScrollTrigger);
    gsap.defaults({
        duration: 1,
        ease: "power4.out",
    });

    updateImages(width);
    locoScroll();
    navAnimations();
    menuAnimations();
    loadPage();
}

function loadPage() {
    const loader = document.querySelector(".loader");
    const loaderLogo = loader.querySelector(".logo");
    const imagesLoaded = require("imagesloaded");
    const images = document.querySelectorAll("img");

    imagesLoaded(images, () => {
        gsap.timeline()
            .to(
                loader,
                {
                    backgroundColor: "rgba(0, 0, 0, 0)",
                    backdropFilter: "blur(0px)",
                    pointerEvents: "none",
                },
                "+=1"
            )
            .to(
                loaderLogo,
                {
                    opacity: 0,
                },
                "-=0.75"
            );
    });
}

function updateImages(width) {
    const heroImg = document.querySelector("header .img-container img");
    const curiosityImg = document.querySelector(
        ".curiosity .img-container img"
    );
    const deepEarthImg = document.querySelector(
        ".deep-earth .img-container img"
    );
    const fisheyeImg = document.querySelector(".fisheye .img-container img");
    const fromAboveImg = document.querySelector(
        ".from-above .img-container img"
    );
    const gridImg = document.querySelector(".grid .img-container img");
    const interactiveImg = document.querySelector(".intro .img-container img");
    const nightArcadeImg = document.querySelector(
        ".night-arcade .img-container img"
    );
    const pocketBorealisImg = document.querySelector(
        ".pocket-borealis .img-container img"
    );
    const soccerTeamImg = document.querySelector(
        ".soccer-team .img-container img"
    );
    const imgsArr = [
        heroImg,
        curiosityImg,
        deepEarthImg,
        fisheyeImg,
        fromAboveImg,
        gridImg,
        interactiveImg,
        nightArcadeImg,
        pocketBorealisImg,
        soccerTeamImg,
    ];

    if (width >= 1024) {
        imgsArr.forEach((img, i) => {
            img.setAttribute("src", desktopImages[i]);
        });
    } else {
        imgsArr.forEach((img, i) => {
            img.setAttribute("src", mobileImages[i]);
        });
    }
}

function locoScroll() {
    const imagesLoaded = require("imagesloaded");
    const images = document.querySelectorAll("img");
    const smoothScroll = document.querySelector(".smooth-scroll");

    const scroller = new LocomotiveScroll({
        el: smoothScroll,
        smooth: true,
    });

    scroller.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(smoothScroll, {
        scrollTop(value) {
            return arguments.length
                ? scroller.scrollTo(value, 0, 0)
                : scroller.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return {
                left: 0,
                top: 0,
                width: window.innerWidth,
                height: window.innerHeight,
            };
        },
        pinType: smoothScroll.style.transform ? "transform" : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => scroller.update());
    ScrollTrigger.refresh();

    window.addEventListener("resize", () => scroller.update());

    imagesLoaded(images, () => scroller.update());
}

function navAnimations() {
    const nav = document.querySelector("nav");
    const main = document.querySelector("main");

    ScrollTrigger.create({
        trigger: main,
        start: `top ${nav.clientHeight}`,
        end: () => `+=${document.body.clientHeight}`,
        scroller: ".smooth-scroll",
        toggleActions: "play none none reverse",
        toggleClass: {
            targets: nav,
            className: "inverse",
        },
    });
}

function menuAnimations() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("nav");
    const menu = document.querySelector("nav .nav-links");
    const links = menu.querySelectorAll("li a");

    let isOpen = false;

    burger.addEventListener("click", () => {
        if (isOpen) {
            if (nav.classList.contains("colored"))
                nav.classList.remove("colored");

            nav.classList.remove("open");

            gsap.timeline()
                .to(links, {
                    y: "100%",
                    stagger: 0.05,
                })
                .to(
                    menu,
                    {
                        opacity: 0,
                        pointerEvents: "none",
                    },
                    "-=0.5"
                );

            isOpen = false;
        } else {
            if (nav.classList.contains("inverse")) nav.classList.add("colored");

            nav.classList.add("open");

            gsap.timeline()
                .to(menu, {
                    opacity: 1,
                    pointerEvents: "all",
                })
                .to(
                    links,
                    {
                        y: 0,
                        stagger: 0.05,
                    },
                    "-=0.5"
                );

            isOpen = true;
        }
    });
}

function updateNavLinks(width) {
    const nav = document.querySelector("nav");
    const linksContainer = nav.querySelector(".nav-links");
    const navLinks = linksContainer.querySelectorAll("li a");

    if (width >= 1024) {
        nav.classList.remove("colored");

        linksContainer.style.opacity = 1;

        navLinks.forEach((link) => {
            link.style.transform = "translateY(0)";
        });
    } else {
        linksContainer.style.opacity = 0;

        navLinks.forEach((link) => {
            link.style.transform = "translateY(100%)";
        });
    }
}
