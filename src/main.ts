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

// Button that increases the amount of soldiers.
const button = document.createElement("button");
button.innerHTML = "Recruit a soldier<br> 🔫"; // I wanted to use, which is a saluting face, but its not supported on windows 10, and idk if its working.
app.append(button);

let soldiers = 0;

button.addEventListener("click", increaseSoldiers.bind(null, 1));

setInterval(increaseSoldiers.bind(null, 1), 1000);

// Increaces the soldiers by the amount, then updates the counter.
function increaseSoldiers(amount: number) {
  soldiers += amount;
  counter.innerHTML = `Soldiers: ${soldiers} <br>`;
}

