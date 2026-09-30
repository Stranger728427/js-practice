Promise.myAllSettled = function (promises) {
  return new Promise((resolve) => {
    const ans = [];
    let completed = 0;

    if (promises.length === 0) {
      resolve([]);
      return;
    }
    promises.forEach((promise, idx) => {
      Promise.resolve(promise)
        .then((val) => {
          ans[idx] = {
            status: "fulfilled",
            value: val,
          };
        })
        .catch((reason) => {
          ans[idx] = {
            status: "rejected",
            reason: reason,
          };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(ans);
          }
        });
    });
  });
};

const p1 = 12;
const p2 = Promise.reject("Error hai bhai");
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => resolve(30), 100);
});
// Promise.allSettled([p1,p2,p3]).then((val)=>console.log(val));
Promise.myAllSettled([p1, p2, p3]).then((value) => console.log(value));
