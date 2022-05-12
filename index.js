//  Init Current Clocks and Labels Values Vars
let currentTimeZone1;
let currentTimeZone2;
let currentTimeZone3;
let timeZoneLabel1;
let timeZoneLabel2;
let timeZoneLabel3;

// Current city labels in HTML
let clock1City = document.getElementById("clock-1-city");
let clock2City = document.getElementById("clock-2-city");
let clock3City = document.getElementById("clock-3-city");

// Buttons, Inputs and Dropdowns Vars
const timeZonesDropDown1 = document.getElementById("time-zones-drop-down-1");
const timeZonesDropDown2 = document.getElementById("time-zones-drop-down-2");
const timeZonesDropDown3 = document.getElementById("time-zones-drop-down-3");

const setTimeZone1Btn = document.getElementById("set-time-btn-1");
const setTimeZone2Btn = document.getElementById("set-time-btn-2");
const setTimeZone3Btn = document.getElementById("set-time-btn-3");

const timeZoneInput1 = document.getElementById("city-name-input-1");
const timeZoneInput2 = document.getElementById("city-name-input-2");
const timeZoneInput3 = document.getElementById("city-name-input-3");

let is12Hour = false; // sets the clocks to 24h or 12h AM/PM

let isDark = false; // dark or light mode

let fontStyle = "Roboto"; // font style

// Updates Labels
function updateLabels() {
  //updates HTML labels with the values store in Label Vars
  clock1City.innerHTML = timeZoneLabel1;
  clock2City.innerHTML = timeZoneLabel2;
  clock3City.innerHTML = timeZoneLabel3;
}

// Updates Clocks
function updateTime() {
  currentDate = new Date(); // Gets the current time
  if (is12Hour === false) { // checks if the clock is set to 12h or 24h
    // if setted to 24h
    document.getElementById("clock-1").innerHTML = currentDate
      .toLocaleTimeString("en-UK", { timeZone: currentTimeZone1 })
      .slice(0, -3);
    document.getElementById("am-pm-1").innerHTML = "";
    document.getElementById("clock-2").innerHTML = currentDate
      .toLocaleTimeString("en-UK", { timeZone: currentTimeZone2 })
      .slice(0, -3);
    document.getElementById("am-pm-2").innerHTML = "";
    document.getElementById("clock-3").innerHTML = currentDate
      .toLocaleTimeString("en-UK", { timeZone: currentTimeZone3 })
      .slice(0, -3);
    document.getElementById("am-pm-3").innerHTML = "";
  } else {
    // if setted to 12h
    document.getElementById("clock-1").innerHTML = currentDate
      .toLocaleTimeString("en-US", { timeZone: currentTimeZone1 })
      .slice(0, -6);
    document.getElementById("am-pm-1").innerHTML = currentDate
      .toLocaleTimeString("en-US", { timeZone: currentTimeZone1 })
      .slice(-2);
    document.getElementById("clock-2").innerHTML = currentDate
      .toLocaleTimeString("en-US", { timeZone: currentTimeZone2 })
      .slice(0, -6);
    document.getElementById("am-pm-2").innerHTML = currentDate
      .toLocaleTimeString("en-US", { timeZone: currentTimeZone2 })
      .slice(-2);
    document.getElementById("clock-3").innerHTML = currentDate
      .toLocaleTimeString("en-US", { timeZone: currentTimeZone3 })
      .slice(0, -6);
    document.getElementById("am-pm-3").innerHTML = currentDate
      .toLocaleTimeString("en-US", { timeZone: currentTimeZone3 })
      .slice(-2);
  }
}

// Fetch Data from Chrome Storage API
function getStorageData() {
  chrome.storage.sync.get(
    [
      "fontStyle",
      "time1",
      "time2",
      "time3",
      "label1",
      "label2",
      "label3",
      "is12Hour",
      "isDark",
    ],
    function (items) {
      console.log("Settings retrieved", items);
      // gets values for TIMES, LABELS, IS12HOUR and ISDARK from chrome storage API, if there´s no value sets to default ones
      if (items.time1 === undefined) {
        currentTimeZone1 = "America/New_York";
      } else {
        currentTimeZone1 = items.time1;
      }
      if (items.label1 === undefined) {
        timeZoneLabel1 = "New York";
      } else {
        timeZoneLabel1 = items.label1;
      }

      if (items.time2 === undefined) {
        currentTimeZone2 = "America/Sao_Paulo";
      } else {
        currentTimeZone2 = items.time2;
      }
      if (items.label2 === undefined) {
        timeZoneLabel2 = "São Paulo";
      } else {
        timeZoneLabel2 = items.label2;
      }

      if (items.time3 === undefined) {
        currentTimeZone3 = "Europe/London";
      } else {
        currentTimeZone3 = items.time3;
      }
      if (items.label3 === undefined) {
        timeZoneLabel3 = "London";
      } else {
        timeZoneLabel3 = items.label3;
      }

      if (items.is12Hour === undefined) {
        is12Hour = false;
      } else {
        is12Hour = items.is12Hour;
      }

      if (items.isDark === undefined) {
        isDark = false;
      } else {
        isDark = items.isDark;
      }

      if (items.fontStyle === undefined) {
        fontStyle = "Orbitron";
      } else {
        fontStyle = items.fontStyle;
      }

      storedFontStyle();
      lightOrDark();
      updateLabels();
      updateTime();
    }
  );
}

// BUTTONS
// OPENS OPTIONS PAGE
document.getElementById("options-button").onclick = function () {
  if (document.getElementById("options-button").innerHTML === "☰") { // Change options icon
    document.getElementById("options-button").innerHTML = "✕";
  } else {
    document.getElementById("options-button").innerHTML = "☰";
  }

  // fulfils the inputs with the current time zone values by default
  timeZoneInput1.value = timeZoneLabel1;
  timeZoneInput2.value = timeZoneLabel2;
  timeZoneInput3.value = timeZoneLabel3;

  // Show/Hide Options Page
  if (document.getElementById("div-options-1").style.display === "none") {
    document.getElementById("div-options-1").style.display = "block";
  } else {
    document.getElementById("div-options-1").style.display = "none";
  }
  if (document.getElementById("div-options-2").style.display === "none") {
    document.getElementById("div-options-2").style.display = "block";
  } else {
    document.getElementById("div-options-2").style.display = "none";
  }
  if (document.getElementById("div-options-3").style.display === "none") {
    document.getElementById("div-options-3").style.display = "block";
  } else {
    document.getElementById("div-options-3").style.display = "none";
  }
  if (document.getElementById("div-options-4").style.display === "none") {
    document.getElementById("div-options-4").style.display = "block";
  } else {
    document.getElementById("div-options-4").style.display = "none";
  }
  if (document.getElementById("div-info").style.display === "none") {
    document.getElementById("div-info").style.display = "block";
  } else {
    document.getElementById("div-info").style.display = "none";
  }
};

// SETS TIME ZONE 1
setTimeZone1Btn.onclick = function () {
  currentTimeZone1 = timeZonesDropDown1.value; // sets time zone 1 to the dropdown value
  clock1City.innerHTML = timeZoneInput1.value; //updates time zone label 1 with the label input value
  timeZoneLabel1 = timeZoneInput1.value; //updates time zone label 1 VAR with the label input value

  // Saves ALL time zones and timezonelabels using the Chrome extension storage API.
  chrome.storage.sync.set(
    {
      time1: currentTimeZone1,
      time2: currentTimeZone2,
      time3: currentTimeZone3,
      label1: timeZoneLabel1,
      label2: timeZoneLabel2,
      label3: timeZoneLabel3,
    },
    function () {
      console.log(
        "Settings saved",
        currentTimeZone1,
        currentTimeZone2,
        currentTimeZone3,
        timeZoneLabel1,
        timeZoneLabel2,
        timeZoneLabel3
      );
    }
  );
};

// SETS TIME ZONE 2
setTimeZone2Btn.onclick = function () {
  currentTimeZone2 = timeZonesDropDown2.value; // sets time zone 2 to the dropdown menu value
  clock2City.innerHTML = timeZoneInput2.value; //updates time zone label 2 with the label input value
  timeZoneLabel2 = timeZoneInput2.value; //updates time zone label 2 VAR with the label input value

  // Saves ALL time zones and timezonelabels using the Chrome extension storage API.
  chrome.storage.sync.set(
    {
      time1: currentTimeZone1,
      time2: currentTimeZone2,
      time3: currentTimeZone3,
      label1: timeZoneLabel1,
      label2: timeZoneLabel2,
      label3: timeZoneLabel3,
    },
    function () {
      console.log(
        "Settings saved",
        currentTimeZone1,
        currentTimeZone2,
        currentTimeZone3,
        timeZoneLabel1,
        timeZoneLabel2,
        timeZoneLabel3
      );
    }
  );
};

// SETS TIME ZONE 3
setTimeZone3Btn.onclick = function () {
  currentTimeZone3 = timeZonesDropDown3.value; // sets time zone 3 to the dropdown value
  clock3City.innerHTML = timeZoneInput3.value; //updates time zone label 3 with the label input value
  timeZoneLabel3 = timeZoneInput3.value; //updates time zone label 3 VAR with the label input value

  // Saves ALL time zones and timezonelabels using the Chrome extension storage API.
  chrome.storage.sync.set(
    {
      time1: currentTimeZone1,
      time2: currentTimeZone2,
      time3: currentTimeZone3,
      label1: timeZoneLabel1,
      label2: timeZoneLabel2,
      label3: timeZoneLabel3,
    },
    function () {
      console.log(
        "Settings saved",
        currentTimeZone1,
        currentTimeZone2,
        currentTimeZone3,
        timeZoneLabel1,
        timeZoneLabel2,
        timeZoneLabel3
      );
    }
  );
};

// Toggles between 12 and 24 hour format
document.getElementById("set-12-24-btn").onclick = function () {
  if (is12Hour === false) {
    is12Hour = true;
  } else {
    is12Hour = false;
  }

  // Stores the 12/24 hour setting in the Chrome extension storage API.
  chrome.storage.sync.set({ is12Hour: is12Hour }, function () {
    console.log("Settings saved", is12Hour);
  });

  updateTime();
};

//Toggles between the dark and light theme
document.getElementById("dark-btn").onclick = function () {
  togglesLightOrDark();
};

function togglesLightOrDark() {
  var root = document.querySelector(":root");
  if (isDark === false) {
    isDark = true;
    root.style.setProperty("--background-color", "#1a1a1a");
    root.style.setProperty("--text-color", "#DCD7CC");
    document.getElementById("dark-btn").innerHTML = "Light";
  } else {
    isDark = false;
    root.style.setProperty("--background-color", "#DCD7CC");
    root.style.setProperty("--text-color", "black");
    document.getElementById("dark-btn").innerHTML = "Dark";
  }
  // Stores the dark/light theme setting in the Chrome extension storage API.
  chrome.storage.sync.set({ isDark: isDark }, function () {
    console.log("Settings saved", isDark);
  });
}

// Sets to light or dark without togling, to use in getStorageData().
function lightOrDark() {
  var root = document.querySelector(":root");
  if (isDark === false) {
    root.style.setProperty("--background-color", "#DCD7CC");
    root.style.setProperty("--text-color", "black");
    document.getElementById("dark-btn").innerHTML = "Dark";
  } else {
    root.style.setProperty("--background-color", "#1a1a1a");
    root.style.setProperty("--text-color", "#DCD7CC");
    document.getElementById("dark-btn").innerHTML = "Light";
  }
}

//changes the font style between Roboto and Orbitron
document.getElementById("font-btn").onclick = function () {
  var body = document.querySelector("body");
  if (fontStyle === "Orbitron") {
    body.style.fontFamily = "Roboto";
    fontStyle = "Roboto";
  } else {
    body.style.fontFamily = "Orbitron";
    fontStyle = "Orbitron";
  }

  chrome.storage.sync.set({ fontStyle: fontStyle }, function () {
    console.log("Settings saved", fontStyle);
  });
};

//updates the the font without togling, to use in getStorageData().
function storedFontStyle() {
  var body = document.querySelector("body");
  if (fontStyle === "Orbitron") {
    body.style.fontFamily = "Orbitron";
  } else {
    body.style.fontFamily = "Roboto";
    fontStyle = "Roboto";
  }
}

getStorageData();
updateLabels();
updateTime();

setInterval(updateTime, 1000); // Updates time every second