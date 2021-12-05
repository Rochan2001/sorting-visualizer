var bars;
var speed = parseInt(document.getElementById("time").value);
var swaps = 0;

const renderBars = () => {
  let noBars = document.getElementById("size").value;
  document.getElementById("barNo").innerHTML = noBars;
  let arr = [];

  clearScreen();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < parseInt(noBars); ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    arr.push(parseInt(randomNumber));
  }

  const barsNode = document.getElementById("bars");
  for (const element of arr) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${4 * element}px`;
    barsNode.appendChild(node);
  }
  bars = document.querySelectorAll(".cell");
};

const updateSpeed = () => {
  speed = parseInt(document.getElementById("time").value);
  document.getElementById("speed").innerHTML = speed;
};

const disableControls = () => {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = true;
  }

  document.getElementById("size").disabled = true;
};

const enableControls = () => {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
  document.getElementById("size").disabled = false;
};

const compare = async (index1, index2) => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, Math.abs(speed - 50));
  });
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
    }, Math.abs(speed - 50));
  });
  let temp1 = bars[index1].getAttribute("value");
  let temp2 = bars[index2].getAttribute("value");

  bars[index1].setAttribute("value", temp2);
  bars[index1].style.height = `${4 * temp2}px`;
  bars[index2].setAttribute("value", temp1);
  bars[index2].style.height = `${4 * temp1}px`;
};

const clearScreen = () => {
  document.getElementById("bars").innerHTML = "";
};

document.addEventListener("DOMContentLoaded", () => {
  renderBars();
  updateSpeed();
});
