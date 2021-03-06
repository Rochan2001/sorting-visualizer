var bars;
var speed = parseInt(byId("time").value);
var swaps = 0;
var flag = 0;

const renderCustomBars = (values) => {
  let arr = values;
  clearScreen();

  const barsNode = byId("bars");
  for (const element of arr) {
    const node = document.createElement("div");
    if (arr.length < 40) {
      number = document.createElement("span");
      number.innerHTML = element;
      number.className = "bars_text";
    }
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${4 * element}px`;
    arr.length < 40 ? node.appendChild(number) : {};
    barsNode.appendChild(node);
  }
  bars = document.querySelectorAll(".cell");
};

function pauser() {
  return new Promise((resolve) => {
    let playbuttonclick = function () {
      document.getElementById("pa").removeAttribute("disabled");

      document.getElementById("pl").setAttribute("disabled", "true");

      document
        .getElementById("pl")
        .removeEventListener("click", playbuttonclick);

      flag = 0;
      resolve("resolved");
    };
    document.getElementById("pl").addEventListener("click", playbuttonclick);
  });
}

document.getElementById("pa").addEventListener("click", function () {
  flag = 1;

  document.getElementById("pa").setAttribute("disabled", "true");

  document.getElementById("pl").removeAttribute("disabled");
});
const renderBars = () => {
  let noBars = byId("size").value;
  byId("barNo").innerHTML = noBars;

  var arr = [];
  clearScreen();

  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < parseInt(noBars); ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    arr.push(parseInt(randomNumber));
  }
  const barsNode = byId("bars");
  let number;
  for (const element of arr) {
    const node = document.createElement("div");
    if (parseInt(noBars) < 40) {
      number = document.createElement("span");
      number.innerHTML = element;
      number.className = "bars_text";
    }
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${4 * element}px`;
    parseInt(noBars) < 40 ? node.appendChild(number) : {};
    barsNode.appendChild(node);
  }
  bars = document.querySelectorAll(".cell");
};

const updateSpeed = () => {
  speed = parseInt(byId("time").value);
  byId("speed").innerHTML = speed;
};

document.getElementById("pl").setAttribute("disabled", "true");
document.getElementById("pa").setAttribute("disabled", "true");
const disableControls = () => {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    console.log(buttons[i]);
    if (buttons[i].id === "pa" || buttons[i].id === "pl") continue;
    buttons[i].disabled = true;
  }

  byId("size").disabled = true;
};

const enableControls = () => {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
  byId("size").disabled = false;

  document.getElementById("pl").setAttribute("disabled", "true");
  document.getElementById("pa").setAttribute("disabled", "true");
};

const compare = async (index1, index2) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.abs(speed - 70));
  });

  if (flag === 1) await pauser();
  let value1 = parseInt(bars[index1].getAttribute("value"));
  let value2 = parseInt(bars[index2].getAttribute("value"));
  if (value1 > value2) {
    return true;
  }
  return false;
};

const swap = async (index1, index2) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.abs(speed - 70));
  });
  let temp1 = bars[index1].getAttribute("value");
  let temp2 = bars[index2].getAttribute("value");

  if (flag === 1) await pauser();
  bars[index1].setAttribute("value", temp2);
  bars[index1].style.height = `${4 * temp2}px`;
  bars.length < 40 ? (bars[index1].firstChild.innerHTML = temp2) : {};
  bars[index2].setAttribute("value", temp1);
  bars[index2].style.height = `${4 * temp1}px`;
  bars.length < 40 ? (bars[index2].firstChild.innerHTML = temp1) : {};
};

const clearScreen = () => {
  byId("bars").innerHTML = "";
};

document.addEventListener("DOMContentLoaded", () => {
  renderBars();
  updateSpeed();
});
