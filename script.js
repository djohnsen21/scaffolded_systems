// Load Navigation Bar on All Pages
document.addEventListener("DOMContentLoaded", function() {
    let navPlaceholder = document.getElementById("nav-placeholder");
    if (navPlaceholder) {
        fetch("nav.html")
            .then(response => response.text())
            .then(data => {
                navPlaceholder.innerHTML = data;
            })
            .catch(error => console.error("Error loading navigation:", error));
    }
});

// Back Button Functionality
function goBack() {
    window.history.back();
}

// Save Inputs in LocalStorage
document.addEventListener("DOMContentLoaded", function() {
    // Restore saved outcome input
    if (document.getElementById("outcome")) {
        let savedOutcome = localStorage.getItem("outcome");
        if (savedOutcome) {
            document.getElementById("outcome").value = savedOutcome;
        }

        document.getElementById("outcome").addEventListener("input", function() {
            localStorage.setItem("outcome", this.value);
        });
    }

    // Restore saved precondition input
    if (document.getElementById("precondition")) {
        let savedPrecondition = localStorage.getItem("precondition");
        if (savedPrecondition) {
            document.getElementById("precondition").value = savedPrecondition;
        }

        document.getElementById("precondition").addEventListener("input", function() {
            localStorage.setItem("precondition", this.value);
        });
    }

    // Load saved map on Map Page
    if (document.getElementById("map")) {
        loadMap();
    }
});

// Handle End Goal submission
document.addEventListener("DOMContentLoaded", function() {
    const outcomeInput = document.getElementById("outcome");
    const submitOutcomeBtn = document.getElementById("submit-outcome-btn");
    const outcomeDisplay = document.getElementById("outcome-display");
    const mapContainer = document.getElementById("map");
  
    if (submitOutcomeBtn) {
      submitOutcomeBtn.addEventListener("click", function() {
        const outcomeText = outcomeInput.value.trim();
        if (outcomeText !== "") {
          outcomeDisplay.textContent = "End Goal: " + outcomeText;
          // Add End Goal block to map
          mapContainer.innerHTML = `<div class="map-block" id="end-goal-block">${outcomeText}</div>`;
          localStorage.setItem("endGoal", outcomeText);
        }
      });
    }
  
    // Restore saved End Goal
    const savedEndGoal = localStorage.getItem("endGoal");
    if (savedEndGoal && document.getElementById("end-goal-block") === null) {
      outcomeDisplay.textContent = "End Goal: " + savedEndGoal;
      mapContainer.innerHTML = `<div class="map-block" id="end-goal-block">${savedEndGoal}</div>`;
    }
  
    // Add preconditions to the map
    const addPreconditionBtn = document.getElementById("add-precondition-btn");
    if (addPreconditionBtn) {
      addPreconditionBtn.addEventListener("click", function() {
        const precondition = document.getElementById("precondition").value.trim();
        if (precondition !== "") {
          const block = document.createElement("div");
          block.className = "map-block";
          block.textContent = precondition;
  
          const removeBtn = document.createElement("button");
          removeBtn.className = "remove-btn";
          removeBtn.innerHTML = "&times;";
          removeBtn.addEventListener("click", () => block.remove());
  
          block.appendChild(removeBtn);
          mapContainer.appendChild(block);
          document.getElementById("precondition").value = "";
        }
      });
    }
  
    // Finish Map button
    const finishMapBtn = document.getElementById("finish-map-btn");
    if (finishMapBtn) {
      finishMapBtn.addEventListener("click", function() {
        alert("Map submitted! AI feedback is now being generated (feature coming soon).");
      });
    }
  });
  

// Add Preconditions to Map (Fix Button Click Issue)
document.addEventListener("DOMContentLoaded", function() {
    let addPreconditionButton = document.getElementById("add-precondition-btn");
    if (addPreconditionButton) {
        addPreconditionButton.addEventListener("click", addPrecondition);
    }
});

// Add Precondition to Map & Save
function addPrecondition() {
    let precondition = document.getElementById("precondition").value.trim();
    if (precondition === "") return;

    let mapContainer = document.getElementById("map");
    let block = document.createElement("div");
    block.textContent = precondition;
    block.className = "map-block";
    block.draggable = true;
    block.ondragstart = dragStart;
    block.ondragover = dragOver;
    block.ondrop = drop;

    mapContainer.appendChild(block);
    saveMap();
}

// Drag and Drop Functionality
function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.innerText);
    event.target.classList.add("dragging");
}

function dragOver(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    let data = event.dataTransfer.getData("text/plain");
    let block = document.createElement("div");
    block.textContent = data;
    block.className = "map-block";
    block.draggable = true;
    block.ondragstart = dragStart;
    block.ondragover = dragOver;
    block.ondrop = drop;

    event.target.closest("#map").appendChild(block);
    saveMap();
}

// Save & Load Map from LocalStorage
function saveMap() {
    let preconditions = [];
    document.querySelectorAll("#map .map-block").forEach(block => {
        preconditions.push(block.textContent);
    });
    localStorage.setItem("userMap", JSON.stringify(preconditions));
}

function loadMap() {
    let mapContainer = document.getElementById("map");
    mapContainer.innerHTML = ""; // Clear existing blocks
    let savedMap = JSON.parse(localStorage.getItem("userMap") || "[]");

    savedMap.forEach(precondition => {
        let block = document.createElement("div");
        block.textContent = precondition;
        block.className = "map-block";
        block.draggable = true;
        block.ondragstart = dragStart;
        block.ondragover = dragOver;
        block.ondrop = drop;
        mapContainer.appendChild(block);
    });
}

// Share Map (Copyable Link)
function shareMap() {
    let link = `${window.location.origin}/map.html`;
    navigator.clipboard.writeText(link).then(() => {
        alert("Map link copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy: ", err);
    });
}

// Theme Selection
function changeTheme() {
    let theme = document.getElementById("theme").value;
    if (theme === "dark") {
        document.body.style.background = "#333";
        document.body.style.color = "#fff";
    } else {
        document.body.style.background = "";
        document.body.style.color = "";
    }
}

// Logout Function
function logout() {
    alert("You have been logged out.");
    window.location.href = "index.html";
}
