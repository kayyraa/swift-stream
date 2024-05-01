import all from "./modules/suffixes.js";

const Options = {
    Version: "13.11.07.21.2",
    NSR: 1750,
};

document.addEventListener("DOMContentLoaded", function() {
    const SearchButton = document.getElementById("search-button");
    const SearchInput = document.getElementById("search-input");
    const VersionText = document.getElementById("version-text");
    const Notification = document.getElementById("notification-container");
    const NotificationText = document.getElementById("notification-text");

    VersionText.innerHTML = Options.Version;

    function Notify(notificationText, duration) {
        NotificationText.innerHTML = notificationText;
        Notification.style.left = "10px";
        setTimeout(() => {
            Notification.style.left = "-400px";
        }, duration);
    }

    function Search(input) {
        const ModifiedInput = input.trim();
        if (ModifiedInput.startsWith("http://") || ModifiedInput.startsWith("https://")) {
            window.open(ModifiedInput, "_self");
        } else if (ModifiedInput !== "") {
            window.open(`https://www.google.com/search?q=${input}`, "_self");
        }
    }

    SearchButton.addEventListener("click", function() {
        if (SearchInput.value.trim() === "") {
            Notify("Please enter a search.", Options.NSR);
        } else {
            Search(SearchInput.value);
        }
    });
    
    document.addEventListener("keypress", function(event) {
        const KeyCode = event.key;
        if (KeyCode === "Enter") {
            if (SearchInput.value.trim() === "") {
                Notify("Please enter a search.", Options.NSR);
            } else {
                Search(SearchInput.value);
            }
        }
    });

    function Refresh() {
        const ModifiedInput = SearchInput.value.trim();
        let endsWithSuffix = false;
        all.forEach(suffix => {
            if (ModifiedInput.endsWith(suffix)) {
                endsWithSuffix = true;
            }
        });
        if (ModifiedInput.startsWith("http://") || ModifiedInput.startsWith("https://")) {
            if (endsWithSuffix) {
                SearchInput.style.color = "rgb(0, 0, 0)";
            } else {
                SearchInput.style.color = "rgb(200, 0, 0)";
            }
        }
        setTimeout(() => {
            Refresh();
        }, 50);
    }

    Refresh();
});