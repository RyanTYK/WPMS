document.addEventListener("DOMContentLoaded", () => {
  const scheduleForm = document.getElementById("schedule-form");
  const scheduleList = document.getElementById("schedule-list");
  const historyList = document.getElementById("history-list");
  const reminders = document.getElementById("reminders");

  const schedules = [];

  // Handle form submission
  scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const plantName = document.getElementById("plant-name").value;
    const wateringInterval = parseInt(
      document.getElementById("watering-interval").value,
      10
    );

    const nextWatering = new Date();
    nextWatering.setDate(nextWatering.getDate() + wateringInterval);

    schedules.push({ plantName, wateringInterval, nextWatering });

    updateScheduleList();
    scheduleForm.reset();
  });

  // Update the schedule list
  function updateScheduleList() {
    scheduleList.innerHTML = "";
    schedules.forEach((schedule, index) => {
      const listItem = document.createElement("li");
      listItem.className =
        "list-group-item d-flex justify-content-between align-items-center";
      listItem.textContent = `${schedule.plantName} - Water every ${
        schedule.wateringInterval
      } days (Next: ${schedule.nextWatering.toDateString()})`;

      const waterButton = document.createElement("button");
      waterButton.className = "btn btn-success btn-sm";
      waterButton.textContent = "Mark as Watered";
      waterButton.addEventListener("click", () => {
        markAsWatered(index);
      });
      listItem.appendChild(waterButton);

      scheduleList.appendChild(listItem);
    });

    updateReminders();
  }

  // Mark a plant as watered
  function markAsWatered(index) {
    const schedule = schedules[index];
    schedule.nextWatering.setDate(
      schedule.nextWatering.getDate() + schedule.wateringInterval
    );

    const historyItem = document.createElement("li");
    historyItem.className = "list-group-item";
    historyItem.textContent = `Watered ${
      schedule.plantName
    } on ${new Date().toDateString()}`;
    historyList.appendChild(historyItem);

    updateScheduleList();
  }

  // Update reminders
  function updateReminders() {
    const now = new Date();
    const duePlants = schedules.filter(
      (schedule) => schedule.nextWatering <= now
    );

    reminders.textContent = duePlants.length
      ? `Plants to water today: ${duePlants
          .map((schedule) => schedule.plantName)
          .join(", ")}`
      : "No plants need watering today!";
  }
});
