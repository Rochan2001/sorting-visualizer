async function run() {
  let values = byId("cinput").value.split(" ").map(Number);
  document.getElementById("pa").removeAttribute("disabled");

  if (values.length !== 1) {
    console.log("working");
    renderCustomBars(values);
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, 2000);
    });
  }

  helperMerge(0, bars.length - 1);
}

const merge = async (l, m, r) => {
  var n1 = m - l + 1;
  var n2 = r - m;

  var L = new Array(n1);
  var R = new Array(n2);

  for (var i = 0; i < n1; i++)
    L[i] = parseInt(bars[l + i].getAttribute("value"));
  for (var j = 0; j < n2; j++)
    R[j] = parseInt(bars[m + 1 + j].getAttribute("value"));

  var i = 0;

  var j = 0;

  var k = l;

  while (i < n1 && j < n2) {
    await bars[k].setAttribute("class", "cell current");

    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.abs(speed - 70));
    });
    if (L[i] <= R[j]) {
      if (flag === 1) await pauser();
      let temp = L[i];
      bars[k].setAttribute("value", temp);
      bars[k].style.height = `${4 * temp}px`;
      bars.length < 40 ? (bars[k].firstChild.innerHTML = temp) : {};
      i++;
    } else {
      if (flag === 1) await pauser();
      let temp = R[j];
      bars[k].setAttribute("value", temp);
      bars[k].style.height = `${4 * temp}px`;
      bars.length < 40 ? (bars[k].firstChild.innerHTML = temp) : {};
      j++;
    }
    l === 0 && r === bars.length - 1
      ? await bars[k].setAttribute("class", "cell done")
      : await bars[k].setAttribute("class", "cell");
    k++;
  }

  while (i < n1) {
    await bars[k].setAttribute("class", "cell current");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.abs(speed - 70));
    });
    let temp = L[i];
    if (flag === 1) await pauser();
    bars[k].setAttribute("value", temp);
    bars[k].style.height = `${4 * temp}px`;
    bars.length < 40 ? (bars[k].firstChild.innerHTML = temp) : {};

    l === 0 && r === bars.length - 1
      ? await bars[k].setAttribute("class", "cell done")
      : await bars[k].setAttribute("class", "cell");
    i++;
    k++;
  }

  while (j < n2) {
    await bars[k].setAttribute("class", "cell current");
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.abs(speed - 70));
    });
    if (flag === 1) await pauser();
    let temp = R[j];
    bars[k].setAttribute("value", temp);
    bars[k].style.height = `${4 * temp}px`;
    bars.length < 40 ? (bars[k].firstChild.innerHTML = temp) : {};

    l === 0 && r === bars.length - 1
      ? await bars[k].setAttribute("class", "cell done")
      : await bars[k].setAttribute("class", "cell");
    j++;
    k++;
  }
};

const mergeSort = async (l, r) => {
  if (l < r) {
    var m = l + Math.floor((r - l) / 2);

    await mergeSort(l, m);

    if (flag === 1) await pauser();
    await mergeSort(m + 1, r);

    await merge(l, m, r);
  }
};

const helperMerge = async (l, r) => {
  disableControls();
  let startTime = performance.now();
  await mergeSort(l, r);
  let endTime = performance.now();
  byId("et").innerHTML = `${endTime - startTime} milliseconds`;
  enableControls();
};
