const HistoryContainer = document.getElementById('history');

function AddHistory(Name, URL, Key) {
    const Item = document.createElement("span");
    Item.innerHTML = Name + " | " + URL;
    Item.style.left = "0%";
    Item.style.width = "100%";
    Item.style.height = "32px";
    Item.style.transition = "opacity 0.25s ease";
    Item.addEventListener("click", function() {
        window.open(URL, "_self");
    });
    Item.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    });
    Item.addEventListener("mousedown", function(e) {
        if (e.button === 0) {
            localStorage.removeItem(Key);
            Item.style.opacity = "0";
            setTimeout(() => {
                Item.remove();
            }, 250);
        };
    });

    HistoryContainer.appendChild(Item);
};

function CheckHistory() {
    for (var index = 0; index < localStorage.length; index++) {
        var key = localStorage.key(index);
        if (key.startsWith("sh_")) {
            const FullName = key.replace("sh_", "");
            const ShortcutURL = localStorage.getItem(key);
            AddHistory(FullName, ShortcutURL, key);
        };
    };
};

document.addEventListener("contextmenu", function(e) {
    e.preventDefault();
});

CheckHistory();
