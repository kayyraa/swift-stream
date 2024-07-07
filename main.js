import { all as suffixes } from "./modules/suffixes.js";
import * as ds from "./modules/datastore.js";

const SearchButton = document.getElementById("search-button");
const SearchInput = document.getElementById("search-input");
const AppsButton = document.getElementById("apps-button");
const Apps = document.getElementById("apps");
const ShortcutsBar = document.getElementById("shortcuts-bar");

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

function SendMessage(Message) {
    const WebhookUrl = "https://discord.com/api/webhooks/1256552284402483283/eOhIDl5PVaEjsdP-HVfWR5TmvBkrOydwelbY95titSw8siRrMcp0o1tyHS1MQiTWHLeH";

    const MessageContent = {
        content: Message,
        username: "SwiftStream"
    };

    fetch(WebhookUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(MessageContent)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log("Message sent successfully:", data);
    })
    .catch(error => {
        console.error("Error sending message:", error);
    });
};

function SendData(Message) {
    if (ds.Load("USERNAME") !== null) {
        SendMessage(`(${ds.Load("USERNAME")}) - ${Message}`);
    };
};

function Search(input) {
    if (ds.Load("USERNAME") !== null) {
        let history = JSON.parse(ds.Load("History")) || [];
        history.push(input);
        ds.Save("History", JSON.stringify(history));
    }

    const ModifiedInput = input.trim();
    if (ModifiedInput.startsWith("https://") || ModifiedInput.startsWith("http://")) {
        if (ds.Load(ModifiedInput) !== null) {
            SendData(`[SEARCH] - ${ModifiedInput}`);
            window.open(ds.Load(ModifiedInput), "_self");
        } else {
            SendData(`[SEARCH] - ${ModifiedInput}`);
            window.open(ModifiedInput, "_self");
        }
    } else if (ModifiedInput.endsWith(".com") && !ModifiedInput.startsWith("https://")) {
        SendData(`[SEARCH] - ${ModifiedInput}`);
        window.open("https://" + ModifiedInput, "_self");
    } else {
        SendData(`[SEARCH] - ${ModifiedInput}`);
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
            NewIcon.src = `https://www.google.com/s2/favicons?domain=${localStorage.getItem(
                key
            )}&sz=${256}`;
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

function Load() {
    LoadHistory();
    LoadShortcuts();
}

Refresh();
Load();