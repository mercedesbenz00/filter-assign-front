// CHART SPLINE
// -----------------------------------
export const ChartSpline = {
    data: [{
        "label": "Uniques",
        "color": "#768294",
        "data": [
            ["Mar", 70],
            ["Apr", 85],
            ["May", 59],
            ["Jun", 93],
            ["Jul", 66],
            ["Aug", 86],
            ["Sep", 60]
        ]
    }, {
        "label": "Recurrent",
        "color": "#1f92fe",
        "data": [
            ["Mar", 21],
            ["Apr", 12],
            ["May", 27],
            ["Jun", 24],
            ["Jul", 16],
            ["Aug", 39],
            ["Sep", 15]
        ]
    }],

    options: {
        series: {
            lines: {
                show: false
            },
            points: {
                show: true,
                radius: 4
            },
            splines: {
                show: true,
                tension: 0.4,
                lineWidth: 1,
                fill: 0.5
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: (label, x, y) => x + ' : ' + y
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            min: 0,
            max: 150, // optional: use it for a clear represetation
            tickColor: '#eee',
            //position: 'right' or 'left',
            tickFormatter: v => v /* + ' visitors'*/
        },
        shadowSize: 0
    }

}

// CHART AREA
// -----------------------------------
export const ChartArea = {
    data: [{
        "label": "Uniques",
        "color": "#aad874",
        "data": [
            ["Mar", 50],
            ["Apr", 84],
            ["May", 52],
            ["Jun", 88],
            ["Jul", 69],
            ["Aug", 92],
            ["Sep", 58]
        ]
    }, {
        "label": "Recurrent",
        "color": "#7dc7df",
        "data": [
            ["Mar", 13],
            ["Apr", 44],
            ["May", 44],
            ["Jun", 27],
            ["Jul", 38],
            ["Aug", 11],
            ["Sep", 39]
        ]
    }],
    options: {
        series: {
            lines: {
                show: true,
                fill: 0.8
            },
            points: {
                show: true,
                radius: 4
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: (label, x, y) => x + ' : ' + y
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            min: 0,
            tickColor: '#eee',
            // position: 'right' or 'left'
            tickFormatter: v => v + ' visitors'
        },
        shadowSize: 0
    }
}

// CHART BAR
// -----------------------------------
export const ChartBar = {

    data: [{
        "label": "Sales",
        "color": "#9cd159",
        "data": [
            ["Jan", 27],
            ["Feb", 82],
            ["Mar", 56],
            ["Apr", 14],
            ["May", 28],
            ["Jun", 77],
            ["Jul", 23],
            ["Aug", 49],
            ["Sep", 81],
            ["Oct", 20]
        ]
    }],

    options: {
        series: {
            bars: {
                align: 'center',
                lineWidth: 0,
                show: true,
                barWidth: 0.6,
                fill: 0.9
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: (label, x, y) => x + ' : ' + y
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            // position: 'right' or 'left'
            tickColor: '#eee'
        },
        shadowSize: 0
    }
}

// CHART BAR STACKED
// -----------------------------------
export const ChartBarStacked = {

    data: [{
        "label": "Tweets",
        "color": "#51bff2",
        "data": [
            ["Jan", 56],
            ["Feb", 81],
            ["Mar", 97],
            ["Apr", 44],
            ["May", 24],
            ["Jun", 85],
            ["Jul", 94],
            ["Aug", 78],
            ["Sep", 52],
            ["Oct", 17],
            ["Nov", 90],
            ["Dec", 62]
        ]
    }, {
        "label": "Likes",
        "color": "#4a8ef1",
        "data": [
            ["Jan", 69],
            ["Feb", 135],
            ["Mar", 14],
            ["Apr", 100],
            ["May", 100],
            ["Jun", 62],
            ["Jul", 115],
            ["Aug", 22],
            ["Sep", 104],
            ["Oct", 132],
            ["Nov", 72],
            ["Dec", 61]
        ]
    }, {
        "label": "+1",
        "color": "#f0693a",
        "data": [
            ["Jan", 29],
            ["Feb", 36],
            ["Mar", 47],
            ["Apr", 21],
            ["May", 5],
            ["Jun", 49],
            ["Jul", 37],
            ["Aug", 44],
            ["Sep", 28],
            ["Oct", 9],
            ["Nov", 12],
            ["Dec", 35]
        ]
    }],

    options: {
        series: {
            stack: true,
            bars: {
                align: 'center',
                lineWidth: 0,
                show: true,
                barWidth: 0.6,
                fill: 0.9
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: (label, x, y) => x + ' : ' + y
        },
        xaxis: {
            tickColor: '#fcfcfc',
            mode: 'categories'
        },
        yaxis: {
            // position: 'right' or 'left'
            tickColor: '#eee'
        },
        shadowSize: 0
    }

}

// CHART DONUT
// -----------------------------------
export const ChartDonut = {

    data: [{
        "color": "#39C558",
        "data": 60,
        "label": "Coffee"
    }, {
        "color": "#00b4ff",
        "data": 90,
        "label": "CSS"
    }, {
        "color": "#FFBE41",
        "data": 50,
        "label": "LESS"
    }, {
        "color": "#ff3e43",
        "data": 80,
        "label": "Jade"
    }, {
        "color": "#937fc7",
        "data": 116,
        "label": "AngularJS"
    }],

    options: {
        series: {
            pie: {
                show: true,
                innerRadius: 0.5 // This makes the donut shape
            }
        }
    }

}

// CHART LINE
// -----------------------------------
export const ChartLine = {

    data: [{
        "label": "Complete",
        "color": "#5ab1ef",
        "data": [
            ["Jan", 188],
            ["Feb", 183],
            ["Mar", 185],
            ["Apr", 199],
            ["May", 190],
            ["Jun", 194],
            ["Jul", 194],
            ["Aug", 184],
            ["Sep", 74]
        ]
    }, {
        "label": "In Progress",
        "color": "#f5994e",
        "data": [
            ["Jan", 153],
            ["Feb", 116],
            ["Mar", 136],
            ["Apr", 119],
            ["May", 148],
            ["Jun", 133],
            ["Jul", 118],
            ["Aug", 161],
            ["Sep", 59]
        ]
    }],

    options: {
        series: {
            lines: {
                show: true,
                fill: 0.01
            },
            points: {
                show: true,
                radius: 4
            }
        },
        grid: {
            borderColor: '#eee',
            borderWidth: 1,
            hoverable: true,
            backgroundColor: '#fcfcfc'
        },
        tooltip: true,
        tooltipOpts: {
            content: (label, x, y) => x + ' : ' + y
        },
        xaxis: {
            tickColor: '#eee',
            mode: 'categories'
        },
        yaxis: {
            // position: 'right' or 'left'
            tickColor: '#eee'
        },
        shadowSize: 0
    }

}

// CHART PIE
// -----------------------------------
export const ChartPie = {

    data: [{
        "label": "drink",
        "color": "#4acab4",
        "data": 50
    }, {
        "label": "food",
        "color": "#ffea88",
        "data": 20
    }],

    options: {
        series: {
            pie: {
                show: true,
                innerRadius: 0,
                label: {
                    show: true,
                    radius: 0.8,
                    formatter: function(label, series) {
                        return '<div class="flot-pie-label">' +
                            //label + ' : ' +
                            Math.round(series.percent) +
                            '%</div>';
                    },
                    background: {
                        opacity: 0.8,
                        color: '#222'
                    }
                }
            }
        }
    }

}