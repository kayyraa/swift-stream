import { all, all as suffixes } from "./modules/suffixes.js";
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
        Accounts: document.getElementById("account-button"),
        History: document.getElementById("history-button"),
    }
    
    if (ds.Load("username") !== null && ds.Load("password") !== null) {
        if (ds.Load("History") !== null || ds.Load("History") !== null) {
            SearchInput.value = ds.Load("History");
        }
    }

    AllApps.History.addEventListener("load", function() {
        if (ds.Load("username") !== null && ds.Load("password") !== null) {
            AllApps.History.style.visibility = "visible";
        } else {
            AllApps.History.style.visibility = "hidden";
        }
    })

    AllApps.Accounts.addEventListener("click", function() {
        if (ds.Load("username") !== null && ds.Load("password") !== null) {
            window.open("account/login.html", "_self")
        } else {
            window.open("account/signin.html", "_self")
        }
    });

    AppsButton.addEventListener("click", function() {
        const isEnabled = Apps.dataset.enabled === "true";
        if (!isEnabled) {
            Apps.style.top = "0.75%";
            AppsButton.setAttribute("fill", "black");
            Apps.dataset.enabled = true;
        } else {
            Apps.style.top = "-55%";
            AppsButton.setAttribute("fill", "white");
            Apps.dataset.enabled = false;
        }
    });    

    function Notify(notificationText, duration) {
        NotificationText.innerHTML = notificationText;
        Notification.style.left = "10px";
        setTimeout(() => {
            Notification.style.left = "-400px";
        }, duration);
    }

    function Search(input) {
        if (ds.Load("username") !== null && ds.Load("password") !== null) {
            ds.Save("History", input);
        }
        const ModifiedInput = input.trim();
        if (ModifiedInput.startsWith("http://") || ModifiedInput.startsWith("https://")) {
            window.open(ModifiedInput, "_self");
        } else if (ModifiedInput !== "") {
            window.open(`https://www.google.com/search?q=${input}`, "_self");
        }
    };

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
        suffixes.forEach(suffix => {
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
    };
    
    Refresh();
});