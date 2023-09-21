let listWidth = 300;
let maxHeight = 300;
let listBorder = "1px solid black";
let listBackgroundColor = "gray";

let headerSize = "30px";
let headerText = "To Do List";
let headerTextColor = "white";

let itemFontSize = "20";
let checkedColor = "darkgray";

let toDoArray = [];

toDoArray = getToDoArrayFromCookie();

let cookiesDialog = document.createElement("div");
cookiesDialog.style.width = "400px";
cookiesDialog.style.height = "200px";
cookiesDialog.style.backgroundColor = "gray";
cookiesDialog.style.borderRadius = "15px";
cookiesDialog.style.display = "flex";
cookiesDialog.style.flexDirection = "column";
cookiesDialog.style.gap = "10px";
cookiesDialog.style.alignItems = "center";
cookiesDialog.style.justifyContent = "center";
cookiesDialog.style.position = "fixed"
cookiesDialog.style.left = "0px";
cookiesDialog.style.top = "0px";
let cookiesHeader = document.createElement("h1");
cookiesHeader.textContent = "This page uses cookies";
let cookiesUnderHeader = document.createElement("p");
cookiesUnderHeader.textContent =
  "We use cookies to save your todo's for next time";
let answerContainer = document.createElement("div");
let allowCookiesButton = document.createElement("button");
let cookieImage  = document.createElement("img");
cookieImage.style.width = "50px";
cookieImage.style.position = "absolute";
cookieImage.style.top = "10px";
cookieImage.src = "cookie.png";
allowCookiesButton.textContent = "Allow Cookies";
allowCookiesButton.addEventListener("click", function () {
  allowCookies = true;
  cookiesContainer.style.display = "none";
})

let disAllowCookiesButton = document.createElement("button");
disAllowCookiesButton.textContent = "Don't allow Cookies";
disAllowCookiesButton.addEventListener("click", function () {
    blockButton();
})
disAllowCookiesButton.addEventListener("mouseover", func, false);
function func()
{
    disAllowCookiesButton.textContent = "Also allow Cookies";
    allowCookiesButton.textContent = "Allow even more cookies";
}

function blockButton(){
// move the cookieImage infront of the disAllowCookiesButton to block it
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
        cookieY = cookieY + 0.9
        cookieW = cookieW + 1.5
        cookieImage.style.width = cookieW + "px"
        cookieImage.style.left = cookieX + "px";
        cookieImage.style.top = cookieY + "px";
    }
  }

}



answerContainer.append(allowCookiesButton, disAllowCookiesButton);
cookiesDialog.append(cookieImage, cookiesHeader, cookiesUnderHeader, answerContainer);

let allowCookies = true;
let toDoContainer = document.getElementById("toDoContainer");

let cookiesContainer = document.getElementById("cookiesContainer");
cookiesContainer.append(cookiesDialog);


toDoContainer.style.minWidth = listWidth + "px";
toDoContainer.style.backgroundColor = listBackgroundColor;
toDoContainer.style.border = listBorder;
toDoContainer.style.display = "flex";
toDoContainer.style.flexDirection = "column";
toDoContainer.style.alignItems = "center";
toDoContainer.style.justifyContent = "space-between";
toDoContainer.style.borderRadius = "15px";

let header = document.createElement("h1");
header.style.fontSize = headerSize;
header.style.påddingBottom = "10px";
header.style.color = headerTextColor;
header.textContent = headerText;
toDoContainer.append(header);


let info = document.createElement("p");
info.textContent = "Click on an item to mark it as completed, or right click to remove it";
info.style.padding = "10px";
info.style.backgroundColor = "lightgray";


let listItemsContainer = document.createElement("div");
listItemsContainer.style.minWidth = listWidth + "px";
listItemsContainer.style.maxHeight = maxHeight + "px";
listItemsContainer.style.overflowY = "auto";
toDoContainer.append(info, listItemsContainer);

let controlContainer = document.createElement("div");
controlContainer.style.height = 40 + "px";
controlContainer.style.display = "flex";
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

function addItem() {
  let item = textInput.value;
  toDoArray.push({ item, completed: false });
  updateItems();
  textInput.value = "";
  info.style.display = "none";
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
updateItems();

function updateItems() {
  listItemsContainer.innerHTML = "";
  for (let i = 0; i < toDoArray.length; i++) {
    let listItem = document.createElement("li");

    if (toDoArray[i].completed == false) {
      listItem.style.textDecoration = "none";
      listItem.style.color = "black";
      listItem.style.paddingLeft = "10px";
    } else if (toDoArray[i].completed == true) {
      listItem.style.textDecoration = "line-through";
      listItem.style.color = checkedColor;
    }

    listItem.style.paddingRight = "10px";
    listItem.textContent = toDoArray[i].item;
    listItem.style.fontFamily = "Arial";
    listItem.style.fontSize = itemFontSize + "px";
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
