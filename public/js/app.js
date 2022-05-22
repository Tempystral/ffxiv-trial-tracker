'use strict';
import brushstroke from "../../scripts/brushstroke.min.js";

const trials = document.querySelectorAll("div[id^='trial-'], div[class='duty']");

trials.forEach(trial => {
  trial.addEventListener("click", event => {
    console.log(trial, event.target);
    mark_duty()
  });
});

function mark_duty(trial) {
  console.log()
}

async function test() {
  if (!localStorage.getItem("userdata")) {
    var data = await fetch("/data", {method: "GET"})
      .then(response => {
        if (!response.ok){
          throw new Error("Unable to retrieve data from server: Response was not OK")
        }
        return response.json()
      })
    console.log(data);
    localStorage.setItem("userdata", JSON.stringify(data))
  }
}