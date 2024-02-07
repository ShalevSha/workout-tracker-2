let WorkoutData = [];
let variationData = [];
let currentIndex;
let highestWeight = 0;
maxWeight = 0;
async function fetchWorkoutData(value) {
  if (value == "Legs") {
    value = "Leg";
  }
  if (value == "arms") {
    value = "shoulder";
  }
  if (value == "back") {
    value = "Back";
  }
  if (value == "chest") {
    value = "chest";
  }
  console.log("Fetching workout data...");
  try {
    const response = await fetch(`/workout/${value}`);
    const data = await response.json();
    WorkoutData = data;
    console.log(data, "WorkoutData");
    renderWorkout(WorkoutData, 0);

    return data;
  } catch (error) {
    console.error("Error fetching workout data:", error);
  }
}
function fetchVariationData(fromDate, toDate, exerciseID) {
  console.log(
    exerciseID._id,
    fromDate?.value,
    toDate?.value,
    "Fetching variation data..."
  );

  // Construct the URL with query parameters
  let url = `/variation`;

  if (fromDate?.value && !toDate?.value) {
    url += `?from=${fromDate?.value}`;
  }
  if (!fromDate?.value && toDate?.value) {
    url += `?to=${toDate.value}`;
  }
  if (fromDate?.value && toDate?.value) {
    url += `?from=${fromDate?.value}&to=${toDate.value}`;
  }
  if (exerciseID._id) {
    console.log(toDate?.value, "toDate?.value");
    url += `${fromDate?.value || toDate?.value ? "&" : "?"}exerciseID=${
      exerciseID._id
    }`;
  }

  let value = fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log("data", data);
      return data;
    })
    .catch((error) => console.error("Error fetching workout data:", error));

  return value;
}

const startBtn = document.querySelector("menu button");
const pageContent = document.querySelector(".content");

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

async function chooseWorkout(e) {
  if (e.target.classList.value == "day") {
    const wantedWorkout = parseInt(e.target.getAttribute("data-id"));
    console.log(e.target.textContent, "wantedWorkout");
    let wantedNum = 0;
    currentIndex = 0;

    renderWorkout(fetchWorkoutData(e.target.textContent), wantedNum);
  }
}
async function openModal(event) {
  const index = event.target.getAttribute("data-index");
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modalContent");

  // Fetch initial variation data
  await handleDateInputChange();

  const workoutData = WorkoutData[currentIndex];

  modalContent.innerHTML = `
    <h2 class="header">${workoutData.exercise}</h2>
    <p class="max-weight">Max Weight: ${maxWeight} kg</p>
    <label class="date-label" for="fromInput">From:</label>
    <input type="date" id="fromInput" name="fromInput" />

    <label class="date-label" for="toInput">To:</label>
    <input type="date" id="toInput" name="toInput" />

    <table class="record-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Reps</th>
          <th>Weight</th>
        </tr>
      </thead>
      <tbody>
        ${variationData?.map(
          (record) => `
          <tr>
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>${record.setRecord.repsUpdate}</td>
            <td>${record.setRecord.weightUpdate}</td>
          </tr>
        `
        )}
      </tbody>
    </table>
  `;
  const style = document.createElement("style");
  style.innerHTML = `
  .record-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .record-table th, .record-table td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    color:black
  }

  .record-table th {
    background-color:rgb(255 152 63);
    color: white;
  }
  .header, .max-weight {
    color: white;
  }
  
  .record-table th {
    color: black;
    /* Add any other styling you need for the table header and cells */
  }
   .record-table td {
    color: white;
    /* Add any other styling you need for the table header and cells */
  }
  .date-label {
    color: white;
  }
`;

  document.head.appendChild(style);
  // Add event listeners for date input changes
  const fromInput = document.getElementById("fromInput");
  const toInput = document.getElementById("toInput");

  fromInput.addEventListener("input", handleDateInputChange);
  toInput.addEventListener("input", handleDateInputChange);

  // Display the modal
  modal.style.display = "block";
}
async function handleDateInputChange() {
  const fromInput = document.getElementById("fromInput");
  const toInput = document.getElementById("toInput");
  // Fetch variation data when the date inputs change
  fetchVariationData(fromInput, toInput, WorkoutData[currentIndex])
    .then((data) => {
      variationData = data;
      // Update the modal content with the new variation data
      updateModalContent();
    })
    .catch((error) => console.error("Error fetching variation data:", error));
}

function updateModalContent() {
  // Update the table body with the new variation data
  const tableBody = modalContent.querySelector(".record-table tbody");
  tableBody.innerHTML = variationData
    ? variationData
        .map(
          (record) => `
          <tr>
            <td>${new Date(record.date).toLocaleDateString()}</td>
            <td>${record.setRecord.repsUpdate}</td>
            <td>${record.setRecord.weightUpdate}</td>
          </tr>
        `
        )
        .join("")
    : "";
}
function closeModel() {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
}

function nextWorkout(e) {
  if (e.target.id == "next-workout-btn") {
    const currentExercise = parseInt(
      document
        .getElementById("current-exercise-display")
        .getAttribute("data-current-exercise")
    );
    let wantedNum = currentExercise;
    currentIndex = wantedNum;

    const totalExercises = WorkoutData.length;

    if (wantedNum + 1 == totalExercises) {
      pageContent.innerHTML = `YOU FINISHED`;
    } else {
      renderWorkout(WorkoutData, wantedNum);
    }
  }
}
async function highestWeightExercise() {
  highestWeight = 0;
  const fromInput = document.getElementById("fromInput");
  const toInput = document.getElementById("toInput");

  try {
    const data = await fetchVariationData(
      fromInput,
      toInput,
      WorkoutData[currentIndex]
    );
    if (data) {
      data?.map((value) => {
        if (value.setRecord.weightUpdate > highestWeight) {
          highestWeight = value.setRecord.weightUpdate;
        }
      });
      return highestWeight;
    }
  } catch (error) {
    console.error("Error fetching variation data:", error);
    throw error;
  }
}

async function renderWorkout(wantedWorkout, wantedNum) {
  console.log(wantedWorkout, wantedNum, "wantedNum");
  maxWeight = await highestWeightExercise();
  const currentExerciseHTML = `
  <div class="exrcise-head-container">
    <h2>${WorkoutData[wantedNum]?.exercise}</h2>
    <hr />
    <p>
      Max Weight <br /><br />
      <span>${maxWeight} kg</span>
     
    </p>
    <button class="view-record-btn" id="viewRecordBtn">View Record</button>

  </div>
  <div class="all-exrcises-container"></div>
  <button id="next-workout-btn">next workout</button>
  <p id="current-exercise-display" data-current-exercise="${wantedNum + 1}">${
    wantedNum + 1
  }/${WorkoutData.length}</p>
`;

  pageContent.innerHTML = currentExerciseHTML;

  for (i = 0; i < WorkoutData[wantedNum].sets; i++) {
    const allExercisesContainer = document.querySelector(
      ".all-exrcises-container"
    );

    const exerciseContainer = document.createElement("div");
    exerciseContainer.classList.add("exrcise-container");

    // Create View Record button

    // prettier-ignore
    exerciseContainer.innerHTML += `
    <form>
        <div class="input-container">
        <input name="indexInput" type="hidden" style="display:none" value=${
          i
        } />
        <input name="weightInput" type="number" value=${
          WorkoutData[wantedNum]["setsRecord"].length > 0 && WorkoutData[wantedNum]["setsRecord"][i] ? WorkoutData[wantedNum]["setsRecord"][i]["weightUpdate"] : 0
        } />
          <span>kg</span>
        </div>
        <hr />
        <div class="input-container">
          <input name="repsInput" type="number"  value=${
            WorkoutData[wantedNum]["setsRecord"].length > 0 && WorkoutData[wantedNum]["setsRecord"][i] ? WorkoutData[wantedNum]["setsRecord"][i]["repsUpdate"] : 0
          } />
          <span>reps</span>
        </div>
        <hr />
        <input id="submit-drill-btn" type="submit" value="&raquo&raquo"/>
    </form>
    
    `;

    allExercisesContainer.appendChild(exerciseContainer);

    const form = exerciseContainer.querySelector("form");
    form.addEventListener("submit", handleFormSubmit);
  }
}

function handleFormSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const workoutData = {
    indexInput: formData.get("indexInput"),
    weight: formData.get("weightInput"),
    reps: formData.get("repsInput"),
  };

  saveWorkoutData(workoutData);
}

function saveWorkoutData(singleworkoutData) {
  let bodyData = WorkoutData;
  if (
    WorkoutData[currentIndex]["setsRecord"].length > 0 &&
    WorkoutData[currentIndex]["setsRecord"][singleworkoutData.indexInput]
  ) {
    WorkoutData[currentIndex]["setsRecord"][singleworkoutData.indexInput][
      "repsUpdate"
    ] = Number(singleworkoutData.reps);
    WorkoutData[currentIndex]["setsRecord"][singleworkoutData.indexInput][
      "weightUpdate"
    ] = Number(singleworkoutData.weight);
    bodyData = {
      ...WorkoutData[currentIndex],
      variation: {
        repsUpdate: Number(singleworkoutData.reps),
        weightUpdate: Number(singleworkoutData.weight),
      },
    };
  } else if (!WorkoutData[currentIndex]["setsRecord"].length > 0) {
    bodyData = {
      ...WorkoutData[currentIndex],
      setsRecord: [
        {
          repsUpdate: Number(singleworkoutData.reps),
          weightUpdate: Number(singleworkoutData.weight),
        },
      ],
      variation: {
        repsUpdate: Number(singleworkoutData.reps),
        weightUpdate: Number(singleworkoutData.weight),
      },
    };
  } else if (
    WorkoutData[currentIndex]["setsRecord"].length > 0 &&
    !WorkoutData[currentIndex]["setsRecord"][singleworkoutData.indexInput]
  ) {
    bodyData = {
      ...WorkoutData[currentIndex],
      setsRecord: [
        ...WorkoutData[currentIndex]["setsRecord"],
        {
          repsUpdate: Number(singleworkoutData.reps),
          weightUpdate: Number(singleworkoutData.weight),
        },
      ],
      variation: {
        repsUpdate: Number(singleworkoutData.reps),
        weightUpdate: Number(singleworkoutData.weight),
      },
    };
  }

  fetch(`/workout/${WorkoutData[currentIndex]._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bodyData),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Workout data saved:", data);
    })
    .catch((error) => console.error("Error saving workout data:", error));
}
const closeModalBtn = document.getElementById("closeModalBtn");
closeModalBtn.addEventListener("click", closeModel);
pageContent.addEventListener("click", function (event) {
  if (event.target.classList.contains("view-record-btn")) {
    openModal(event);
  }
});
startBtn.addEventListener("click", clickStart);
pageContent.addEventListener("click", chooseWorkout);
pageContent.addEventListener("click", nextWorkout);
