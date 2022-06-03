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
  selectionSort();
}

const selectionSort = async () => {
  disableControls();
  let startTime = performance.now();
  let n = bars.length;
  let min_idx;

  for (let i = 0; i < n - 1; i++) {
    min_idx = i;
    for (let j = i + 1; j < n; j++) {
      await bars[min_idx].setAttribute("class", "cell current");
      await bars[j].setAttribute("class", "cell current");

      if (await compare(min_idx, j)) {
        await bars[min_idx].setAttribute("class", "cell");
        min_idx = j;
      }

      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, Math.abs(speed - 70));
      });
      await bars[j].setAttribute("class", "cell");
    }

    await bars[min_idx].setAttribute("class", "cell current");
    await bars[i].setAttribute("class", "cell current");
    await swap(min_idx, i);
    await bars[min_idx].setAttribute("class", "cell");
    await bars[i].setAttribute("class", "cell done");
  }

  bars[n - 1].setAttribute("class", "cell done");

  let endTime = performance.now();
  byId("et").innerHTML = `${endTime - startTime} milliseconds`;
  enableControls();
};
