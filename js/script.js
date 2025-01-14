import { store } from "./store.js";
import { addSchedule, updateScheduleList, loadSchedules } from "./schedule.js";
import { startReminderCheck } from "./reminder.js";

document.addEventListener("DOMContentLoaded", () => {
  // Load saved schedules
  loadSchedules();

  // Initialize form handler
  const form = document.getElementById("schedule-form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const plantData = {
      plantName: document.getElementById("plant-name").value,
      plantType: document.getElementById("plant-type").value,
      nextWatering: new Date(
        document.getElementById("watering-date").value +
          "T" +
          document.getElementById("watering-time").value
      ),
      frequency: document.getElementById("watering-frequency").value,
    };

    addSchedule(plantData);
    form.reset();
  });

  startReminderCheck();
});
