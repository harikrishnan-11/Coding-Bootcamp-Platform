const reveals = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
        }else{
            entry.target.classList.remove("active")
        }
    });
}, {
    threshold: 0.3
});

reveals.forEach(item => observer.observe(item));