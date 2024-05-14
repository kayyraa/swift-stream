export class display {
    static quickBar(title, description, height, ar, duration) {
        const string = title + description

        const bar = document.createElement('div');
        bar.style.position = "fixed";
        bar.style.left = "-20%";
        bar.style.top = "1%"
        bar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
        bar.innerHTML = string;
        bar.style.opacity = "0";
        bar.style.height = height + "px";
        bar.style.aspectRatio = ar;
        bar.transition = "opacity 0.25s ease, left 0.5s ease";
        document.body.appendChild(bar);

        setTimeout(() => {
            bar.style.left = "1%"
            bar.style.opacity = "1";
            setTimeout(() => {
                bar.style.opacity = "0";
                bar.style.left = "-20%";
                setTimeout(() => {
                    bar.remove();
                }, duration / 2);
            }, duration / 2);
        }, duration / 4);
    };
};