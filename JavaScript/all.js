const addList = document.querySelector("#addList");
const txt = document.querySelector(".txt");
let todoData = [];

//新增待辦
addList.addEventListener("click", addTodo);

function addTodo() {
  if (txt.value === "") {
    return;
  }
  let obj = {};
  obj.content = txt.value;
  obj.id = new Date().getTime();
  obj.checked = "";

  todoData.push(obj);
  txt.value = "";

  //新增待辦後切回全部
  toggleTab = "all";
  changeTab();
  updateList();
}

//渲染畫面
const list = document.querySelector(".list");

function render(todo) {
  let str = "";
  todo.forEach((i) => {
    str += `<li data-id="${i.id}">
    <label class="checkbox" for="">
      <input type="checkbox" ${i.checked} />
      <span>${i.content}</span>
    </label>
    <a href="#" class="delete"></a>
  </li>`;
  });

  list.innerHTML = str;
}

//刪除待辦
list.addEventListener("click", (e) => {
  //取消預設事件
  e.preventDefault();

  //取得ID的值並轉成number型別
  const id = parseInt(e.target.closest("li").dataset.id);

  if (e.target.nodeName === "A") {
    todoData = todoData.filter((item) => {
      return item.id !== id;
    });
  } else {
    //切換打勾功能
    todoData.forEach((item, index) => {
      if (item.id === id) {
        if (todoData[index].checked === "checked") {
          todoData[index].checked = "";
        } else {
          todoData[index].checked = "checked";
        }
      }
    });
  }
  updateList();
});

//切換Tab
const tab = document.querySelector(".tab");
const tabs = document.querySelectorAll(".tab li");
let toggleTab = "all";

tab.addEventListener("click", (e) => {
  toggleTab = e.target.dataset.tab;
  changeTab();
  updateList();
});

function changeTab() {
  tabs.forEach((item) => {
    item.classList.remove("active");

    if (item.dataset.tab === toggleTab) {
      item.classList.add("active");
    }
  });
}
//切換TabList
function updateList() {
  const workNumber = document.querySelector(".list_footer p");
  let newData = [];

  if (toggleTab === "all") {
    newData = todoData;
  } else if (toggleTab === "work") {
    newData = todoData.filter((item) => {
      return item.checked === "";
    });
  } else {
    newData = todoData.filter((item) => {
      return item.checked === "checked";
    });
  }

  //計算待完成數量
  let workCount = 0;
  todoData.forEach((item) => {
    if (item.checked === "") {
      workCount += 1;
    }
  });
  workNumber.textContent = workCount + " 個待完成項目";

  render(newData);
}

//清除已完成項目
const deleteNone = document.querySelector(".list_footer a");
deleteNone.addEventListener("click", (e) => {
  todoData = todoData.filter((item) => {
    return item.checked === "";
  });

  updateList();
});

//優化
txt.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});
