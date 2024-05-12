document.addEventListener("DOMContentLoaded", function() {
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

    ResetButton.addEventListener("click", function() {
        localStorage.clear();
        ShortcutName.value = "";
        ShortcutURL.value = "";
        SendStatus("Shortcuts cleared!", 2);
        return;
    });

    CreateButton.addEventListener("click", function() {
        var SN = ShortcutName.value.trim();
        var SU = ShortcutURL.value.trim();
        if (localStorage.getItem(SN) === null) {
            if (SN === "" || SU === "") {
                SendStatus("Please input a name and URL", 2);
                return;
            } else if (SN !== "" && SU !== "") {
                localStorage.setItem(SN, SU);
                setTimeout(() => {
                    if (localStorage.getItem(SN) !== null) {
                        SendStatus("Shortcut created!", 2);
                    }
                }, 50);
            };
        } else {
            SendStatus("Shortcut already exists!", 2);
            return;
        };
    });
});