const Themes = [
    {
        Name: "Default",
        Icon: "../../images/Default.png",
        BackgroundColor: "rgb(60, 60, 60)",
        ForegroundColor: "rgba(255, 255, 255, 0.25)",
        FlatgroundColor: "rgb(255, 255, 255)",
        TextColor: "rgb(255, 255, 255)"
    },
    {
        Name: "Light",
        Icon: "../../images/Light.png",
        BackgroundColor: "rgb(255, 255, 255)",
        ForegroundColor: "rgba(0, 0, 0, 0.25)",
        FlatgroundColor: "rgb(0, 0, 0)",
        TextColor: "rgb(0, 0, 0)"
    },
    {
        Name: "Teal",
        Icon: "../../images/Teal.png",
        BackgroundColor: "rgb(107, 255, 148)",
        ForegroundColor: "rgba(0, 0, 0, 0.25)",
        FlatgroundColor: "rgb(255, 255, 255)",
        TextColor: "rgb(255, 255, 255)"
    },
    {
        Name: "Blackout",
        Icon: "../../images/Blackout.png",
        BackgroundColor: "rgb(0, 0, 0)",
        ForegroundColor: "rgba(255, 255, 255, 0.25)",
        FlatgroundColor: "rgb(255, 255, 255)",
        TextColor: "rgb(255, 255, 255)"
    }
];

const App = document.getElementById("app");

Themes.forEach(Theme => {
    const NewTheme = document.createElement("div");
    NewTheme.classList.add("theme");
    App.appendChild(NewTheme);

    const ThemeIcon = document.createElement("img");
    ThemeIcon.src = Theme.Icon;
    NewTheme.appendChild(ThemeIcon);

    const ThemeTitle = document.createElement("div");
    ThemeTitle.innerHTML = Theme.Name;
    NewTheme.appendChild(ThemeTitle);

    NewTheme.addEventListener("click", function() {
        localStorage.setItem("Theme", JSON.stringify({
            BG: Theme.BackgroundColor,
            FG: Theme.ForegroundColor,
            FF: Theme.FlatgroundColor,
            TC: Theme.TextColor
        }));
    });
});