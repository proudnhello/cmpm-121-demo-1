import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Army Builder";
document.title = gameName;

const COST_INCREASE_FACTOR = 1.15; // The factor by which the cost of an upgrade will increase each time it is built.

// Title
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Button that increases the amount of soldiers.
const button = document.createElement("button");
button.innerHTML = "Recruit a soldier<br> 🔫"; // I wanted to use a saluting face, but its not supported on windows 10.
app.append(button);

// Increase the number of soldiers by 1 when the button is clicked.
button.addEventListener("click", increaseSoldiers.bind(null, 1));

// Counter that lists the amount of soldiers.
const counter = document.createElement("div");
counter.innerHTML = "Soldiers: 0 <br>";
app.append(counter);

// Counter that defines the rate at which soldiers are being recruited per second.
const increment = document.createElement("div");
increment.innerHTML = "Soldiers per second: 0 <br>";
app.append(increment);

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
const buttons: HTMLButtonElement[] = []; 
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
  buttons[i] = upgradeButton;
  // Add an event listener to the button, and bind the upgrade details to it.
  upgradeButton.addEventListener(
    "click",
    buildUpgrade.bind(null, i),
  );

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
      buttons[i].disabled = false;
    }
  }

  requestAnimationFrame(gameLoop.bind(null, currentTime));
}

// Increaces the soldiers by the amount, then updates the counter.
function increaseSoldiers(amount: number) {
  soldiers += amount;
  counter.innerHTML = `Soldiers: ${soldiers.toFixed(2)} <br>`;
}

// Updates the upgrade button with the new details of the upgrade
function updateUpgradeButton(upgradeIndex: number) {
  const upgrade = upgradeDetails[upgradeIndex];
  const button = buttons[upgradeIndex];
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
  increment.innerHTML = `Soldiers per second: ${soldiersPerSecond.toFixed(2)} <br>`;
}
