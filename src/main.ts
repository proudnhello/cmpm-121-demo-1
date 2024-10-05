import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My actually quite boring game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "Recruit a soldier<br> 🔫"; // I wanted to use, which is a saluting face, but its not supported on windows 10, and idk if its working.
app.append(button);