async function fetchNewsContents(api1, api2) {
  const response1 = await fetch(api1);
  const data1 = await response1.json();

  const response2 = await fetch(api2);
  const data2 = await response2.json();

  return [data1, data2];
}

function renderNewsContents(data1, data2) {
  const newsContainer = document.getElementById("news-container");

  data1.forEach((newsContent) => {
    const newsItem = document.createElement("li");
    newsItem.classList.add("news-item");

    const newsImage = document.createElement("img");
    newsImage.src = newsContent.image_url;
    newsItem.appendChild(newsImage);

    const author = data2.find((author) => author.id === newsContent.author_id);

    const newsAuthor = document.createElement("p");
    newsAuthor.textContent = `By ${author.name} (${author.role} (${author.place})`;
    newsItem.appendChild(newsAuthor);

    const newsTitle = document.createElement("h1");
    newsTitle.textContent = newsContent.title;
    newsItem.appendChild(newsTitle);

    const newsBody = document.createElement("h4");
    newsBody.textContent = newsContent.body;
    newsItem.appendChild(newsBody);

    newsContainer.appendChild(newsItem);
  });
}

window.addEventListener("load", async () => {
  const [data1, data2] = await fetchNewsContents(
    "https://tmsph-sdi-challenges.pages.dev/challenges/news.json",
    "https://tmsph-sdi-challenges.pages.dev/challenges/authors.json"
  );
  renderNewsContents(data1, data2);
  console.log(data1, data2);
});
