import { all as suffixes } from "./modules/suffixes.js";
import * as ds from "./modules/datastore.js";

const Options = {
    NSR: 2250,
};

document.addEventListener("DOMContentLoaded", function() {
    const SearchButton = document.getElementById("search-button");
    const SearchInput = document.getElementById("search-input");
    const Notification = document.getElementById("notification-container");
    const NotificationText = document.getElementById("notification-text");
    const AppsButton = document.getElementById("apps-button");
    const Apps = document.getElementById("apps");

    const AllApps = {
        Dictionary: document.getElementById("dictionary-button"),
    };
    
    if (ds.Load("username") && ds.Load("password")) {
        const history = ds.Load("History");
        if (history) {
            SearchInput.value = history;
        }
    }

    AllApps.Dictionary.addEventListener("click", function() {
        window.open("apps/dictionary.html", "_self");
    });

    AppsButton.addEventListener("click", function() {
        const isEnabled = Apps.dataset.enabled === "true";
        Apps.style.top = isEnabled ? "-55%" : "0.75%";
        Apps.dataset.enabled = !isEnabled;
    });

    function Notify(notificationText, duration) {
        NotificationText.textContent = notificationText;
        Notification.style.left = "10px";
        setTimeout(() => {
            Notification.style.left = "-400px";
        }, duration);
    }

    function Search(input) {
        const history = ds.Load("History");
        if (history) {
            ds.Save("History", input);
        }
        const ModifiedInput = input.trim();
        if (ModifiedInput.startsWith("http://") || ModifiedInput.startsWith("https://")) {
            window.open(ModifiedInput, "_self");
        } else if (ModifiedInput !== "") {
            window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_self");
        }
    }

    SearchButton.addEventListener("click", function() {
        const trimmedValue = SearchInput.value.trim();
        if (trimmedValue === "") {
            Notify("Please enter a search.", Options.NSR);
        } else {
            Search(trimmedValue);
        }
    });
    
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const trimmedValue = SearchInput.value.trim();
            if (trimmedValue === "") {
                Notify("Please enter a search.", Options.NSR);
            } else {
                Search(trimmedValue);
            }
        }
    });

    function Refresh() {
        const ModifiedInput = SearchInput.value.trim();
        const endsWithSuffix = suffixes.some(suffix => ModifiedInput.endsWith(suffix));
        if (ModifiedInput.startsWith("http://") || ModifiedInput.startsWith("https://")) {
            SearchInput.style.color = endsWithSuffix ? "rgb(0, 0, 0)" : "rgb(200, 0, 0)";
        }
        setTimeout(Refresh, 50);
    }
    
    Refresh();
});
