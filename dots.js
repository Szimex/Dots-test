/*
 * ----------------------------------------
 * data
 * ----------------------------------------
 */

let TEST_A_SAMPLE = [
  [853, 576],
  [991, 227],
  [1335, 439],
  [1126, 530],
  [1233, 823],
  [334, 751],
  [159, 405],
  [610, 386]
];

let TEST_A = [
  [473, 687],
  [363, 795],
  [547, 796],
  [558, 367],
  [352, 473],
  [449, 568],
  [313, 626],
  [146, 785],
  [184, 866],
  [265, 785],
  [350, 893],
  [60, 905],
  [107, 507],
  [48, 592],
  [46, 126],
  [119, 283],
  [253, 67],
  [302, 281],
  [483, 210],
  [349, 199],
  [398, 55],
  [688, 152],
  [713, 868],
  [628, 495],
  [603, 893]
];

const TEST_B_SAMPLE = [
  [850, 573],
  [993, 226],
  [1334, 430],
  [1131, 530],
  [1230, 812],
  [339, 736],
  [158, 397],
  [613, 338]
];

const TEST_B = [
  [396, 415],
  [546, 703],
  [286, 675],
  [362, 178],
  [446, 289],
  [547, 486],
  [546, 134],
  [661, 147],
  [659, 553],
  [610, 778],
  [426, 751],
  [234, 839],
  [184, 418],
  [123, 533],
  [96, 59],
  [212, 259],
  [207, 118],
  [483, 47],
  [724, 56],
  [684, 641],
  [720, 861],
  [58, 884],
  [45, 462],
  [132, 702]
];

const testType = 0;
const pointsShifting = 0;
const marginMax = 130;
const ABC = "abcdefghijklmnopqrstuvwxyz".toUpperCase().split("");
const circleTestArea = document.getElementById("circle-test-area");
const overlay = document.getElementById("overlay");
const togglePanel = document.getElementById("toggle-panel");
const startPanel = document.getElementById("start-panel");
const nextButton = document.getElementById("next-button");
const startButton = document.getElementById("start-button");

let arrayOfPoints = TEST_A_SAMPLE;
let circleTestAreaStyle = document.getElementById("circle-test-area").style;
let windowHeight = window.innerHeight;
let divWidth = circleTestArea.offsetWidth;
let proportion = 0;
let linesShift = 38;
let clickedSpan = document.getElementsByTagName("span");
let timeStart = 0;
let timeStop = 0;

/*
 * ----------------------------------------
 * drawing board
 * ----------------------------------------
 */

function pointLabel(index) {
  if (arrayOfPoints[0][0] == 853 || arrayOfPoints[0][0] == 473) {
    return index + 1;
  } else {
    return index % 2 == 0 ? index / 2 + 1 : ABC[index / 2 - 0.5];
  }
}

function shiftPoint(point) {
  return [point[0] - pointsShifting, point[1] - pointsShifting];
}
TEST_A_SAMPLE = TEST_A_SAMPLE.map(shiftPoint);
TEST_A = TEST_A.map(shiftPoint);
TEST_B_SAMPLE.map(shiftPoint);
TEST_B.map(shiftPoint);

function xy(arr) {
  let xMax = arr[0][0];
  let yMax = arr[0][1];
  arr.forEach((el, i) => {
    if (el[0] > xMax) {
      xMax = el[0];
    }
    if (el[1] > yMax) {
      yMax = el[1];
    }
  });
  xMax += marginMax;
  yMax += marginMax;
  if (windowHeight / divWidth > yMax / xMax) {
    proportion = divWidth / xMax;
  } else {
    proportion = windowHeight / yMax;
  }

  circleTestAreaStyle.height = Math.round(yMax * proportion) + "px";
  circleTestAreaStyle.width = Math.round(xMax * proportion) + "px";
}

function writeCircles(arr) {
  arr.forEach((point, i) => {
    circleTestArea.innerHTML += `<span id="${i}" class="" style="position: absolute; top:${Math.round(
      point[1] * proportion
    )}px; left: ${Math.round(point[0] * proportion)}px">${pointLabel(
      i
    )}</span>`;
  });
}

function drawingLines(arr) {
  for (let i = 1; i < arr.length; i++) {
    circleTestArea.innerHTML += `<svg><line class=""  id="l${i}"x1="${Math.round(
      arr[i - 1][0] * proportion
    ) +
      linesShift * proportion}px" y1="${Math.round(arr[i - 1][1] * proportion) +
      linesShift * proportion}px" x2="${Math.round(arr[i][0] * proportion) +
      linesShift * proportion}px" y2="${Math.round(arr[i][1] * proportion) +
      linesShift *
        proportion}px" style="stroke:rgb(150,150,150);stroke-width:3" /></svg>`;
  }
}

xy(arrayOfPoints);
writeCircles(arrayOfPoints);
drawingLines(arrayOfPoints);

document.getElementById("toggle-panel").style.height =
  circleTestArea.style.height;
document.getElementById("toggle-panel").style.width =
  circleTestArea.style.width;
document.getElementById("start-panel").style.height =
  circleTestArea.style.height;
document.getElementById("start-panel").style.width = circleTestArea.style.width;

/*
 * ----------------------------------------
 * run tests
 * ----------------------------------------
 */

document.querySelector("body").onload = () =>
  (document.getElementById("toggle-panel").style.display = "block");
nextButton.addEventListener("click", () => {
  togglePanel.style.display = "none";
  startPanel.style.display = "block";
});
startButton.addEventListener("click", () => startTest());
function startTest() {
  document.getElementById("overlay").style.display = "none";
  if (arrayOfPoints.length == 8) {
    exampleTest();
  } else if (arrayOfPoints.length > 8) {
    rightTest();
  }
}

function exampleTest() {
  timeStart = new Date().getTime();
  console.log("run sample test");
  let counter = 0;

  document.getElementById(0).classList.add("shadow-pulse");
  for (let i = 0; i < arrayOfPoints.length; i++) {
    document.getElementById(i).addEventListener("click", () => {
      if (i == counter && counter + 1 != arrayOfPoints.length) {
        document.getElementById(i).classList.remove("shadow-pulse");
        document.getElementById(i).classList.add("current-match");
        document.getElementById(i + 1).classList.add("shadow-pulse");
        if (i > 0) {
          document.getElementById("l" + i).style.display = "block";
        }
        counter++;
      } else if (counter + 1 == arrayOfPoints.length) {
        timeStop = new Date().getTime();
        document.getElementById(i).classList.remove("shadow-pulse");
        document.getElementById(i).classList.add("current-match");
        document.getElementById("l" + i).style.display = "block";
        setTimeout(() => {
          overlay.style.display = "block";
          startPanel.style.display = "none";
          togglePanel.innerHTML = `<h1>Great!</h1>
          <h2>You have passed the sample test in ${timeCompute()}.</h2>
        <h2>Get ready for a real test!</h2>
        <button id="next-button">next</button>`;
          togglePanel.style.display = "block";
          document
            .getElementById("next-button")
            .addEventListener("click", () => {
              togglePanel.style.display = "none";
              startPanel.innerHTML = `<h1>Test A</h1>
            <h2>Connect circles by following numbers in ascending order as quickly as you can.</h2>
            <button id="start-button">start!</button>`;
              startPanel.style.display = "block";
              document
                .getElementById("start-button")
                .addEventListener("click", () => {
                  if (arrayOfPoints[0][0] == 853) {
                    arrayOfPoints = TEST_A;
                  } else if (arrayOfPoints[0][0] == 850) {
                    arrayOfPoints = TEST_B;
                  }
                  circleTestArea.innerHTML = "";
                  xy(arrayOfPoints);
                  writeCircles(arrayOfPoints);
                  drawingLines(arrayOfPoints);
                  startTest();
                });
            });
        }, 500);
      } else {
        document.getElementById(i).classList.add("shake-horizontal");
        setTimeout(
          () => document.getElementById(i).classList.remove("shake-horizontal"),
          500
        );
      }
    });
  }

  if (counter == arrayOfPoints.length) {
    console.log("end");
  }
}
function rightTest() {
  timeStart = new Date().getTime();
  console.log("run test");
  let counter = 0;

  for (let i = 0; i < arrayOfPoints.length; i++) {
    document.getElementById(i).addEventListener("click", () => {
      if (i == counter) {
        document.getElementById(i).classList.add("current-match");
        if (i > 0) {
          document.getElementById("l" + i).style.display = "block";
        }
        counter++;
        if (counter == arrayOfPoints.length) {
          timeStop = new Date().getTime();
          console.log("end right test");
          setTimeout(() => {
            //checking if its turn to another test or to end this app.
            if (arrayOfPoints[0][0] == 473) {
              overlay.style.display = "block";
              startPanel.style.display = "none";
              togglePanel.innerHTML = `<h1>${afterTestHeadline()}</h1>
            <h2>You passed the test in ${timeCompute()}</h2>
          <h2>Are You curious for more?</h2>
          <button id="next-button">next</button>`;
              togglePanel.style.display = "block";
              document
                .getElementById("next-button")
                .addEventListener("click", () => {
                  startPanel.innerHTML = `<h1>A Sample for Test B</h1>
              <h2>Connect circles following an ascending pattern of numbers and letters: 1-A-2-B-3-C...</h2>
              <button id="start-button">start!</button>`;
                  togglePanel.style.display = "none";
                  startPanel.style.display = "block";
                  document
                    .getElementById("start-button")
                    .addEventListener("click", () => {
                      arrayOfPoints = TEST_B_SAMPLE;
                      circleTestArea.innerHTML = "";
                      xy(arrayOfPoints);
                      writeCircles(arrayOfPoints);
                      drawingLines(arrayOfPoints);
                      startTest();
                    });
                });
            } else if (arrayOfPoints[0][0] == 396) {
              endOfTest();
            }
          }, 500);
        }
      } else {
        document.getElementById(i).classList.add("shake-horizontal");
        setTimeout(
          () => document.getElementById(i).classList.remove("shake-horizontal"),
          500
        );
      }
    });
  }
}

function timeCompute() {
  let result = Math.round((timeStop - timeStart) / 1000);
  if (result < 60) {
    return result + " seconds";
  } else if (result < 120) {
    return "one minute and " + (result - 60) + " seconds";
  } else if (result >= 120) {
    return (
      Math.floor(result / 60) +
      " minutes and " +
      (result - Math.floor(result / 60) * 60) +
      " seconds"
    );
  }
}

function afterTestHeadline() {
  let result = Math.round((timeStop - timeStart) / 1000);
  if (result < 15) {
    return "OUTSTANDING!!!";
  } else if (result < 21) {
    return "WOW!";
  } else if (result < 27) {
    return "Good job!";
  } else if (result < 34) {
    return "Good";
  } else if (result < 41) {
    return "OK, You've done it";
  } else if (result >= 41) {
    return "Finished";
  }
}

function endOfTest() {
  console.log("done");
  startPanel.style.display = "none";
  overlay.style.display = "block";
  togglePanel.innerHTML = `<h1>${afterTestHeadline()}</h1>
  <h2>You've passed the test in ${timeCompute()}.</h2>
<h2 style="margin-top: 25 vh">That's it. Filling smart? Compare your score with others and rate the app!</h2>
<button id="score-list">score list</button>
<button id="rate-button">rate</button>`;
  togglePanel.style.display = "block";
}
