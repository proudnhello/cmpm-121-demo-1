import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const leftName = "Army";
const rightName = "Builder";
const gameName = `${leftName} ${rightName}`;
document.title = gameName;

const COST_INCREASE_FACTOR = 1.15; // The factor by which the cost of an upgrade will increase each time it is built.

// Title that will look like it is marching.
const title = document.createElement("h1");
title.innerHTML = "<br>";
app.append(title);

// Creates the left side of the title, the "left boot".
const leftBoot = document.createElement("div");
leftBoot.innerHTML = leftName;
leftBoot.classList.add("leftMarch");
title.append(leftBoot);

// Creates the right side of the title, the "right boot".
const rightBoot = document.createElement("div");
rightBoot.innerHTML = rightName;
rightBoot.classList.add("rightMarch");
title.append(rightBoot);

// Button that increases the amount of soldiers.
const createSoldierButton = document.createElement("button");
createSoldierButton.innerHTML = "Recruit a soldier<br> 🔫"; // I wanted to use a saluting face, but its not supported on windows 10.
app.append(createSoldierButton);

// Increase the number of soldiers by 1 when the button is clicked.
createSoldierButton.addEventListener("click", increaseSoldiers.bind(null, 1));

// Counter that lists the amount of soldiers.
const solderCountDiv = document.createElement("div");
solderCountDiv.innerHTML = "Soldiers: 0 <br>";
app.append(solderCountDiv);

// Counter that defines the rate at which soldiers are being recruited per second.
const soldierRateDiv = document.createElement("div");
soldierRateDiv.innerHTML = "Soldiers per second: 0 <br>";
app.append(soldierRateDiv);

// Interface that defines the properties of an upgrade.
interface UpgradeDetails {
  name: string;
  cost: number;
  soldiersPerSecond: number;
  numberOfInstances: number;
  description: string;
}

// Arrays that store the buttons, upgrades, and counters for each upgrade. Corresponding elements in each array are for the same upgrade.
// For example, upgradeDetails[0], buttons[0], and counterDivs[0] are for the same upgrade.
const upgradeButtons: HTMLButtonElement[] = [];
const counterDivs: HTMLDivElement[] = [];

// A list of upgrades that the player can build. Any new upgrades should be added here, and will have upgrade buttons created for them.
const upgradeDetails: UpgradeDetails[] = [
  {
    name: "Barracks",
    cost: 10,
    soldiersPerSecond: 1,
    numberOfInstances: 0,
    description:
      "A place for soldiers to sleep, making soldering more attractive.",
  },
  {
    name: "Student Loans",
    cost: 50,
    soldiersPerSecond: 5,
    numberOfInstances: 0,
    description:
      "A way to get young people into the army, by giving them no other choice.",
  },
  {
    name: "Training Grounds",
    cost: 100,
    soldiersPerSecond: 10,
    numberOfInstances: 0,
    description:
      "A place for soldiers to train, impressing parents and getting a large influx of delinquents.",
  },
  {
    name: "Recruitment Office",
    cost: 500,
    soldiersPerSecond: 25,
    numberOfInstances: 0,
    description:
      "A place for people to sign up, promising them a better life and a free gun.",
  },
  {
    name: "Armory",
    cost: 1000,
    soldiersPerSecond: 100,
    numberOfInstances: 0,
    description:
      "A place for big and exciting weapons, causing childern to dream of becoming soldiers.",
  },
];

let soldiers = 0;
let soldiersPerSecond = 0;

// Create buttons for each upgrade, and add them to the app.
for (let i = 0; i < upgradeDetails.length; i++) {
  // Create the button, give it the initial text, and add it to the app.
  const upgradeButton = document.createElement("button");
  app.append(upgradeButton);
  // Place the button into the correct UpgradeDetails object.
  upgradeButtons[i] = upgradeButton;
  // Add an event listener to the button, and bind the upgrade details to it.
  upgradeButton.addEventListener("click", buildUpgrade.bind(null, i));

  // Create a counter for the number of instances of the upgrade, and add it to the app.
  const upgradeCounter = document.createElement("div");
  app.append(upgradeCounter);
  // Place the counter into the correct UpgradeDetails object.
  counterDivs[i] = upgradeCounter;

  // Update the button text, and disable it if the player does not have enough soldiers to build it.
  updateUpgradeButton(i);
  upgradeButton.disabled = true;
}

// Loop code inspired by https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

requestAnimationFrame(gameLoop.bind(null, Date.now()));

// The main game loop, which is called every frame.
function gameLoop(previousTime: number) {
  const currentTime = Date.now();
  const elapsed = currentTime - previousTime;

  // Increase the number of soldiers by the number of soldiers per second, multiplied by the time elapsed since the last frame.
  increaseSoldiers((elapsed * soldiersPerSecond) / 1000);

  // Iterate through the upgrades, and enable the buttons if the player has enough soldiers to build them.
  for (let i = 0; i < upgradeDetails.length; i++) {
    if (soldiers >= upgradeDetails[i].cost) {
      upgradeButtons[i].disabled = false;
    }
  }

  requestAnimationFrame(gameLoop.bind(null, currentTime));
}

// Increaces the soldiers by the amount, then updates the counter.
function increaseSoldiers(amount: number) {
  soldiers += amount;
  solderCountDiv.innerHTML = `Soldiers: ${soldiers.toFixed(2)} <br>`;
}

// Updates the upgrade button with the new details of the upgrade
function updateUpgradeButton(upgradeIndex: number) {
  const upgrade = upgradeDetails[upgradeIndex];
  const button = upgradeButtons[upgradeIndex];
  const counter = counterDivs[upgradeIndex];

  button.innerHTML = `Build a ${upgrade.name} <br> Cost: ${upgrade.cost.toFixed(2)} <br> Soldiers per second: ${upgrade.soldiersPerSecond}.`;

  counter.innerHTML = `${upgrade.name}: ${upgrade.description} <br> You have ${upgrade.numberOfInstances} <br>`;

  if (soldiers < upgrade.cost) {
    button.disabled = true;
  }
}

// Builds an upgrade, of which the details are passed in.
function buildUpgrade(upgradeIndex: number) {
  const upgrade = upgradeDetails[upgradeIndex];

  // Remove the cost of the upgrade from the player's soldiers, add the soldiers per second to the player's soldiers per second, and increace the number of that upgrade.
  soldiers -= upgrade.cost;
  soldiersPerSecond += upgrade.soldiersPerSecond;
  upgrade.cost = upgrade.cost * COST_INCREASE_FACTOR;
  upgrade.numberOfInstances++;
  // Refresh the upgrade button, and the increment text.
  updateUpgradeButton(upgradeIndex);
  // Refresh the number of soldiers per second.
  soldierRateDiv.innerHTML = `Soldiers per second: ${soldiersPerSecond.toFixed(2)} <br>`;
}
