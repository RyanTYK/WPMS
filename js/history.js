export function addToHistory(schedule) {
  const historyList = document.getElementById("history-list");
  const historyItem = document.createElement("div");
  historyItem.className = "list-group-item border-start border-success border-4";

  historyItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">${schedule.plantName}</h6>
            <small class="text-muted">${new Date().toLocaleString()}</small>
        </div>
        <p class="mb-1">Watered on ${new Date().toLocaleString()}</p>
        <small class="text-success">
            <i class="fas fa-check-circle me-1"></i>Completed
        </small>
        <div class="actions">
            <button class="btn btn-sm btn-outline-danger delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;

  historyList.insertBefore(historyItem, historyList.firstChild);

  // Attach event listener for delete action
  historyItem.querySelector(".delete-btn").addEventListener("click", () => deleteHistory(historyItem));

  // Save to local storage
  saveHistoryToLocalStorage();
}

// Delete history item
function deleteHistory(historyItem) {
  historyItem.remove();
  saveHistoryToLocalStorage();
}

// Save history list to local storage
function saveHistoryToLocalStorage() {
  const historyItems = Array.from(document.querySelectorAll("#history-list .list-group-item"));
  const historyData = historyItems.map(item => ({
    plantName: item.querySelector("h6").textContent,
    date: item.querySelector("small").textContent,
    details: item.querySelector("p").textContent
  }));
  localStorage.setItem("plantWateringHistory", JSON.stringify(historyData));
}

// Load history from local storage
export function loadHistoryFromLocalStorage() {
  const savedHistory = JSON.parse(localStorage.getItem("plantWateringHistory") || "[]");
  const historyList = document.getElementById("history-list");

  savedHistory.forEach(history => {
    const historyItem = document.createElement("div");
    historyItem.className = "list-group-item border-start border-success border-4";

    historyItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">${history.plantName}</h6>
            <small class="text-muted">${history.date}</small>
        </div>
        <p class="mb-1">${history.details}</p>
        <small class="text-success">
            <i class="fas fa-check-circle me-1"></i>Completed
        </small>
        <div class="actions">
            <button class="btn btn-sm btn-outline-danger delete-btn"><i class="fas fa-trash"></i></button>
        </div>
    `;

    historyList.appendChild(historyItem);

    // Attach event listener for delete action
    historyItem.querySelector(".delete-btn").addEventListener("click", () => deleteHistory(historyItem));
  });
}
