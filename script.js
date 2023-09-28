let bookArray = [
  { id: 1, name: "name1", number: 2345 },
  { id: 2, name: "name2", number: 234554 },
  { id: 3, name: "name3", number: 38058 },
];

let editId = 0;

const nameInputRef = document.getElementById("nameInput");
const numberInputRef = document.getElementById("numberInput");
const btnRef = document.getElementById("btn");
const refRef = document.getElementById("ref");

const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

const editNum = (id) => {
  editId = id;
  const clickedNum = bookArray.find((number) => number.id === id);
  btnRef.innerText = "Edit";
  nameInputRef.value = clickedNum.name;
  numberInputRef.value = clickedNum.number;
};

const deleteNum = (id) => {
  bookArray = bookArray.filter((number) => {
    if (number.id !== id) {
      return number;
    }
  });
  render();
};

const render = () => {
  let namesDiv = "";

  for (let name of bookArray) {
    namesDiv += `<div class="d-flex align-items-center justify-content-between p-2 border-bottom border-primary">
                  <p class="fs-5 m-0">${name.name}</p>
                  <p class="fs-5 m-0">${name.number}</p>
                  <div>
                    <button onclick="editNum(${name.id})" class="btn">Edit</button>
                    <button onclick="deleteNum(${name.id})" class="btn text-danger">Delete</button>
                  </div>
                </div>`;
  }
  refRef.innerHTML = namesDiv;
};

btnRef.addEventListener("click", () => {
  if (nameInputRef.value !== "" && numberInputRef.value !== "") {
    if (editId === 0) {
      bookArray.push({
        id: getRandomNumber(),
        name: nameInputRef.value,
        nums: numberInputRef.value,
      });

      numberInputRef.value = "";
    } else {
      bookArray = bookArray.map((number) => {
        if (number.id == editId)
          return { ...number, name: nameInputRef.value, number: numberInputRef.value };
        else return number;
      });
    }
    editId = 0;
    nameInputRef.value="";
    numberInputRef.value = "";
    btnRef.innerText = "Add";
    render();
  } else {
    numberInputRef.classList.replace("border-primary", "is-invalid");
  }
});

nameInputRef.addEventListener("keyup", () => {
  if (nameInputRef.value !== "") {
    nameInputRef.classList.replace("is-invalid", "border-primary");
  } else {
    nameInputRef.classList.replace("border-primary", "is-invalid");
  }
});

numberInputRef.addEventListener("keyup", () => {
  if (numberInputRef.value !== "") {
    numberInputRef.classList.replace("is-invalid", "border-primary");
  } else {
    numberInputRef.classList.replace("border-primary", "is-invalid");
  }
});

render();
