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
  helperQuick(0, bars.length - 1);
}

const partition = async (low, high) => {
  let pivot = high;

  let i = low - 1;

  for (let j = low; j <= high - 1; j++) {
    await bars[pivot].setAttribute("class", "cell current");
    await bars[j].setAttribute("class", "cell current");
    if (await compare(pivot, j)) {
      i++;
      await bars[i].setAttribute("class", "cell current");
      await swap(i, j);
      await bars[i].setAttribute("class", "cell");
    }
    await bars[j].setAttribute("class", "cell");
  }
  await swap(i + 1, high);
  await bars[pivot].setAttribute("class", "cell");
  return i + 1;
};

const quickSort = async (low, high) => {
  if (low < high) {
    let pi = await partition(low, high);

    await quickSort(low, pi - 1);
    await quickSort(pi + 1, high);
  }
};

const helperQuick = async (l, r) => {
  disableControls();
  let startTime = performance.now();
  let n = bars.length;
  await quickSort(l, r);
  for (let counter = n - 1; counter >= 0; --counter) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.abs(speed - 70));
    });
    if (flag === 1) await pauser();
    bars[counter].setAttribute("class", "cell done");
  }
  let endTime = performance.now();
  byId("et").innerHTML = `${endTime - startTime} milliseconds`;
  enableControls();
};
