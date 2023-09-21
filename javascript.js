let toDoArray = [];
toDoArray = getToDoArrayFromCookie();
let cookiesDialog = document.createElement("div");
cookiesDialog.id = "cookiesDialog";
let cookiesHeader = document.createElement("h1");
cookiesHeader.textContent = "This page uses cookies";
let cookiesUnderHeader = document.createElement("p");
cookiesUnderHeader.textContent =
  "We use cookies to save your todo's for next time";
let answerContainer = document.createElement("div");
let allowCookiesButton = document.createElement("button");
let cookieImage = document.createElement("img");
cookieImage.src = "cookie.png";
allowCookiesButton.textContent = "Allow Cookies";
allowCookiesButton.addEventListener("click", function () {
  allowCookies = true;
  cookiesContainer.style.display = "none";
});
let disAllowCookiesButton = document.createElement("button");
disAllowCookiesButton.textContent = "Don't allow Cookies";
disAllowCookiesButton.addEventListener("click", function () {
  blockButton();
});
disAllowCookiesButton.addEventListener("mouseover", func, false);
function func() {
  disAllowCookiesButton.textContent = "Don't allow Cookies";
  allowCookiesButton.textContent = "Allow even more cookies";
}
answerContainer.append(allowCookiesButton, disAllowCookiesButton);
cookiesDialog.append(
  cookieImage,
  cookiesHeader,
  cookiesUnderHeader,
  answerContainer
);

let allowCookies = true;
let toDoContainer = document.getElementById("toDoContainer");

let cookiesContainer = document.getElementById("cookiesContainer");
cookiesContainer.append(cookiesDialog);

toDoContainer.style.minWidth = "300px";
toDoContainer.style.backgroundColor = "gray";
toDoContainer.style.border = "1px solid black";

let header = document.createElement("h1");
header.style.fontSize = "30px";
header.style.påddingBottom = "10px";
header.style.color = "white";
header.textContent = "To Do List";
toDoContainer.append(header);
let info = document.createElement("p");
info.id = "info";
info.textContent =
  "Click on an item to mark it as completed, or right click to remove it";
  info.addEventListener("contextmenu", (event) => {
    info.style.display = "none";
  })
  info.addEventListener("click", (event) => {
    info.style.display = "none";
  })
if (toDoArray.length > 0) {
  info.style.display = "none";
  cookiesContainer.style.display = "none";
}
let listItemsContainer = document.createElement("div");
listItemsContainer.style.minWidth = "300px";
listItemsContainer.style.maxHeight = "300px";
listItemsContainer.style.overflowY = "auto";
toDoContainer.append(info, listItemsContainer);
let controlContainer = document.createElement("div");
controlContainer.style.height = "50px";
controlContainer.style.display = "flex";
controlContainer.style.justifyContent = "space-between";
controlContainer.style.paddingTop = "10px";
controlContainer.style.paddingBottom = "10px";
let textInput = document.createElement("input");
textInput.type = "text";
textInput.className = "textInput";
textInput.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addItem();
  }
});
controlContainer.append(textInput);
let addButton = document.createElement("button");
addButton.textContent = "Add";
controlContainer.append(addButton);
toDoContainer.append(controlContainer);
addButton.addEventListener("click", function () {
  addItem();
});
function blockButton() {
  let cookieY = 10;
  let cookieX = 175;
  let cookieW = 50;
  let id = null;
  clearInterval(id);
  id = setInterval(frame, 2);
  function frame() {
    if (cookieY > 65) {
      clearInterval(id);
    } else {
      cookieX = cookieX + 0.7;
      cookieY = cookieY + 0.9;
      cookieW = cookieW + 1.5;
      cookieImage.style.width = cookieW + "px";
      cookieImage.style.left = cookieX + "px";
      cookieImage.style.top = cookieY + "px";
    }
  }
}
function addItem() {
  if (textInput.value != "") {
    let item = textInput.value;
    toDoArray.push({ item, completed: false });
    updateItems();
    textInput.value = "";
    info.style.display = "none";
    textInput.placeholder = ""
  } else{
    textInput.placeholder = "Please enter an item"
    textInput.placeholder.color = "red"
  }
}
function removeItem(itemNumber) {
  info.style.display = "none";
  toDoArray.splice(itemNumber, 1);
  updateItems();
  setToDoArrayCookie();
}
function toggleItem(itemNumber) {
  toDoArray[itemNumber].completed = !toDoArray[itemNumber].completed;
  updateItems();
}
function updateItems() {
  listItemsContainer.innerHTML = "";
  for (let i = 0; i < toDoArray.length; i++) {
    let listItem = document.createElement("div");
    if (toDoArray[i].completed == false) {
      listItem.style.textDecoration = "none";
      listItem.style.color = "black";
      listItem.style.textAlign = "center";
      listItem.style.border = "1px dotted darkgray";
    } else if (toDoArray[i].completed == true) {
      listItem.style.color = "darkgray";
      listItem.textAlign = "left";
      listItem.style.textDecoration = "line-through";
      listItem.style.textDecorationColor = "green";
    }
    listItem.style.paddingRight = "10px";
    listItem.textContent = toDoArray[i].item;
    listItem.style.fontSize = "25px";
    listItem.addEventListener("click", function () {
      toggleItem(i);
    });
    listItem.addEventListener("contextmenu", (event) => {
      removeItem(i);
    });
    listItemsContainer.append(listItem);
    setToDoArrayCookie();
  }
}
function setToDoArrayCookie() {
  if (allowCookies == true) {
    const jsonToDoArray = JSON.stringify(toDoArray);
    document.cookie = `toDoArray=${jsonToDoArray}; expires=Tue, 19 Jan 2038 03:14:07 GMT; path=/`;
  }
}
function getToDoArrayFromCookie() {
  const name = "toDoArray=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i].trim();
    if (cookie.indexOf(name) === 0) {
      const jsonToDoArray = cookie.substring(name.length, cookie.length);
      return JSON.parse(jsonToDoArray);
    }
  }
  return [];
}
updateItems();