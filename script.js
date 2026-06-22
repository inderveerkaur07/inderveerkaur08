document.addEventListener("DOMContentLoaded", () => {
    // 1. Progress Bar Logic
    const progressBar = document.getElementById("progress-bar");

    window.addEventListener("scroll", () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercent + "%";
    });

    // 2. SVG Background Spine Drawing
    const spineProgress = document.getElementById("spine-progress");
    if (spineProgress) {
        const pathLength = spineProgress.getTotalLength();
        
        spineProgress.style.strokeDasharray = pathLength;
        spineProgress.style.strokeDashoffset = pathLength;

        window.addEventListener("scroll", () => {
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrollPercentage = scrollTop / scrollHeight;
            
            const drawLength = pathLength * scrollPercentage;
            spineProgress.style.strokeDashoffset = pathLength - drawLength;
        });
    }

    // 3. 3D Tilt Effect on Hero Image
    const imgFrame = document.querySelector(".hero-image-frame");

    if (imgFrame) {
        imgFrame.addEventListener("mousemove", (e) => {
            const rect = imgFrame.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate rotation (restricted for subtlety)
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            imgFrame.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        imgFrame.addEventListener("mouseleave", () => {
            imgFrame.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    // 4. Scroll Reveal Observer
    const revealElements = document.querySelectorAll(".reveal");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Reveal only once for premium feel
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Trigger hero reveal immediately on load
    setTimeout(() => {
        const heroReveals = document.querySelectorAll("#hero .reveal");
        heroReveals.forEach(el => el.classList.add("active"));
    }, 100);
});