(() => {
  const container = document.getElementById("container");
  const readableWidthInput = document.querySelector('input[name="readable"]');
  const sizeInput = document.querySelector('input[name="size"]');
  const themeSelect = document.querySelector('select[name="theme"]');
  const typefaceSelect = document.querySelector('select[name="typeface"]');

  // Get data from local storage
  const notes = localStorage.getItem("notes");
  if (notes) container.innerHTML = JSON.parse(notes);

  let readableWidth = localStorage.getItem("readable-width");
  readableWidth = readableWidth ? JSON.parse(readableWidth) : false;
  container.setAttribute("data-readable-width", readableWidth);
  readableWidthInput.checked = readableWidth;

  let size = localStorage.getItem("size");
  size = size ? JSON.parse(size) : 20;
  container.style.fontSize = size + "px";
  sizeInput.value = size;

  let theme = localStorage.getItem("theme");
  theme = theme ? JSON.parse(theme) : "light";
  document.body.setAttribute("data-theme", theme);
  themeSelect.value = theme;

  let typeface = localStorage.getItem("typeface");
  typeface = typeface ? JSON.parse(typeface) : "monospace";
  container.setAttribute("data-typeface", typeface);
  typefaceSelect.value = typeface;

  // Add event listeners
  readableWidthInput.addEventListener("change", (event) => {
    localStorage.setItem(
      "readable-width",
      JSON.stringify(event.target.checked)
    );
    container.setAttribute("data-readable-width", event.target.checked);
  });

  sizeInput.addEventListener("change", (event) => {
    if (event.target.validity.valid) {
      localStorage.setItem("size", JSON.stringify(event.target.value));
      container.style.fontSize = event.target.value + "px";
    }
  });

  themeSelect.addEventListener("change", (event) => {
    localStorage.setItem("theme", JSON.stringify(event.target.value));
    document.body.setAttribute("data-theme", event.target.value);
  });

  typefaceSelect.addEventListener("change", (event) => {
    localStorage.setItem("typeface", JSON.stringify(event.target.value));
    container.setAttribute("data-typeface", event.target.value);
  });

  container.addEventListener("input", () => {
    localStorage.setItem("notes", JSON.stringify(container.innerHTML));
  });

  window.addEventListener("keydown", (event) => {
    if (
      event.key === "s" &&
      event.shiftKey &&
      (event.metaKey || event.ctrlKey)
    ) {
      event.preventDefault();
      if (!window.toastTimeout) {
        const toast = document.createElement("div");
        toast.setAttribute("aria-live", "polite");
        toast.classList.add("toast");
        toast.setAttribute("role", "log");
        toast.textContent =
          "All changes are saved automatically. To save this page, go through the browser menu.";
        document.body.appendChild(toast);

        window.toastTimeout = setTimeout(() => {
          toast.remove();
          delete window.toastTimeout;
        }, 10 * 1000);
      }
    }
  });
})();
