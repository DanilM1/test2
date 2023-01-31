const label_storage = document.querySelector('.label_storage');
const input_storage = document.querySelector('.input_storage');
const label_transfer = document.querySelector('.label_transfer');
const input_transfer = document.querySelector('.input_transfer');

const storage = document.querySelector('#storage_');
const transfer = document.querySelector('#transfer_');

const hdd = document.querySelector('#hdd');
const ssd = document.querySelector('#ssd');

const multi = document.querySelector('#multi');
const single = document.querySelector('#single');

let xValues = ['red', 'yellow', 'purple', 'blue'];
let yValues = [];
let barColors = [];

var buf = 0;

f2();

input_storage.addEventListener('input', (e) => {
    label_storage.textContent = 'Storage: ' + e.target.value + 'GB';
    f();
});

input_transfer.addEventListener('input', (e) => {
    label_transfer.textContent = 'Transfer: ' + e.target.value + 'GB';
    f();
});

storage.addEventListener('click', () => {
    storage.checked = true;
    transfer.checked = false;
    f();
});

transfer.addEventListener('click', () => {
    transfer.checked = true;
    storage.checked = false;
    f();
});

hdd.addEventListener('click', () => {
    hdd.checked = true;
    ssd.checked = false;
    f();
});

ssd.addEventListener('click', () => {
    ssd.checked = true;
    hdd.checked = false;
    f();
});

multi.addEventListener('click', () => {
    multi.checked = true;
    single.checked = false;
    f();
});

single.addEventListener('click', () => {
    single.checked = true;
    multi.checked = false;
    f();
});

function f() {
    if (storage.checked) {
        if (input_storage.value > '0') {
            yValues[0] = Math.max(input_storage.value * 0.005, 7).toFixed(2);
            if (hdd.checked) buf = 0.01;
            else buf = 0.02;
            yValues[1] = Math.min(input_storage.value * buf, 10).toFixed(2);
            if (+input_storage.value > 75) {
                if (multi.checked) buf = 0.06;
                else buf = 0.03;
            }
            else buf = 0;
            yValues[2] = (+input_storage.value * buf).toFixed(2);
            yValues[3] = Math.max(input_storage.value * 0.01, 5).toFixed(2);
        }
        else yValues = [];
    }
    else {
        if (input_transfer.value > '0') {
            yValues[0] = Math.max(input_transfer.value * 0.01, 7).toFixed(2);
            yValues[1] = Math.min(input_transfer.value * 0.01, 10).toFixed(2);
            if (+input_transfer.value > 75) buf = 0.02;
            else buf = 0;
            yValues[2] = (+input_transfer.value * buf).toFixed(2);
            yValues[3] = Math.max(input_transfer.value * 0.01, 5).toFixed(2);
        }
        else yValues = [];
    }

    buf = Math.min(...yValues);

    for (var i in yValues) {
        if (yValues[i] == buf) { barColors[i] = xValues[i]; }
        else { barColors[i] = 'gray'; }
    }

    f2();
}

function f2() {
    new Chart('h', {
        type: 'horizontalBar',
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                xAxes: [{ ticks: { min: 0, max: 65 } }]
            }
        }
    });

    new Chart('v', {
        type: 'bar',
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: { display: false },
            scales: {
                yAxes: [{ ticks: { min: 0, max: 65 } }]
            }
        }
    });
}