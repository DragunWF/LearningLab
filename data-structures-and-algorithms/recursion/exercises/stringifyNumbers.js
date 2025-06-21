// https://www.udemy.com/course/js-algorithms-and-data-structures-masterclass/learn/quiz/425988#content

function stringifyNumbers(obj) {
  let output = {};
  for (let key in obj) {
    console.log(obj[key], typeof obj[key]);
    if (typeof obj[key] === "number") {
      output[key] = obj[key].toString();
    } else if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      output[key] = stringifyNumbers(Object.assign({}, obj[key]));
    } else {
      output[key] = obj[key];
    }
  }
  return output;
}

function test() {
  let obj = {
    num: 1,
    test: [],
    data: {
      val: 4,
      info: {
        isRight: true,
        random: 66,
      },
    },
  };

  console.log(stringifyNumbers(obj));
}

test();

/*
Expected output:
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/
