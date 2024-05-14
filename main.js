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
    const ShortcutsBar = document.getElementById("shortcuts-bar");

    const AllApps = {
        Dictionary: document.getElementById("dictionary-button"),
        Shortcuts: document.getElementById("shortcuts"),
    };

    Object.values(AllApps).forEach(element => {
        element.addEventListener("click", function() {
            window.open(element.dataset.href, "_self");
        });
    });
    
    if (ds.Load("username") && ds.Load("password")) {
        const history = ds.Load("History");
        if (history) {
            SearchInput.value = history;
        };
    };

    AppsButton.addEventListener("click", function() {
        const isEnabled = Apps.dataset.enabled === "true";
        Apps.style.top = isEnabled ? `-55%` : `${parseInt(Apps.dataset.top)}%`;
        Apps.dataset.enabled = !isEnabled;
    });

    function CheckStoragePrefix(Prefix) {
        for (var index = 0; index < localStorage.length; index++) {
            var key = localStorage.key(index);
            if (key.startsWith(Prefix)) {
                return key;
            };
        };
        return null;
    };

    function OrderStorageAsync(Key) {
        if (localStorage.getItem(Key) !== null) {
            return localStorage.getItem(Key);
        } else {
            return null;
        };
    };

    function Notify(notificationText, duration) {
        NotificationText.textContent = notificationText;
        Notification.style.left = "10px";
        setTimeout(() => {
            Notification.style.left = "-400px";
        }, duration);
    };

    function Search(input) {
        const history = ds.Load("History");
        if (history) {
            ds.Save("History", input);
        };
        const ModifiedInput = input.trim();
        if (ModifiedInput.startsWith("https://")) {
            if (ds.Load(ModifiedInput) !== null) {
                window.open(ds.Load(ModifiedInput), "_self");
            } else {
                window.open(ModifiedInput, "_self");
            };
        } else {
            if (ds.Load(ModifiedInput) !== null) {
                window.open(ds.Load(ModifiedInput), "_self");
            } else {
                window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_self");
            };
        };
    };

    SearchButton.addEventListener("click", function() {
        const trimmedValue = SearchInput.value.trim();
        if (trimmedValue === "") {
            Notify("Please enter a search.", Options.NSR);
        } else {
            Search(trimmedValue);
        };
    });
    
    document.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            const trimmedValue = SearchInput.value.trim();
            if (trimmedValue === "") {
                Notify("Please enter a search.", Options.NSR);
            } else {
                Search(trimmedValue);
            };
        };
    });

    function Refresh() {
        const ModifiedInput = SearchInput.value.trim();
        const endsWithSuffix = suffixes.some(suffix => ModifiedInput.endsWith(suffix));
        if (ModifiedInput.startsWith("http://") || ModifiedInput.startsWith("https://")) {
            SearchInput.style.color = endsWithSuffix ? "rgb(0, 0, 0)" : "rgb(200, 0, 0)";
        } else {
            SearchInput.style.color = "rgb(0, 0, 0)";
        };
        setTimeout(Refresh, 50);
    };

    function Load() {
        for (var index = 0; index < localStorage.length; index++) {
            var key = localStorage.key(index);
            if (key.startsWith("sh_")) {
                const FullName = key.replace("sh_", "");
                const href = localStorage.getItem(key);
    
                const NewShortcut = document.createElement("span");
                NewShortcut.innerHTML = FullName;
                NewShortcut.dataset.href = href;
                ShortcutsBar.appendChild(NewShortcut);
    
                NewShortcut.addEventListener("click", function() {
                    window.open(NewShortcut.dataset.href, "_self");
                });
            };
        };
    
        if (ShortcutsBar.childElementCount === 0) {
            ShortcutsBar.style.backgroundColor = "transparent";
        };
    };    
    
    Refresh();
    Load();
});