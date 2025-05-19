export const searchWeb = async (query) => {
  try {
    console.log("Searching for:", query);
    const res = await fetch('/news.json');
    const data = await res.json();
    console.log("Data:", data);

    const results = data.articles.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    console.log("Filtered Results:", results);
    return results;
  } catch (error) {
    console.error("Error reading news.json:", error);
    return [];
  }
};


window.searchWeb = searchWeb;
