if (document.title === "Charts - DOM") {
    google.charts.load('current', {packages: ['corechart']});

    function Random(Min, Max) {
        return Math.random() * (Max - Min) + Min;
    }
    
    function DrawChart() {
        const Data = google.visualization.arrayToDataTable([
            ["Time in days", "Milliseconds"],
            [0, Random(90, Random(110, 290))], [30, Random(90, Random(110, 290))], [60, Random(90, Random(110, 290))], [90, Random(90, Random(110, 290))], [120, Random(90, Random(110, 290))], [150, Random(90, Random(110, 290))], [180, Random(90, Random(110, 290))],
            [210, Random(90, Random(110, 290))], [240, Random(90, Random(110, 290))], [270, Random(90, Random(110, 290))], [300, Random(90, Random(110, 290))]
        ]);
    
        const Options = {
            title: "Milliseconds to load SwiftStream",
            hAxis: {title: 'Time in days'},
            vAxis: {title: 'Time in milliseconds'},
            legend: 'none'
        };
    
        const ChartParent = document.getElementById("chart");
        const Chart = new google.visualization.LineChart(ChartParent);
        Chart.draw(Data, Options);
    }
    
    google.charts.setOnLoadCallback(DrawChart);
}

const Charts = document.getElementById("charts");

for (let index = 0; index < Charts.children.length; index++) {
    const Element = Charts.children[index];
    for (let index = 0; index < Element.children.length; index++) {
        const InnerElement = Element.children[index];
        InnerElement.addEventListener("click", function() {
            window.open(InnerElement.dataset.href, "_self");
        });
    };
};