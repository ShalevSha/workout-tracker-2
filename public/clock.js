function submitDrillUI(e) {
  // Check if the clicked element is the "submit drill" button
  if (e.target.id == "submit-drill-btn") {
    const timeDisplay = document.querySelector(".time");
    const minusButton = document.querySelector(".minus");
    const plusButton = document.querySelector(".plus");
    const clock = document.querySelector(".clock-container");

    clock.classList.remove("hide");

    let timerDuration = 60; // Default timer set to 1 minute
    let interval;

    function updateDisplay() {
      const minutes = Math.floor(timerDuration / 60);
      const seconds = timerDuration % 60;
      timeDisplay.textContent =
        minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
    }

    function startTimer() {
      clearInterval(interval); // Clear any existing intervals
      interval = setInterval(function () {
        if (timerDuration <= 0) {
          clearInterval(interval);
          clock.classList.add("hide");
          e.target.parentElement.style.opacity = "0.5";

          return;
        }
        timerDuration--;
        updateDisplay();
      }, 1000);
    }
    startTimer();

    minusButton.addEventListener("click", function () {
      timerDuration = Math.max(0, timerDuration - 15);
      updateDisplay();
    });

    plusButton.addEventListener("click", function () {
      timerDuration = timerDuration + 15;
      updateDisplay();
    });

    updateDisplay(); // Initialize display
    startTimer(); // Start the countdown immediately
  }
}

pageContent.addEventListener("click", submitDrillUI);
