const temprature = document.querySelector('.tempratuer')
const weatherStatus = document.querySelector('.status')
const loc = document.querySelector('.location')
const currentDate = document.querySelector('.date')
const currentTime = document.querySelector('.time')
const addTaskForm = document.querySelector('.add-task-form')
const tasks = document.querySelector('.tasks')
const header = document.querySelector('.header')
const featureCardSectio = document.querySelector('.feature-card-section')
let alltask = document.querySelector('.all-task')
let completedTask = document.querySelector('.completed-task')
let plannerDate = document.querySelector('.planner-date')




let apiKey = '32826f33cca735059f937ddccbe9785a'
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?&units=matrics&q=delhi'

async function weather(params) {
    const responce = await fetch(apiUrl + `&appid=${apiKey}`)
    const data = await responce.json()

    temprature.textContent = `${Math.floor(data.main.temp - 273.15)}°C`
    weatherStatus.textContent = `${data.weather[0].description}`
    weatherStatus.textContent = `${data.weather[0].description}`
    loc.textContent = `${data.name}`
}

const showDate = () => {
    let date = new Date().toDateString().split(' ')
    let time = new Date()
    const hour = time.getHours()
    const minutes = time.getMinutes()
    let ampm = hour >= 12 ? 'PM' : "AM"
    currentTime.textContent = `${hour}:${minutes} ${ampm}`
    currentDate.textContent = `${date[0]}, ${date[1]} ${date[2]} ${date[3]}`

    // daily planner date show
    plannerDate.textContent = `${date[0]}, ${date[1]} ${date[2]} ${date[3]}`


}

const toDo = () => {
    let updatedIndex = null

    let taskArr = []

    const renderTask = () => {

            tasks.innerHTML = ''

            taskArr.forEach((elem, idx) => {
                tasks.innerHTML += `<div class="h-20 w-full bg-white flex items-center justify-between px-4">
                    <div class="flex gap-3 items-center">
                        <input type="checkbox" name="" id="" class="size-5" onchange="completeTask(${idx})">
                        <h4 class="font-semibold" id="task-text-${idx}">${elem}</h4>
                    </div>
                    <div class="flex items-center gap-2">
                        <i class="ri-edit-box-line text-blue-900 text-xl" onclick = "editTask(${idx})"></i>
                        <i class="ri-delete-bin-6-line text-xl text-red-600" onclick="deleteTask(${idx})"></i>
                    </div>
                </div>`
            })
        }

    addTaskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let task = event.target[0].value

        if (task.trim() === '') return;

        if(updatedIndex !== null){
            taskArr[updatedIndex] = task
            updatedIndex = null
        }
        else{
            taskArr.push(task)
            alltask.textContent = `All(${taskArr.length})`
        }


        renderTask()

        addTaskForm.reset()
    })

    window.deleteTask = (index) => {
        taskArr.splice(index, 1);
        alltask.textContent = `All(${taskArr.length})`
        renderTask();
    };

    window.completeTask = (index) => {
        const taskText = document.querySelector(`#task-text-${index}`)

        if(taskText){
            taskText.classList.toggle('line-through')
            taskText.classList.toggle('text-zinc-500')
        }
    }

    window.editTask = (index) => {
        updatedIndex = index
        addTaskForm[0].value = taskArr[index]
    }

}

const nevigationFeature = () => {
    const homeNavButton = document.querySelector('.home-nav-button')
    const todoNavButton = document.querySelector('.todo-nav-button')
    const homeSection = document.querySelector('.home-section')
    const todoSection = document.querySelector('.todo-section')
    const todoCard = document.querySelector('.todo-card')
    const backToHome = document.querySelector('.back-to-home')

    todoNavButton.addEventListener('click', () => {
        header.style.display = 'none'
        featureCardSectio.style.display = 'none'
        todoSection.style.display = 'flex'

    })

    todoCard.addEventListener('click',()=>{
        header.style.display = 'none'
        featureCardSectio.style.display = 'none'
        todoSection.style.display = 'flex'
    })

    backToHome.addEventListener('click',()=>{
        header.style.display = 'block'
        featureCardSectio.style.display = 'flex'
        todoSection.style.display = 'none'
    })

}



nevigationFeature()
toDo()
showDate()
weather()


console.log()