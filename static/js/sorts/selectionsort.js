async function run() {
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
   byId("et").innerHTML = `${
     endTime - startTime
   } milliseconds`;
  enableControls();
};
