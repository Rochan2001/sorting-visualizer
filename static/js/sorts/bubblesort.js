async function run() {
  bubbleSort();
}

const bubbleSort = async () => {
  disableControls();
  let startTime = performance.now();
  let n = bars.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      await bars[j].setAttribute("class", "cell current");
      await bars[j + 1].setAttribute("class", "cell current");

      if (await compare(j, j + 1)) {
        await swap(j, j + 1);
        console.log(j, j + 1);
      }

      await bars[j].setAttribute("class", "cell");
      await bars[j + 1].setAttribute("class", "cell");
    }
    bars[n - i - 1].setAttribute("class", "cell done");
  }
  bars[0].setAttribute("class", "cell done");
  let endTime = performance.now();
  byId("et").innerHTML = `${
     endTime - startTime
   } milliseconds`;
  enableControls();
};
