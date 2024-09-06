import { all as suffixes } from "../modules/suffixes.js";
import * as ds from "../modules/datastore.js";

const SearchButton = document.getElementById("search-button");
const SearchInput = document.getElementById("search-input");
const AppsButton = document.getElementById("apps-button");
const Apps = document.getElementById("apps");
const ShortcutsBar = document.getElementById("shortcuts-bar");

const Header = document.getElementById("header");

const AllApps = Array.from(Apps.children);
AllApps.forEach((element) => {
    element.addEventListener("click", function () {
        window.open(element.dataset.href, "_self");
    });
});

AppsButton.addEventListener("click", function () {
    const isEnabled = Apps.dataset.enabled === "true";
    Apps.style.top = isEnabled ? `-55%` : `${parseInt(Apps.dataset.top)}%`;
    Apps.dataset.enabled = !isEnabled;
});

function Search(input) {
    if (ds.Load("USERNAME") !== null) {
        let history = JSON.parse(ds.Load("History")) || [];
        history.push(input);
        ds.Save("History", JSON.stringify(history));
    }

    const ModifiedInput = input.trim();
    if (ModifiedInput.startsWith("https://") || ModifiedInput.startsWith("http://")) {
        if (ds.Load(ModifiedInput) !== null) {
            window.open(ds.Load(ModifiedInput), "_self");
        } else {
            window.open(ModifiedInput, "_self");
        }
    } else if (ModifiedInput.endsWith(".com") && !ModifiedInput.startsWith("https://")) {
        window.open("https://" + ModifiedInput, "_self");
    } else {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(input)}`, "_self");
    }
}

SearchButton.addEventListener("click", function () {
    const trimmedValue = SearchInput.value.trim();
    if (trimmedValue !== "") {
        Search(trimmedValue);
    }
});

document.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        const trimmedValue = SearchInput.value.trim();
        if (trimmedValue !== "") {
            Search(trimmedValue);
        }
    }
});

function Refresh() {
    const ModifiedInput = SearchInput.value.trim();
    const endsWithSuffix = suffixes.some((suffix) =>
        ModifiedInput.endsWith(suffix)
    );
    if (ModifiedInput.startsWith("http://") || ModifiedInput.startsWith("https://")) {
        SearchInput.style.color = endsWithSuffix
            ? "rgb(0, 0, 0)"
            : "rgb(200, 0, 0)";
    } else {
        SearchInput.style.color = "rgb(0, 0, 0)";
    }
    setTimeout(Refresh, 25);
}

function LoadShortcuts() {
    for (let index = 0; index < localStorage.length; index++) {
        const key = localStorage.key(index);
        if (key.startsWith("sh_")) {
            const NewShortcut = document.createElement("span");
            NewShortcut.innerHTML = key.replace("sh_", "");
            NewShortcut.dataset.href = localStorage.getItem(key);
            ShortcutsBar.appendChild(NewShortcut);

            const NewIcon = document.createElement("img");
            NewIcon.src = `https://logo.clearbit.com/${localStorage.getItem(key)}`;
            NewIcon.style.position = "relative";
            NewIcon.style.borderRadius = "32px";
            NewIcon.style.top = "5px";
            NewIcon.style.left = "5px";
            NewIcon.style.width = "24px";
            NewIcon.style.aspectRatio = "1 / 1";
            NewShortcut.appendChild(NewIcon);

            NewShortcut.addEventListener("click", function () {
                window.open(NewShortcut.dataset.href, "_self");
            });
        }
    }
    if (ShortcutsBar.childElementCount === 0) {
        ShortcutsBar.style.backgroundColor = "transparent";
    }
}

function LoadHistory() {
    if (ds.Load("USERNAME") !== null) {
        let history = JSON.parse(ds.Load("History")) || [];
        if (Array.isArray(history) && history.length > 0) {
            const latestItem = history[history.length - 1];
            if (latestItem !== "") {
                SearchInput.value = latestItem;
            }
            history = history.filter((item) => item !== "");
            ds.Save("History", JSON.stringify(history));
        } else {
            ds.Save("History", JSON.stringify([]));
        }
    }
}

function LoadTheme() {
    const Theme = localStorage.getItem("Theme");
    if (Theme !== null) {
        const BackgroundColor = JSON.parse(Theme).BG;
        const ForegroundColor = JSON.parse(Theme).FG;
        const FlatgroundColor = JSON.parse(Theme).FF;
        const TextColor = JSON.parse(Theme).TC;

        document.body.style.backgroundColor = BackgroundColor;
        document.body.style.color = ForegroundColor;

        SearchInput.style.backgroundColor = FlatgroundColor;
        SearchInput.style.color = TextColor;
        Header.style.color = TextColor;

        AppsButton.style.backgroundColor = ForegroundColor;
        Apps.style.backgroundColor = ForegroundColor;

        Array.from(ShortcutsBar.getElementsByTagName("span")).forEach(Shortcut => {
            Shortcut.style.backgroundColor = ForegroundColor;
            Shortcut.style.color = TextColor;
        });
    }
}

function Load() {
    LoadHistory();
    LoadShortcuts();
    LoadTheme();
}

Refresh();
Load();