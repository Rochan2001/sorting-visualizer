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
  insertionSort();
}

const insertionSort = async () => {
  disableControls();
  let startTime = performance.now();
  let n = bars.length;
  for (let i = 0; i < n - 1; ++i) {
    let j = i;
    while (j >= 0 && (await compare(j, j + 1))) {
      await bars[j].setAttribute("class", "cell current");
      await bars[j + 1].setAttribute("class", "cell current");
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, Math.abs(speed - 90));
      });
      if (flag === 1) await pauser();
      await swap(j, j + 1);
      await bars[j].setAttribute("class", "cell");
      await bars[j + 1].setAttribute("class", "cell");
      j -= 1;
    }
  }
  for (let counter = n - 1; counter >= 0; --counter) {
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, Math.abs(speed - 70));
    });
    bars[counter].setAttribute("class", "cell done");
  }
  let endTime = performance.now();
  byId("et").innerHTML = `${endTime - startTime} milliseconds`;
  enableControls();
};
