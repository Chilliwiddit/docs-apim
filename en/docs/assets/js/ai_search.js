document.addEventListener("DOMContentLoaded", function () {
    const aiOption = document.getElementById("ai_popup");
    const searchInput = document.getElementsByClassName("md-search__input")[0];
    const aiQueryText = document.querySelector("#ai_popup h1");
    const searchSuggestions  = document.getElementsByClassName("md-search-result__list")[0];
    const searchStats = document.getElementsByClassName("md-search-result__meta")[0];
    const searchOutput = document.getElementsByClassName("md-search__output")[0];
    const ai_response = document.getElementById("ai_response");
    const search_container = document.getElementsByClassName("md-search__scrollwrap")[0];

    searchInput.addEventListener("input", function () {
        const searchText = searchInput.value.trim();

        if (searchText.length > 0) {
            aiOption.style.display = "block"; 
            aiQueryText.textContent = `Ask ME about "${searchText}"!`; 
        } else {
            aiOption.style.display = "none"; 
        }
    });

    aiOption.addEventListener("click", function () {
        const searchText = searchInput.value.trim();

        searchSuggestions.style.display = "none";
        searchStats.style.display = "none";
        ai_response.style.display = "block";
        aiQueryText.textContent = searchText;
        search_container.style.height = "699px"; 
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


  