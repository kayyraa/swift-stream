const CreateButton = document.getElementById("create-button");
const ShortcutName = document.getElementById("shortcut-name");
const ShortcutURL = document.getElementById("shortcut-url");
const ResetButton = document.getElementById("reset");
const StatusLabel = document.getElementById("status");

function SendStatus(Status, Duration) {
    StatusLabel.innerHTML = Status
    StatusLabel.style.opacity = "1";
    setTimeout(() => {
        StatusLabel.style.opacity = "0";
    }, Duration * 1000);
};

function SaveShortcut(ShortcutName, ShortcutURL) {
    if (localStorage.getItem("USERNAME") !== null) {
        if (localStorage.getItem("sh_" + ShortcutName) === null) {
            if (ShortcutName === "" || ShortcutURL === "") {
                SendStatus("Please Enter A Valid Shortcut", 2)
            } else {
                if (ShortcutURL.startsWith("https://")) {
                    localStorage.setItem("sh_" + ShortcutName, ShortcutURL);
                    SendStatus("Shortcut Created", 2);
                } else {
                    localStorage.setItem("sh_" + ShortcutName, "https://" + ShortcutURL);
                    SendStatus("Shortcut Created", 2);
                };
            };
        } else {
            SendStatus("Shortcut Already Exists", 2);
        };
    } else {
        SendStatus("Sign Up Before Creating Any Shortcuts", 2);
        setTimeout(() => {
            window.open("../../account/manage.html", "_self");
        }, 1500);
    }
};

ResetButton.addEventListener("click", function() {
    for (var key in localStorage) {
        if (key.startsWith("sh_")) {
            localStorage.removeItem(key);
        };
    };
    SendStatus("Shortcuts Cleared", 2);
    return;
});

document.addEventListener("keydown", function(e) {
    const Key = e.key;
    if (Key === "Enter") {
        var SN = ShortcutName.value.trim();
        var SU = ShortcutURL.value.trim();
        SaveShortcut(SN, SU);
    };
});

CreateButton.addEventListener("click", function() {
    var SN = ShortcutName.value.trim();
    var SU = ShortcutURL.value.trim();
    SaveShortcut(SN, SU);
});