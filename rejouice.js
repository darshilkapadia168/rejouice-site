function locoscroll() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
}
locoscroll();

function cursoreffect() {
    var page1content = document.querySelector(".page1-content")
    var cursor = document.querySelector(".cursor");

    page1content.addEventListener("mousemove", (dets) => {
        gsap.to(cursor, {
            x: dets.x,
            y: dets.y
        })
    })

    page1content.addEventListener("mouseenter", (dets) => {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        })
    })


    page1content.addEventListener("mouseleave", (dets) => {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        })
    })


}
cursoreffect();

function page2animation() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".elem h1 span", {
        y: 120,
        duration: 3,
        stagger: 0.4,
        opacity: 0,
        scrollTrigger: {
            trigger: ".elem",
            scroller: ".main",
            start: "top 27%",
            end: "top 26%",
            scrub: 2
        }
    })
}
page2animation();

function page4animation() {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".page4-elem h1 span", {
        y: 120,
        duration: 3,
        stagger: 0.4,
        opacity: 0,
        scrollTrigger: {
            trigger: ".page4-elem",
            scroller: ".main",
            start: "top 27%",
            end: "top 26%",
            scrub: 2,
            onEnter: () => page4content.style.cursor = 'none',
            onLeaveBack: () => page4content.style.cursor = 'none'
        }
    })
}
page4animation();

function cursor2() {
    var page4content = document.querySelector(".page4-content");
    var cursor = document.querySelector(".cursor2");

    var cursorWidth = cursor.offsetWidth;
    var cursorHeight = cursor.offsetHeight;

    page4content.style.cursor = 'none';

    page4content.addEventListener("mousemove", function (dets) {
        gsap.to(cursor, {
            x: dets.x - cursorWidth / 2,
            y: dets.y - cursorHeight / 2
        });
    });
    page4content.addEventListener("mouseenter", function (dets) {
        gsap.to(cursor, {
            scale: 1,
            opacity: 1
        });
    });
    page4content.addEventListener("mouseleave", function (dets) {
        gsap.to(cursor, {
            scale: 0,
            opacity: 0
        });
        page4content.style.cursor = 'auto';
    });
}
cursor2();

function page5swipper() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2500,
            disableOnInteraction: true,
        },
    });
}
page5swipper();

var tl = gsap.timeline();

tl.from(".loader h3", {
    x: 40,
    opacity: 0,
    duration: 1,
    stagger: 0.1
});
tl.to(".loader h3", {
    opacity: 0,
    x: -40,
    duration: 1,
    stagger: 0.1
});
tl.to(".loader", {
    opacity: 0,
});
tl.from(".page1-content h1 span", {
    y: 100,
    opacity: 0,
    stagger: 0.1,
    duration: 0.1,
    delay: -0.5
})
tl.to(".loader", {
    display: "none"
});
