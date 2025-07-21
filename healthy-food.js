// healthy-food.js

// CATEGORY-ONLY SEARCH
const hfSearchInput = document.getElementById("hfSearch");
const hfCategorySections = document.querySelectorAll(".hf-cat");

hfSearchInput?.addEventListener("input", () => {
  const q = hfSearchInput.value.trim().toLowerCase();

  hfCategorySections.forEach(section => {
    const cat = (section.dataset.cat || "").toLowerCase();
    // Show entire category if query empty OR cat matches query
    section.style.display = (q === "" || cat.includes(q)) ? "" : "none";
  });
});

// Card click info popup (unchanged)
document.addEventListener("click", (e) => {
  const card = e.target.closest(".hf-card");
  if (!card) return;
  const brand = card.dataset.name || card.querySelector("h3")?.textContent || "Brand";
  alert(`${brand}\n\nFor best results, choose the variant with fewer additives, lower refined sugar, and no hydrogenated fats. Always check the label!`);
});
