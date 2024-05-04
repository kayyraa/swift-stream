document.addEventListener('DOMContentLoaded', () => {
    const DictionWord = document.getElementById("word");
    const DictionMeaning = document.getElementById("meaning");

    const DictionInput = document.getElementById("word-input");
    const DictionButton = document.getElementById("search-button");

    const DictionFrame = document.getElementById("diction-section");

    DictionButton.addEventListener("click", () => {
        let Input = DictionInput.value.trim();
        window.open(`https://www.google.com/search?q=dictionary&oq=dicito&gs_lcrp=EgZjaHJvbWUqCQgBEAAYChiABDIGCAAQRRg5MgkIARAAGAoYgAQyCQgCEAAYChiABDIJCAMQABgKGIAEMgkIBBAAGAoYgAQyCQgFEAAYChiABDIJCAYQABgKGIAEMgkIBxAAGAoYgAQyCQgIEAAYChiABDIJCAkQABgKGIAE0gEIMTU4M2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8#dobs=${Input}`, "_self");
    });

    document.addEventListener("keydown", function(e) {
        const KeyPressed = e.key;
        if (KeyPressed === "Enter") {
            let Input = DictionInput.value.trim();
        window.open(`https://www.google.com/search?q=dictionary&oq=dicito&gs_lcrp=EgZjaHJvbWUqCQgBEAAYChiABDIGCAAQRRg5MgkIARAAGAoYgAQyCQgCEAAYChiABDIJCAMQABgKGIAEMgkIBBAAGAoYgAQyCQgFEAAYChiABDIJCAYQABgKGIAEMgkIBxAAGAoYgAQyCQgIEAAYChiABDIJCAkQABgKGIAE0gEIMTU4M2owajeoAgCwAgA&sourceid=chrome&ie=UTF-8#dobs=${Input}`, "_self");
        };
    });
});