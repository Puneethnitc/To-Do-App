const task=document.querySelector("input");
const tick=document.querySelector("#tick");
const container = document.querySelector("#container");
const clear=document.querySelector("#clear");
window.addEventListener("load", () => {
  const stored = JSON.parse(localStorage.getItem("tasks")) || [];
  stored.forEach(t => addTask(t));
});


function saveTasks()
{
    let tasks = Array.from(document.querySelectorAll(".task"))
                .map(div => div.innerText);
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

function addTask(){ 
    if(task.value.trim()=="")return;
  const  parent=document.createElement("div");
  const  value=document.createElement("div");
  const  cross=document.createElement("button");
  const taskValue = task.value; // store the value before clearing input

    parent.classList.add("parent");
    value.classList.add("task");
    cross.classList.add("cross");

    value.innerText=task.value;
     cross.innerText = "❎";

    container.appendChild(parent);
    parent.appendChild(value);
    parent.appendChild(cross);

    task.value='';
    
    cross.addEventListener("click",()=>{
        parent.remove();
        removeTask(taskValue);
    });
    saveTasks();

}
function removeTask(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter(t => t !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

tick.addEventListener("click",addTask);


task.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});

clear.addEventListener("click",()=>{
  // Remove all task elements from the DOM
  document.querySelectorAll(".parent").forEach(el => el.remove());

  // Clear from localStorage
  localStorage.removeItem("tasks");
});
