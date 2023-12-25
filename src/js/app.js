// TODO: write code here

// comment this to pass build
// const unusedVariable = "variable";

// // for demonstration purpose only
// export default function demo(value) {
//   return `Demo: ${value}`;
// }

// console.log("app.js included");
import PlayGround from './playground/playground.js';

document.addEventListener('DOMContentLoaded', () => {
  const goblin = new PlayGround(document.querySelector('.playground'));
  setInterval(goblin.moveGoblin, 1000);
});