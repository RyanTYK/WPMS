export function addToHistory(schedule) {
  const historyList = document.getElementById("history-list");
  const historyItem = document.createElement("div");
  historyItem.className =
    "list-group-item border-start border-success border-4";

  historyItem.innerHTML = `
        <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">${schedule.plantName}</h6>
            <small class="text-muted">Just now</small>
        </div>
        <p class="mb-1">Watered on ${new Date().toLocaleString()}</p>
        <small class="text-success">
            <i class="fas fa-check-circle me-1"></i>Completed
        </small>
    `;

  historyList.insertBefore(historyItem, historyList.firstChild);
}
