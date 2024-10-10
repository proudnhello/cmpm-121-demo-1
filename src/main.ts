import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Army Builder";
document.title = gameName;

// Title
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

// Button that increases the amount of soldiers.
const button = document.createElement("button");
button.innerHTML = "Recruit a soldier<br> 🔫"; // I wanted to use a saluting face, but its not supported on windows 10.
app.append(button);

// Counter that lists the amount of soldiers.
const counter = document.createElement("div");
counter.innerHTML = "Soldiers: 0 <br>";
app.append(counter);

const increment = document.createElement("div");
increment.innerHTML = "Soldiers per second: 0 <br>";
app.append(increment);

// Button that contains the details for an upgrade.
interface UpgradeDetails {
  name: string; // The name, which will be shown to the user
  cost: number; // The cost of the upgrade
  soldiersPerSecond: number; // The amount of soldiers per second that the upgrade will provide
  numberOfInstances: number; // The number of instances of the upgrade that the player has
  button: HTMLButtonElement | null; // The button that will be used to build the upgrade
  counter: HTMLDivElement | null; // The counter that will be used to display the number of instances of the upgrade
}

// A list of upgrades that the player can build. Any new upgrades should be added here, and will have upgrade buttons created for them.
const upgradeDetails: UpgradeDetails[] = [
  {
    name: "Barracks",
    cost: 10,
    soldiersPerSecond: 100.1,
    numberOfInstances: 0,
    button: null,
    counter: null,
  },
  {
    name: "Training Grounds",
    cost: 100,
    soldiersPerSecond: 2,
    numberOfInstances: 0,
    button: null,
    counter: null,
  },
  {
    name: "Armory",
    cost: 1000,
    soldiersPerSecond: 50,
    numberOfInstances: 0,
    button: null,
    counter: null,
  },
];

let soldiers = 0; // The amount of soldiers that the player has.
let soldiersPerSecond = 0; // The amount of soldiers per second that the player is gaining.

// Create buttons for each upgrade, and add them to the app.
for (let i = 0; i < upgradeDetails.length; i++) {
  // Create the button, give it the initial text, and add it to the app.
  const upgradeButton = document.createElement("button");
  upgradeButton.innerHTML = `${upgradeDetails[i].name} <br> Cost: ${upgradeDetails[i].cost} <br> Soldiers per second: ${upgradeDetails[i].soldiersPerSecond};`;
  app.append(upgradeButton);
  // Place the button into the correct UpgradeDetails object.
  upgradeDetails[i].button = upgradeButton;
  // Create a counter for the number of instances of the upgrade, and add it to the app.
  const upgradeCounter = document.createElement("div");
  upgradeCounter.innerHTML = `${upgradeDetails[i].name}: ${upgradeDetails[i].numberOfInstances} <br>`;
  app.append(upgradeCounter);
  // Place the counter into the correct UpgradeDetails object.
  upgradeDetails[i].counter = upgradeCounter;
  // Add an event listener to the button, and bind the upgrade details to it.
  upgradeButton.addEventListener(
    "click",
    buildUpgrade.bind(null, upgradeDetails[i]),
  );
  upgradeButton.disabled = true;
}

button.addEventListener("click", increaseSoldiers.bind(null, 1));

// Loop code inspired by https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame

requestAnimationFrame(gameLoop.bind(null, Date.now()));

function gameLoop(previousTime: number) {
  const currentTime = Date.now();
  const elapsed = currentTime - previousTime;

  // Increase the number of soldiers by the number of soldiers per second, multiplied by the time elapsed since the last frame.
  increaseSoldiers((elapsed * soldiersPerSecond) / 1000);

  // Iterate through the upgrades, and enable the buttons if the player has enough soldiers to build them.
  for (let i = 0; i < upgradeDetails.length; i++) {
    if (soldiers >= upgradeDetails[i].cost) {
      upgradeDetails[i].button!.disabled = false;
    }
  }

  requestAnimationFrame(gameLoop.bind(null, currentTime));
}

// Increaces the soldiers by the amount, then updates the counter.
function increaseSoldiers(amount: number) {
  soldiers += amount;
  counter.innerHTML = `Soldiers: ${soldiers} <br>`;
}

// Builds an upgrade, of which the details are passed in.
function buildUpgrade(upgrade: UpgradeDetails) {
  // Remove the cost of the upgrade from the player's soldiers, add the soldiers per second to the player's soldiers per second, and increace the number of that upgrade.
  soldiers -= upgrade.cost;
  soldiersPerSecond += upgrade.soldiersPerSecond;
  upgrade.numberOfInstances++;
  // Refresh the upgrade button, and the increment text.
  upgrade.button!.innerHTML = `Build a ${upgrade.name} <br> Cost: ${upgrade.cost} <br> Soldiers per second: ${upgrade.soldiersPerSecond};`;
  upgrade.counter!.innerHTML = `${upgrade.name}: ${upgrade.numberOfInstances} <br>`;
  if (soldiers < upgrade.cost) {
    upgrade.button!.disabled = true;
  }
  // Refresh the number of soldiers per second.
  increment.innerHTML = `Soldiers per second: ${soldiersPerSecond} <br>`;
}
