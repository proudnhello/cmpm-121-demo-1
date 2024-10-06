import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Army Builder";
document.title = gameName;

// Title
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Counter that lists the amount of soldiers.
const counter = document.createElement("div");
counter.innerHTML = "Soldiers: 0 <br>";
app.append(counter);

const increment = document.createElement("div");
increment.innerHTML = "Soldiers per second: 0 <br>";
app.append(increment);

// Button that increases the amount of soldiers.
const button = document.createElement("button");
button.innerHTML = "Recruit a soldier<br> 🔫"; // I wanted to use a saluting face, but its not supported on windows 10.
app.append(button);

// Button that uses soldiers to build a barracks.
const upgradeButton = document.createElement("button");
upgradeButton.innerHTML =
  "Build a Barracks <br> Cost: 10 <br> Soldiers per second: 1";
app.append(upgradeButton);
upgradeButton.disabled = true;

const upgradeDetails = [
  {
    name: "Barracks",
    cost: 10,
    soldiersPerSecond: 1,
  },
];

let soldiers = 0;
let soldiersPerSecond = 0;

button.addEventListener("click", increaseSoldiers.bind(null, 1));
upgradeButton.addEventListener("click", buildBarracks);

// Loop code inspired by https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

requestAnimationFrame(gameLoop.bind(null, Date.now()));

function gameLoop(previousTime: number) {
  const currentTime = Date.now();
  const elapsed = currentTime - previousTime;

  increaseSoldiers((elapsed * soldiersPerSecond) / 1000);

  if (soldiers >= upgradeDetails[0].cost) {
    upgradeButton.disabled = false;
  }

  requestAnimationFrame(gameLoop.bind(null, currentTime));
}

// Increaces the soldiers by the amount, then updates the counter.
function increaseSoldiers(amount: number) {
  soldiers += amount;
  counter.innerHTML = `Soldiers: ${soldiers} <br>`;
}

function buildBarracks() {
  soldiers -= 10;
  soldiersPerSecond += upgradeDetails[0].soldiersPerSecond;
  upgradeButton.innerHTML = `Build a Barracks <br> Cost: ${upgradeDetails[0].cost} <br> Soldiers per second: ${upgradeDetails[0].soldiersPerSecond};`;
  increment.innerHTML = `Soldiers per second: ${soldiersPerSecond} <br>`;
  if (soldiers < upgradeDetails[0].cost) {
    upgradeButton.disabled = true;
  }
}
