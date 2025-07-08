const accessKey = "GGicNmSGumGSeKDB6ZRAxslNyNGWWE-mOGEyFF4ruW0";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");

// Loader element
const loader = document.getElementById("loader");

let keyword = "";
let page = 1;

async function searchImages() {
  loader.style.display = "block"; // Show loader

  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

  const response = await fetch(url);
  const data = await response.json();

  loader.style.display = "none"; // Hide loader

  if (page === 1) {
    searchResult.innerHTML = "";
  }

  data.results.forEach((result) => {
    const container = document.createElement("div");
    container.classList.add("image-card");

    const img = document.createElement("img");
    img.src = result.urls.small;

    const downloadBtn = document.createElement("a");
    downloadBtn.href = result.urls.full;
    downloadBtn.download = "image.jpg";
    downloadBtn.textContent = "Download";
    downloadBtn.classList.add("download-btn");
    downloadBtn.target = "_blank";
    downloadBtn.rel = "noopener noreferrer";

    container.appendChild(img);
    container.appendChild(downloadBtn);
    searchResult.appendChild(container);
  });

  if (data.total_pages > page) {
    showMoreBtn.style.display = "inline-block";
  } else {
    showMoreBtn.style.display = "none";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  keyword = searchBox.value.trim();
  page = 1;
  if (keyword !== "") {
    searchImages();
  }
});

showMoreBtn.addEventListener("click", () => {
  page++;
  searchImages();
});
