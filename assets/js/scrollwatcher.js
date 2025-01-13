if (!(CSS.supports("animation-timeline: scroll()"))) {
    const scroll = document.querySelector(".scroll-up"),rootElement = document.documentElement;
    function handleScroll() {
        rootElement.scrollTop / (rootElement.scrollHeight - rootElement.clientHeight) > .4 ? scroll.classList.add("show") : scroll.classList.remove("show");
    }
    document.addEventListener("scroll", handleScroll);
}