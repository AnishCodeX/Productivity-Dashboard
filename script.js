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

async function weather() {
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

        if (updatedIndex !== null) {
            taskArr[updatedIndex] = task
            updatedIndex = null
        }
        else {
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

        if (taskText) {
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
    const backToHomeTodoBtn = document.querySelector('.back-to-home')
    const plannerNavButton = document.querySelector('.planer-nav-button')
    const plannerSection = document.querySelector('.daily-planner-section')
    const backToHomePlannerBtn = document.querySelector('.daily-planner-section .back-to-home')
    const plannerCard = document.querySelector('.daily-planner-card')
    const nav = document.querySelector('nav')


    homeNavButton.addEventListener('click', () => {
        header.style.display = 'block'
        featureCardSectio.style.display = 'flex'
        todoSection.style.display = 'none'
        plannerSection.style.display = 'none'
        nav.style.display = 'flex'
    })

    todoNavButton.addEventListener('click', () => {
        header.style.display = 'none'
        featureCardSectio.style.display = 'none'
        todoSection.style.display = 'flex'
        plannerSection.style.display = 'none'
        nav.style.display = 'none'
    })

    todoCard.addEventListener('click', () => {
        header.style.display = 'none'
        featureCardSectio.style.display = 'none'
        todoSection.style.display = 'flex'
        nav.style.display = 'none'
    })

    backToHomeTodoBtn.addEventListener('click', () => {
        header.style.display = 'block'
        featureCardSectio.style.display = 'flex'
        todoSection.style.display = 'none'
        nav.style.display = 'flex'
    })

    plannerNavButton.addEventListener('click', () => {
        header.style.display = 'none'
        featureCardSectio.style.display = 'none'
        plannerSection.style.display = 'flex'
        todoSection.style.display = 'none'
        nav.style.display = 'none'
    })

    plannerCard.addEventListener('click', () => {
        header.style.display = 'none'
        featureCardSectio.style.display = 'none'
        plannerSection.style.display = 'flex'
        todoSection.style.display = 'none'
        nav.style.display = 'none'
    })

    backToHomePlannerBtn.addEventListener('click', () => {
        header.style.display = 'block'
        featureCardSectio.style.display = 'flex'
        plannerSection.style.display = 'none'
        nav.style.display = 'flex'
    })


}


const dailyPLaner = () => {

    let addPlaneButton = document.querySelector('.add-plan-btn')
    let addPlanFormSection = document.querySelector('.add-plan-form-section')
    let addPlanForm = document.querySelector('.add-plan-form')
    let cancelBtn = document.querySelector('.cancel-btn')
    let planCardsContainer = document.querySelector('.plan-cards')

    let editIndex = null

    let planArr = []

    addPlaneButton.addEventListener('click', () => {
        console.log('clicked')
        addPlanFormSection.style.display = 'flex'
    })

    addPlanForm.addEventListener('submit', (event) => {
        event.preventDefault()

        let time = event.target[0].value
        let plan = event.target[1].value
        const selectedColor = addPlanForm.elements['color'].value;

        if (time.trim() === '' || plan.trim() === '') return

        let planObj = {
            time: time,
            plan: plan,
            color: selectedColor
        }

        if (editIndex !== null) {
            planArr[editIndex] = planObj
            editIndex = null
        }
        else {
        planArr.push(planObj)
        }

        planCardsContainer.innerHTML = ''
        planArr.forEach((elem,idx) => {
            planCardsContainer.innerHTML += `<div class="w-full flex gap-2">
                        <div class="w-[25%] h-15 rounded-lg bg-gray-200 flex items-center justify-center">
                            <span class="text-lg font-semibold">${elem.time}</span>
                        </div>

                        <div class="w-[75%] px-2 h-15 rounded-lg bg-[${elem.color}66] flex items-center justify-between">
                            <div class="flex gap-2">
                                <div class="px-3 bg-[${elem.color}] rounded-full"></div>
                                <p>${elem.plan}</p>
                            </div>
                            <i class="ri-edit-2-line text-2xl text-zinc-600" onclick="editPlan(${idx})"></i>
                        </div>
                    </div>`
        })

        addPlanForm.reset()

        addPlanFormSection.style.display = 'none'

        
    })

    window.editPlan = (index) => {
        addPlanForm[0].value = planArr[index].time   
        addPlanForm[1].value = planArr[index].plan
        addPlanForm.elements['color'].value = planArr[index].color
        editIndex = index
        addPlanFormSection.style.display = 'flex' 
    } 
    
    
    cancelBtn.addEventListener('click', () => {
        addPlanForm.reset()
        addPlanFormSection.style.display = 'none'
    })

}



const parentFun = () => {

    nevigationFeature()
    toDo()
    showDate()
    weather()
    dailyPLaner()

}
parentFun()


