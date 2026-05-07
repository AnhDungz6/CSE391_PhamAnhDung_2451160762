const skillBars = document.querySelectorAll(".skill-progress");

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate");
    }
  });
});

skillBars.forEach((bar) => {
  observer.observe(bar);
});
