const ctx = document.getElementById("chart").getContext("2d");
const x_labels = [];
const y_data = [];
const bgColor = [];
const brdColor = [];
const random1 = Math.floor(Math.random() * 256);
const random2 = Math.random().toFixed(1);

createChart();

async function createChart() {
  await getData();
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: x_labels,
      datasets: [
        {
          label: "Global Average Temperature",
          data: y_data,
          backgroundColor: bgColor,
          borderColor: brdColor,
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return value + "°";
            },
          },
        },
      },
    },
  });
}

async function getData() {
  const response = await fetch("./ZonAnn.Ts+dSST.csv");
  const data = await response.text();
  console.log("JSON DATA:", data);

  const table = data.split("\n").slice(1); // we remove the first element
  table.forEach((row) => {
    const columns = row.split(","); //will split each row into a single column as an array with all the cells inside
    const year = columns[0];
    x_labels.push(year);
    const temp = columns[1];
    y_data.push(parseFloat(temp) + 14);
    console.log("Temperatures: ", y_data);

    const randomBgColor = `rgba(${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.random().toFixed(1)})`;

    bgColor.push(randomBgColor);

    const randomBrdColor = `rgba(${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, 1)`;
    brdColor.push(randomBrdColor);
  });
}
