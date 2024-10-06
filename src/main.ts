import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Army Builder";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

let counter = document.createElement("div");
counter.innerHTML = "Soldiers: 0 <br>";
app.append(counter);

const button = document.createElement("button");
button.innerHTML = "Recruit a soldier<br> 🔫"; // I wanted to use, which is a saluting face, but its not supported on windows 10, and idk if its working.
app.append(button);

let soldiers = 0;


button.addEventListener("click", () => {
    soldiers++;
    counter.innerHTML = `Soldiers: ${soldiers} <br>`;
});