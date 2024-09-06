const HistoryDivision = document.getElementById("history");

function GetHistory() {
    const History = localStorage.getItem("History");
    if (History !== null) {
        return JSON.parse(History);
    } else {
        return []; // Return an empty array if there is no history
    }
}

function AddToDivision(Division, History) {
    Division.innerHTML = "";
    if (History.length === 0) {
        const noHistoryMessage = document.createElement("div");
        noHistoryMessage.innerHTML = "No history items found.";
        noHistoryMessage.classList.add("no-history-message");
        Division.appendChild(noHistoryMessage);
        return; // Exit the function if there are no history items
    }
    
    for (let i = History.length - 1; i >= 0; i--) {
        const Div = document.createElement("div");
        Div.dataset.index = i;  // Use index instead of item for easier removal
        Div.innerHTML = History[i];
        Div.classList.add("history-item");
        Division.appendChild(Div);

        Div.addEventListener("click", function () {
            if (History[i].startsWith("https://")) {
                window.open(History[i], "_self");
            } else {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(History[i])}`, "_self");
            }
        });

        Div.addEventListener("contextmenu", function(e) {
            e.preventDefault();
        });

        let holdTimeout;

        Div.addEventListener("mousedown", function(e) {
            if (e.button === 0) {
                Div.style.color = "red";
                holdTimeout = setTimeout(function() {
                    const index = Div.dataset.index;
                    History.splice(index, 1);
                    localStorage.setItem("History", JSON.stringify(History));
                    Division.removeChild(Div); 

                    if (History.length === 0) {
                        AddToDivision(Division, History);
                    }
                }, 1000);
            }
        });

        Div.addEventListener("mouseup", function() {
            clearTimeout(holdTimeout);
            Div.style.color = "white";
        });

        Div.addEventListener("mouseleave", function() {
            clearTimeout(holdTimeout);
            Div.style.color = "white";
        });
    }
}

AddToDivision(HistoryDivision, GetHistory());