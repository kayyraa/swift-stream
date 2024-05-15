const ClearHistory = document.getElementById('ch');
const ClearShortcuts = document.getElementById('cs');
const ClearIdentity = document.getElementById('ci');

ClearIdentity.addEventListener('click', function () {
    localStorage.clear();
    window.location.href = "../../index.html";
});

ClearHistory.addEventListener('click', function () {
    localStorage.removeItem('History');
    window.location.href = "../../index.html";
});

ClearShortcuts.addEventListener('click', function () {
    for (var key in localStorage) {
        if (key.startsWith("sh_")) {
            localStorage.removeItem(key);
        };
    };
    window.location.href = "../../index.html";
});