const WorkoutData = [
  [
    {
      id: 1,
      exercise: "Seated Leg Press",
      reps: 10,
      sets: 3,
      maxWeight: 90,
    },
    {
      id: 2,
      exercise: "Seated Shoulder Press",
      reps: 10,
      sets: 3,
    },
    {
      id: 3,
      exercise: "Close Grip Lat Pulldown",
      reps: 10,
      sets: 3,
    },
    {
      id: 4,
      exercise: "Bodyweight Lunges",
      reps: 10,
      sets: 3,
    },
    {
      id: 5,
      exercise: "Full/Kneeling Press Ups",
      reps: 10,
      sets: 3,
    },
    {
      id: 6,
      exercise: "Plank",
      duration: "30 secs",
      sets: 3,
    },
    {
      id: 7,
      exercise: "Leg Raises",
      reps: 10,
      sets: 3,
    },
  ],
  [
    {
      id: 1,
      exercise: "Sholder Press",
      reps: 10,
      sets: 3,
      maxWeight: 90,
    },
    {
      id: 2,
      exercise: "Seated Shoulder Press",
      reps: 10,
      sets: 2,
    },
    {
      id: 3,
      exercise: "Close Grip Lat Pulldown",
      reps: 10,
      sets: 4,
    },
    {
      id: 4,
      exercise: "Bodyweight Lunges",
      reps: 10,
      sets: 8,
    },
    {
      id: 5,
      exercise: "Full/Kneeling Press Ups",
      reps: 10,
      sets: 3,
    },
    {
      id: 6,
      exercise: "Plank",
      duration: "30 secs",
      sets: 3,
    },
  ],
  [
    {
      id: 1,
      exercise: "Pull Ups",
      reps: 10,
      sets: 3,
      maxWeight: 90,
    },
    {
      id: 2,
      exercise: "Seated Shoulder Press",
      reps: 10,
      sets: 3,
    },
    {
      id: 3,
      exercise: "Close Grip Lat Pulldown",
      reps: 10,
      sets: 3,
    },
    {
      id: 4,
      exercise: "Bodyweight Lunges",
      reps: 10,
      sets: 3,
    },
    {
      id: 5,
      exercise: "Full/Kneeling Press Ups",
      reps: 10,
      sets: 3,
    },
    {
      id: 6,
      exercise: "Plank",
      duration: "30 secs",
      sets: 3,
    },
  ],
  [
    {
      id: 1,
      exercise: "Bicepes Press",
      reps: 10,
      sets: 3,
      maxWeight: 90,
    },
    {
      id: 2,
      exercise: "Seated Shoulder Press",
      reps: 10,
      sets: 3,
    },
    {
      id: 3,
      exercise: "Close Grip Lat Pulldown",
      reps: 10,
      sets: 3,
    },
    {
      id: 4,
      exercise: "Bodyweight Lunges",
      reps: 10,
      sets: 3,
    },
    {
      id: 5,
      exercise: "Full/Kneeling Press Ups",
      reps: 10,
      sets: 3,
    },
    {
      id: 6,
      exercise: "Plank",
      duration: "30 secs",
      sets: 3,
    },
  ],
];

const startBtn = document.querySelector("menu button");
const pageContent = document.querySelector(".content");

// replacing the main content to the list of the workout
function clickStart(e) {
  e.preventDefault();
  pageContent.innerHTML = `
    <div class="container-grid">
    <div class="day" id="day1" data-id="1">Legs</div>
    <div class="day" id="day2" data-id="2">arms</div>
      <div class="day" id="day3" data-id="3">back</div>
      <div class="day" id="day4" data-id="4">chest</div>
    </div>
    `;
}

// choosing a day out of all the workouts
function chooseWorkout(e) {
  // Check if the clicked element is a workout day
  if (e.target.classList.value == "day") {
    // Extract the workout day ID from the data attribute
    const wantedWorkout = parseInt(e.target.getAttribute("data-id"));
    let wantedNum = 0;
    // Render the first workout
    renderWorkout(wantedWorkout, wantedNum);
  }
}

// replacing the workout to the next one
function nextWorkout(e) {
  // Check if the clicked element is the "next workout" button
  if (e.target.id == "next-workout-btn") {
    // Get the current exercise number
    const currentExercise = parseInt(
      document
        .getElementById("current-exercise-display")
        .getAttribute("data-current-exercise")
    );
    let wantedNum = currentExercise;
    // Get the workout day and total exercises
    const wantedWorkout = parseInt(
      document.querySelector("h2").getAttribute("data-workout-number")
    );
    const totalExercises = parseInt(
      document.querySelector("h2").getAttribute("data-total-exercise")
    );

    // Check if all exercises for the day are completed
    if (wantedNum + 1 == totalExercises) {
      pageContent.innerHTML = `YOU FINISHED`;
    } else {
      // Render the next workout
      renderWorkout(wantedWorkout, wantedNum);
    }
  }
}

// replace html with updated exercise
function renderWorkout(wantedWorkout, wantedNum) {
  // Construct HTML for the current exercise
  const currentExerciseHTML = `
    <div class="exrcise-head-container">
            <h2 data-total-exercise="${
              WorkoutData[wantedWorkout - 1].length
            }" data-workout-number="${wantedWorkout}">${
    WorkoutData[wantedWorkout - 1][wantedNum].exercise
  }</h2>
            <hr />
            <p>
              max weight <br /><br />
              <span>${
                WorkoutData[wantedWorkout - 1][wantedNum].maxWeight
              }kg</span>
            </p>
          </div>
          <div class="all-exrcises-container">
          </div>
    <button id="next-workout-btn">next workout</button>
    <p id="current-exercise-display" data-current-exercise="${wantedNum + 1}">${
    wantedNum + 1
  }/${WorkoutData[wantedWorkout - 1].length}</p>
    `;

  pageContent.innerHTML = currentExerciseHTML;

  for (i = 0; i < WorkoutData[wantedWorkout - 1][wantedNum].sets; i++) {
    const allExercisesContainer = document.querySelector(
      ".all-exrcises-container"
    );
    const exerciseContainer = document.createElement("div");
    exerciseContainer.classList.add("exrcise-container");
    exerciseContainer.innerHTML = `
        <div class="input-container">
          <input type="number" placeholder="85" />
          <span>kg</span>
        </div>
        <hr />
        <div class="input-container">
          <input type="number" placeholder="12" />
          <span>reps</span>
        </div>
        <hr />
        <button id="submit-drill-btn">&raquo&raquo</button>
    `;

    allExercisesContainer.appendChild(exerciseContainer);
  }

  // Update the page content with the current exercise
}

startBtn.addEventListener("click", clickStart);
pageContent.addEventListener("click", chooseWorkout);
pageContent.addEventListener("click", nextWorkout);
