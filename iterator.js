///fibonacci
function* fibonaci() {
  let a = 0;
  let b = 1;

  while (true) {
    yield a;
    const c = a + b;
    a = b;
    b = c;
  }
}
let series = fibonaci();
