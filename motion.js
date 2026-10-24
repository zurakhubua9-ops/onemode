(() => {
    "use strict";

    const desktopQuery = window.matchMedia("(min-width: 901px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
    const smoothstep = value => value * value * (3 - 2 * value);
    const rangeProgress = (value, start, end) => clamp((value - start) / (end - start), 0, 1);
    const lerp = (current, target, amount) => current + (target - current) * amount;

    function wrapStage(element, className) {
        if (!element) return null;
        if (element.parentElement?.classList.contains(className)) return element.parentElement;

        const stage = document.createElement("div");
        stage.className = className;
        element.before(stage);
        stage.appendChild(element);
        return stage;
    }

    function stageProgress(stage) {
        if (!stage) return 0;
        const rect = stage.getBoundingClientRect();
        const distance = Math.max(stage.offsetHeight - window.innerHeight, 1);
        return clamp(-rect.top / distance, 0, 1);
    }

    /* -------------------------------
       HERO
    -------------------------------- */

    const hero = document.querySelector(".hero");
    const heroVisual = document.querySelector(".hero-visual");
    const heroImage = document.querySelector(".hero-visual img");
    const heroTitle = document.querySelector(".hero-title");
    const heroTop = document.querySelector(".hero-top");
    const heroBottom = document.querySelector(".hero-bottom");
    const heroStage = wrapStage(hero, "hero-scroll-stage");

    let heroMoveX = 0;
    let heroMoveY = 0;
    let heroCurrent = 0;

    function measureHeroCenter() {
        if (!hero || !heroVisual) return;

        const savedTransform = heroVisual.style.transform;
        heroVisual.style.transform = "none";

        const heroRect = hero.getBoundingClientRect();
        const visualRect = heroVisual.getBoundingClientRect();

        heroMoveX = heroRect.left + heroRect.width / 2 - (visualRect.left + visualRect.width / 2);
        heroMoveY = heroRect.top + heroRect.height / 2 - (visualRect.top + visualRect.height / 2);

        heroVisual.style.transform = savedTransform;
    }

    function renderHero(progress) {
        if (!heroVisual || !heroImage) return;

        const move = smoothstep(rangeProgress(progress, 0.03, 0.48));
        const fade = smoothstep(rangeProgress(progress, 0.76, 0.98));

        heroVisual.style.transform = `translate3d(${heroMoveX * move}px, ${heroMoveY * move}px, 0)`;
        heroVisual.style.opacity = String(1 - fade);
        heroImage.style.transform = `scale(${1 + move * 0.012 + fade * 0.015})`;
        heroImage.style.filter = `saturate(${1 - fade * 0.12})`;

        if (heroTitle) {
            const titleMove = smoothstep(rangeProgress(progress, 0.10, 0.56));
            heroTitle.style.transform = `translate3d(0, ${-55 * titleMove}px, 0)`;
            heroTitle.style.opacity = String(1 - titleMove * 0.90);
        }

        if (heroTop) {
            const meta = smoothstep(rangeProgress(progress, 0.06, 0.32));
            heroTop.style.opacity = String(1 - meta);
        }

        if (heroBottom) {
            const bottom = smoothstep(rangeProgress(progress, 0.14, 0.43));
            heroBottom.style.opacity = String(1 - bottom);
        }
    }

    function resetHero() {
        [heroVisual, heroImage, heroTitle, heroTop, heroBottom].forEach(element => {
            if (!element) return;
            element.style.removeProperty("transform");
            element.style.removeProperty("opacity");
            element.style.removeProperty("filter");
        });
    }

    /* -------------------------------
       NEW ARRIVALS + TRENDING REVEALS
    -------------------------------- */

    function revealOnce(section, elements, className, stagger = 100) {
        if (!section || !elements.length) return;

        if (reducedMotionQuery.matches) {
            elements.forEach(element => element.classList.add(className));
            return;
        }

        const observer = new IntersectionObserver(entries => {
            if (!entries.some(entry => entry.isIntersecting)) return;

            elements.forEach((element, index) => {
                window.setTimeout(() => element.classList.add(className), index * stagger);
            });

            observer.disconnect();
        }, { threshold: 0.14 });

        observer.observe(section);
    }

    const arrivals = document.querySelector(".new-arrivals");
    const arrivalCards = [...document.querySelectorAll(".new-arrivals .product-card")];
    revealOnce(arrivals, arrivalCards, "motion-visible", 90);

    const trendingSection = document.querySelector(".trending-products");
    const trendingCards = [...document.querySelectorAll(".trending-grid .trend-card")];
    revealOnce(trendingSection, trendingCards, "trend-visible", 140);

    /* -------------------------------
       CATEGORY STORY
    -------------------------------- */

    const categoryStory = document.querySelector(".category-story");
    const categoryItems = [...document.querySelectorAll(".category-story-item")];
    const categoryImages = [...document.querySelectorAll(".category-story-image")];
    let activeCategory = -1;

    function setActiveCategory(index) {
        if (index === activeCategory) return;
        activeCategory = index;

        categoryItems.forEach((item, itemIndex) => {
            item.classList.toggle("active", itemIndex === index);
        });

        categoryImages.forEach((image, imageIndex) => {
            image.classList.toggle("active", imageIndex === index);
        });
    }

    function updateCategoryStory() {
        if (!categoryStory || !categoryItems.length || !desktopQuery.matches) return;

        const rect = categoryStory.getBoundingClientRect();
        const distance = Math.max(categoryStory.offsetHeight - window.innerHeight, 1);
        const progress = clamp(-rect.top / distance, 0, 0.999);
        const index = Math.min(categoryItems.length - 1, Math.floor(progress * categoryItems.length));
        setActiveCategory(index);
    }

    if (categoryItems.length) setActiveCategory(0);

    /* -------------------------------
       BRAND HOVER PREVIEW
    -------------------------------- */

    const brandRows = [...document.querySelectorAll(".brand-row")];
    const brandPreviewImages = {
        cos: "assets/nrove-coat.jpg",
        arket: "assets/category-men.jpg",
        acne: "assets/tailored.png",
        ami: "assets/varel-blazer.jpg",
        ganni: "assets/category-women.avif",
        weekday: "assets/korai-hoodie.jpg",
        mm6: "assets/avant-garde.png",
        salomon: "assets/techwear.png"
    };

    let preview = null;
    let previewImage = null;
    let previewMouseX = window.innerWidth / 2;
    let previewMouseY = window.innerHeight / 2;
    let previewX = previewMouseX;
    let previewY = previewMouseY;

    if (brandRows.length && window.matchMedia("(hover: hover)").matches) {
        preview = document.createElement("div");
        preview.className = "brand-hover-preview";
        preview.innerHTML = `
            <div class="brand-hover-preview-inner">
                <img src="" alt="">
                <span>VIEW BRAND ↗</span>
            </div>
        `;
        document.body.appendChild(preview);
        previewImage = preview.querySelector("img");

        brandRows.forEach(row => {
            row.addEventListener("mouseenter", () => {
                const url = new URL(row.href, window.location.href);
                const slug = url.searchParams.get("brand");
                const image = brandPreviewImages[slug];
                if (!image || !previewImage) return;
                previewImage.src = image;
                preview.classList.add("active");
            });

            row.addEventListener("mousemove", event => {
                previewMouseX = event.clientX;
                previewMouseY = event.clientY;
            });

            row.addEventListener("mouseleave", () => preview?.classList.remove("active"));
        });
    }

    /* -------------------------------
       EDITORIAL STORY
    -------------------------------- */

    const editorial = document.querySelector(".editorial");
    const editorialImage = document.querySelector(".editorial-image");
    const editorialPhoto = document.querySelector(".editorial-image img");
    const editorialContent = document.querySelector(".editorial-content");
    const editorialStage = wrapStage(editorial, "editorial-stage");
    let editorialCurrent = 0;

    function renderEditorial(progress) {
        if (!editorial || !editorialImage || !editorialPhoto || !editorialContent) return;

        const close = smoothstep(rangeProgress(progress, 0.12, 0.72));
        editorial.style.setProperty("--editorial-panel", `${44 - close * 44}%`);
        editorialContent.style.opacity = String(1 - close);
        editorialContent.style.transform = `translate3d(${close * 90}px, 0, 0)`;
        editorialPhoto.style.transform = `scale(${1.08 - close * 0.08})`;
        editorialPhoto.style.filter = `saturate(${0.82 + close * 0.18}) contrast(${1.05 - close * 0.05})`;
    }

    function resetEditorial() {
        if (!editorial) return;
        editorial.style.setProperty("--editorial-panel", "44%");
        [editorialContent, editorialPhoto].forEach(element => {
            if (!element) return;
            element.style.removeProperty("opacity");
            element.style.removeProperty("transform");
            element.style.removeProperty("filter");
        });
    }

    /* -------------------------------
       BRAND SPOTLIGHT
    -------------------------------- */

    const spotlight = document.querySelector(".brand-spotlight");
    const spotlightMedia = document.querySelector(".spotlight-media");
    const spotlightImage = document.querySelector(".spotlight-media img");
    const spotlightContent = document.querySelector(".spotlight-content");
    const spotlightTitle = document.querySelector(".spotlight-content h2");
    const spotlightDescription = document.querySelector(".spotlight-description");
    const spotlightStage = wrapStage(spotlight, "spotlight-stage");
    let spotlightCurrent = 0;

    function renderSpotlight(progress) {
        if (!spotlightMedia || !spotlightImage || !spotlightContent) return;

        const movement = smoothstep(rangeProgress(progress, 0.05, 0.82));
        spotlightMedia.style.transform = `translate3d(0, ${-45 * movement}px, 0)`;
        spotlightImage.style.transform = `scale(${1.08 - 0.08 * movement})`;
        spotlightContent.style.transform = `translate3d(0, ${45 * movement}px, 0)`;

        if (spotlightTitle) {
            spotlightTitle.style.transform = `translate3d(${-70 * movement}px, 0, 0)`;
        }

        if (spotlightDescription) {
            const fade = smoothstep(rangeProgress(progress, 0.20, 0.70));
            spotlightDescription.style.opacity = String(1 - fade * 0.55);
        }
    }

    function resetSpotlight() {
        [spotlightMedia, spotlightImage, spotlightContent, spotlightTitle, spotlightDescription].forEach(element => {
            if (!element) return;
            element.style.removeProperty("transform");
            element.style.removeProperty("opacity");
        });
    }

    /* -------------------------------
       HOME FINALE
    -------------------------------- */

    const motionSection = document.querySelector(".motion-section");
    const motionText = document.querySelector(".motion-text");
    const newsletter = document.querySelector(".newsletter");
    const newsletterTitle = document.querySelector(".newsletter-left h2");
    const newsletterLabel = document.querySelector(".newsletter-left > p");
    const newsletterRight = document.querySelector(".newsletter-right");

    let finaleStage = null;
    let finaleSticky = null;
    let finaleCurrent = 0;

    if (motionSection && newsletter) {
        if (motionSection.parentElement?.classList.contains("finale-sticky")) {
            finaleSticky = motionSection.parentElement;
            finaleStage = finaleSticky.parentElement;
        } else {
            finaleStage = document.createElement("section");
            finaleStage.className = "finale-stage";

            finaleSticky = document.createElement("div");
            finaleSticky.className = "finale-sticky";

            motionSection.before(finaleStage);
            finaleStage.appendChild(finaleSticky);
            finaleSticky.appendChild(motionSection);
            finaleSticky.appendChild(newsletter);
        }
    }

    function renderFinale(progress) {
        if (!finaleSticky || !motionText || !newsletter) return;

        const marquee = smoothstep(rangeProgress(progress, 0, 0.80));
        motionText.style.transform = `translate3d(${-22 * marquee}vw, 0, 0)`;

        if (newsletterTitle) {
            const title = smoothstep(rangeProgress(progress, 0.12, 0.50));
            newsletterTitle.style.transform = `translate3d(0, ${85 * (1 - title)}px, 0)`;
            newsletterTitle.style.opacity = String(title);
        }

        if (newsletterLabel) {
            const label = smoothstep(rangeProgress(progress, 0.08, 0.34));
            newsletterLabel.style.opacity = String(label);
        }

        if (newsletterRight) {
            const right = smoothstep(rangeProgress(progress, 0.28, 0.67));
            newsletterRight.style.transform = `translate3d(0, ${55 * (1 - right)}px, 0)`;
            newsletterRight.style.opacity = String(right);
        }
    }

    function resetFinale() {
        [motionText, newsletterTitle, newsletterLabel, newsletterRight].forEach(element => {
            if (!element) return;
            element.style.removeProperty("transform");
            element.style.removeProperty("opacity");
        });
    }

    /* -------------------------------
       ONE ANIMATION LOOP
    -------------------------------- */

    function frame() {
        const desktop = desktopQuery.matches;
        const reduceMotion = reducedMotionQuery.matches;

        if (desktop && !reduceMotion) {
            heroCurrent = lerp(heroCurrent, stageProgress(heroStage), 0.065);
            renderHero(heroCurrent);

            editorialCurrent = lerp(editorialCurrent, stageProgress(editorialStage), 0.07);
            renderEditorial(editorialCurrent);

            spotlightCurrent = lerp(spotlightCurrent, stageProgress(spotlightStage), 0.07);
            renderSpotlight(spotlightCurrent);

            finaleCurrent = lerp(finaleCurrent, stageProgress(finaleStage), 0.065);
            renderFinale(finaleCurrent);

            updateCategoryStory();
        }

        if (preview) {
            previewX = lerp(previewX, previewMouseX, 0.09);
            previewY = lerp(previewY, previewMouseY, 0.09);
            preview.style.transform = `translate3d(${previewX + 28}px, ${previewY - 150}px, 0)`;
        }

        requestAnimationFrame(frame);
    }

    function resetForViewport() {
        if (desktopQuery.matches && !reducedMotionQuery.matches) {
            measureHeroCenter();
            return;
        }

        resetHero();
        resetEditorial();
        resetSpotlight();
        resetFinale();
    }

    const scheduleMeasure = () => requestAnimationFrame(() => requestAnimationFrame(measureHeroCenter));

    window.addEventListener("resize", () => {
        resetForViewport();
        scheduleMeasure();
    }, { passive: true });

    window.addEventListener("load", scheduleMeasure, { once: true });
    desktopQuery.addEventListener?.("change", resetForViewport);
    reducedMotionQuery.addEventListener?.("change", resetForViewport);

    scheduleMeasure();
    resetForViewport();
    frame();
})();
