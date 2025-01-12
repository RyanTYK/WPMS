document.addEventListener("DOMContentLoaded", () => {
  const scheduleForm = document.getElementById("schedule-form");
  const scheduleList = document.getElementById("schedule-list");
  const historyList = document.getElementById("history-list");
  const reminders = document.getElementById("reminders");

  const schedules = [];

  // Create an audio element for the notification sound
  const audio = new Audio("audio.mp3");
  audio.loop = true; // Enable looping

  // Handle form submission
  scheduleForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const plantName = document.getElementById("plant-name").value;
    const wateringDate = document.getElementById("watering-date").value;
    const wateringTime = document.getElementById("watering-time").value;

    // Combine date and time into a single Date object
    const nextWatering = new Date(`${wateringDate}T${wateringTime}`);

    schedules.push({ plantName, nextWatering });

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
      listItem.innerHTML = `
            <div>
                <strong>${schedule.plantName}</strong> - Water on 
                ${schedule.nextWatering.toLocaleDateString()} at 
                ${schedule.nextWatering.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
            </div>
        `;

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

    const historyItem = document.createElement("li");
    historyItem.className = "list-group-item";
    historyItem.textContent = `Watered ${
      schedule.plantName
    } on ${new Date().toLocaleString()}`;
    historyList.appendChild(historyItem);

    schedules.splice(index, 1); // Remove the watered plant from the schedule
    updateScheduleList();

    // Stop the audio if there are no more due plants
    if (!schedules.some((schedule) => schedule.nextWatering <= new Date())) {
      audio.pause();
      audio.currentTime = 0; // Reset the audio to the beginning
    }
  }

  // Update reminders
  function updateReminders() {
    const now = new Date();
    const duePlants = schedules.filter(
      (schedule) => schedule.nextWatering <= now
    );

    reminders.textContent = duePlants.length
      ? `Plants to water now: ${duePlants
          .map((schedule) => schedule.plantName)
          .join(", ")}`
      : "No plants need watering right now!";

    if (duePlants.length) {
      audio.play(); // Play the notification sound
    }
  }
});
