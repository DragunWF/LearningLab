// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/425986#content

function collectStrings(obj) {
  let output = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      output.push(obj[key]);
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      output = [...output, ...collectStrings(Object.assign({}, obj[key]))];
    }
  }
  return output;
}

function test() {
  const obj = {
    stuff: "foo",
    data: {
      val: {
        thing: {
          info: "bar",
          moreInfo: {
            evenMoreInfo: {
              weMadeIt: "baz",
            },
          },
        },
      },
    },
  };

  console.log(collectStrings(obj)); // ["foo", "bar", "baz"])
}

test();
