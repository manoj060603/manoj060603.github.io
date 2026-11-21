"use strict";

const papers = [...document.querySelectorAll("[data-paper]")];
const groups = [...document.querySelectorAll("[data-publication-group]")];
const count = document.getElementById("paper-count");
const filters = [...document.querySelectorAll("[data-filter]")];

function applyFilter(value) {
  let visible = 0;
  papers.forEach(paper => {
    paper.hidden = value !== "all" && !paper.dataset.categories.split(" ").includes(value);
    if (!paper.hidden) visible++;
  });
  groups.forEach(group => {
    group.hidden = ![...group.querySelectorAll("[data-paper]")].some(paper => !paper.hidden);
  });
  filters.forEach(button => {
    button.setAttribute("aria-pressed", String(button.dataset.filter === value));
  });
  count.textContent = value === "all"
    ? "21 papers · 8 conference and journal papers · 13 workshop papers and posters"
    : `${visible} of ${papers.length} papers shown`;
}

filters.forEach(button => button.addEventListener("click", () => applyFilter(button.dataset.filter)));
