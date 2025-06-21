// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/425996#content

function nestedEvenSum(obj) {
  let sum = 0;
  for (let key of Object.keys(obj)) {
    const item = obj[key];
    if (typeof item === "number" && item % 2 === 0) {
      sum += item;
    } else if (typeof item === "object") {
      sum += nestedEvenSum(item);
    }
  }
  return sum;
}

function test() {
  var obj1 = {
    outer: 2,
    obj: {
      inner: 2,
      otherObj: {
        superInner: 2,
        notANumber: true,
        alsoNotANumber: "yup",
      },
    },
  };

  var obj2 = {
    a: 2,
    b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
    c: { c: { c: 2 }, cc: "ball", ccc: 5 },
    d: 1,
    e: { e: { e: 2 }, ee: "car" },
  };

  console.log(nestedEvenSum(obj1)); // 6
  console.log(nestedEvenSum(obj2)); // 10
}

test();
