function displayDate() {
    var today = new Date(); 
    var date = today.toDateString(); 
    document.getElementById("date").innerHTML = date; 
}
const apikey = 'UmoAewQyGGZ6vzmCk6XnA6JohkpoZrH9';

document.addEventListener("DOMContentLoaded", async () => {
    const blogContainer = document.getElementById('bg-container');

    if (!blogContainer) {
        console.error("Element with ID 'bg-container' not found.");
        return;
    }

    async function fetchRandomNews() {
        try {
            const apiUrl = `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${apikey}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.results || [];
        } catch (error) {
            console.error("Error fetching random news", error);
            return [];
        }
    }

    function displayBlogs(articles) {
        if (!Array.isArray(articles)) {
            console.error("Expected an array of articles, but got:", articles);
            return;
        }

        blogContainer.innerHTML = "";
        articles.forEach((article) => {
            const blogCard = document.createElement("div");
            blogCard.classList.add("blog-card");

            const img = document.createElement("img");
            img.src = article.multimedia && article.multimedia.length > 0 ? article.multimedia[0].url : "default.jpg";
            img.alt = article.title;

            const title = document.createElement("h2");
            title.textContent = article.title;

            const description = document.createElement("p");
            description.textContent = article.abstract; 

            blogCard.appendChild(img);
            blogCard.appendChild(title);
            blogCard.appendChild(description);
            blogContainer.appendChild(blogCard);
        });
    }

    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
});

function handleSelection(select) {
    var url = select.value;
    if (url !== "#") {
        window.location.href = url;
    }
}


// `https://api.nytimes.com/svc/topstories/v2/business.json?api-key=${apikey}`