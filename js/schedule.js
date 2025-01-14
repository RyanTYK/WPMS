import { store } from "./store.js";
import { addToHistory } from "./history.js";
import { updateReminders } from "./reminder.js";

export function addSchedule(plantData) {
  store.schedules.push(plantData);
  updateScheduleList();
  saveToLocalStorage();
}

export function updateScheduleList() {
  const scheduleList = document.getElementById("schedule-list");
  scheduleList.innerHTML = "";

  store.schedules.forEach((schedule, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${schedule.plantName}</td>
            <td><span class="badge bg-info">${schedule.plantType}</span></td>
            <td>${new Date(schedule.nextWatering).toLocaleString()}</td>
            <td>
                <button class="btn btn-sm btn-success" onclick="markAsWatered(${index})">
                    <i class="fas fa-check me-1"></i>Mark as Watered
                </button>
            </td>
        `;
    scheduleList.appendChild(row);
  });
}

function saveToLocalStorage() {
  localStorage.setItem("plantSchedules", JSON.stringify(store.schedules));
}

export function loadSchedules() {
  const saved = localStorage.getItem("plantSchedules");
  if (saved) {
    store.schedules = JSON.parse(saved);
    updateScheduleList();
  }
}

window.markAsWatered = function (index) {
  const schedule = store.schedules[index];
  addToHistory(schedule);
  store.schedules.splice(index, 1);

  if (!store.schedules.some((s) => new Date(s.nextWatering) <= new Date())) {
    store.audio.pause();
    store.audio.currentTime = 0;
    store.isPlaying = false;
  }

  updateScheduleList();
  updateReminders();
  saveToLocalStorage();
};
