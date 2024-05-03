document.addEventListener('DOMContentLoaded', () => {
    const DictionWord = document.getElementById("word");
    const DictionMeaning = document.getElementById("meaning");

    const DictionInput = document.getElementById("word-input");
    const DictionButton = document.getElementById("search-button");

    const DictionFrame = document.getElementById("diction-section");

    DictionButton.addEventListener("click", () => {
        let Input = DictionInput.value.trim();
        Input = Input.split(/\W+/);
        Input = Input.filter(word => !["the", "is", "and", "a", "an", "in", "on"].includes(word.toLowerCase())); // Filtering out stopwords
        
        const Frequency = {}
        Input.forEach(word => {
            const LowerCaseWord = word.toLowerCase();
            if (!["the", "is", "and", "a", "an", "in", "on"].includes(LowerCaseWord)) {
                Frequency[LowerCaseWord] = (Frequency[LowerCaseWord] || 0) + 1;
            };
        })

        const Words = Object.keys(Frequency).filter(word => Frequency[word] > 1);

        console.log(Words);
    });
});