import { store } from "./store.js";

export function updateReminders() {
  const reminderContainer = document.getElementById("reminders");
  const now = new Date();
  const duePlants = store.schedules.filter(
    (s) => new Date(s.nextWatering) <= now
  );

  reminderContainer.innerHTML = duePlants.length
    ? duePlants
        .map(
          (plant) => `
            <div class="list-group-item list-group-item-action">
                <div class="d-flex w-100 justify-content-between">
                    <h6 class="mb-1">${plant.plantName}</h6>
                    <span class="badge bg-danger">Water Now!</span>
                </div>
            </div>
        `
        )
        .join("")
    : '<div class="list-group-item">No plants need watering right now!</div>';

  if (duePlants.length && !store.isPlaying) {
    store.audio.play();
    store.isPlaying = true;
  } else if (!duePlants.length && store.isPlaying) {
    store.audio.pause();
    store.audio.currentTime = 0;
    store.isPlaying = false;
  }
}

export function startReminderCheck() {
  updateReminders();
  setInterval(updateReminders, 4000);
}
