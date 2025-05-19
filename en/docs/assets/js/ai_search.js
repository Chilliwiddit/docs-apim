document.addEventListener("DOMContentLoaded", function () {
    const aiOption = document.getElementById("ai_popup");
    const searchInput = document.getElementsByClassName("md-search__input")[0];
    const aiQueryText = document.querySelector("#ai_popup h1");
    const searchSuggestions  = document.getElementsByClassName("md-search-result__list")[0];
    const searchStats = document.getElementsByClassName("md-search-result__meta")[0];
    const searchOutput = document.getElementsByClassName("md-search__output")[0];
    const ai_response = document.getElementById("ai_response");
    // const search_container = document.getElementsByClassName("md-search__scrollwrap")[0];
    const loader = document.getElementsByClassName("loader")[0];

    let aiResponseText = document.getElementById("ai_response_text");

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim();

        if (searchText.length > 0) {
            aiOption.style.display = "flex"; 
            aiQueryText.textContent = `Ask ME about "${searchText}"!`; 
        } else {
            aiOption.style.display = "none"; 
        }
    });

    aiOption.addEventListener("click", async function () {
        if (loader.style.display == "none") {
            loader.style.display = "block";
        }
        const searchText = searchInput.value.trim();

        searchSuggestions.style.display = "none";
        searchStats.style.display = "none";
        ai_response.style.display = "block";
        aiResponseText.innerHTML = "";
        aiQueryText.textContent = searchText;

        const URL = "<URL>"; 
    
        const socket = new WebSocket(URL);
    
        socket.onopen = () => {
            console.log("WebSocket connection opened");
    
            const payload = {
                questions: [searchText],
                question_context: "string",
                x_request_id: ""
            };
            socket.send(JSON.stringify(payload));
        };
    
        let fullContent = "";
    
        socket.onmessage = (event) => {
            const chunk = event.data;
            fullContent += chunk;
            aiResponseText.innerHTML = marked.parse(fullContent);
        };
    
        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
            aiResponseText.innerHTML = "Error while processing your request. Please try again later.";
            loader.style.display = "none";
        };
    
        socket.onclose = (event) => {
            console.log("WebSocket closed:", event.reason);
            loader.style.display = "none";
        };
    });

    document.addEventListener("click", function (event) {
        const searchText = searchInput.value.trim();
        if (!searchInput.contains(event.target) && !searchOutput.contains(event.target)) {
            searchSuggestions.style.display = "block";
            searchStats.style.display = "block";
            ai_response.style.display = "none";
            if (searchText.length > 0) {
                aiQueryText.textContent = `Ask ME about "${searchText}"!`; 
            } 
        }
    });

});


  