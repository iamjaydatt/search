const apiKey = "AIzaSyAFBA7p4HPqZ1SLTRiaoN8GoYDDZQO8e40"; // Replace with Google API Key
const cx = "06c8c6de054a44be6"; // Replace with Custom Search Engine ID

document.getElementById("searchForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  const query = document.getElementById("searchInput").value.trim();
  if (!query) return;

  const resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = `<p>Searching for "<strong>${query}</strong>"...</p>`;

  try {
    const response = await fetch(
      `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}`
    );
    const data = await response.json();

    if (!data.items) {
      resultsContainer.innerHTML = "<p>No results found.</p>";
      return;
    }

    resultsContainer.innerHTML = data.items.map(item => `
      <div class="result-item">
        <a href="${item.link}" target="_blank">${item.title}</a>
        <span class="result-link">${item.link}</span>
        <p class="result-snippet">${item.snippet}</p>
      </div>
    `).join("");
  } catch (error) {
    resultsContainer.innerHTML = "<p>Error fetching results. Please try again.</p>";
    console.error(error);
  }
});
