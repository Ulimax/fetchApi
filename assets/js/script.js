// displayUser('stolinski').catch(handleError);
const  getBtn = document.querySelector("#getBtn");
const baseEndpoint = 'https://reqres.in/api/users?delay=3';
let contador = 0;
const spinner = document.querySelector(".spin");
getBtn.addEventListener("click",()=> getUser().catch(handleError));


const getUser =async()=> {
  contador++;
  if(contador===1)
  { // comienza el spinner
    spinner.classList.toggle("visually-hidden");
    const response = await fetch(`${baseEndpoint}`);
    const data = await response.json();  
    const users =data.data;
    console.log(users);
    iterate(users);
  } else{
    revisar();
  }
}



const revisar =()=>{
    if(new Date().getSeconds() - JSON.parse(recuperDatos).timestamp >= 20 )
    {
        localStorage.clear();
        contador=0;
        getUser();
    }
    else{
        // consultar de local storage
        getLocal();
    }
}

const iterate= (users)=>{
    users.forEach(user =>{
        console.log(user);
        storeIt(user);
        // storeIt(user);
    }); 
}

async function storeIt({id, first_name, last_name, email, avatar}){
    localStorage.setItem(`${id}`, JSON.stringify( {id:`${id}`, FirstName:`${first_name}`, LastName:`${last_name}`, email: `${email}`, figure: `${avatar}`,timestamp: new Date().getSeconds(), dia: new Date().getTime()} ) ); 
    getLocal();
}

// const  getLocal= ()=>{
//     for(let i=1; i<=5; i++){
//         recuperDatos = localStorage.getItem( `${i}` );
//         inTable(JSON.parse(recuperDatos) );
//     }    
// }

let shownUserIds = new Set();

const getLocal = () => {
    for (let i = 1; i <= 5; i++) {
        recuperDatos = localStorage.getItem(`${i}`);
        if (recuperDatos !== null) {
            const userData = JSON.parse(recuperDatos);
            // Verificar si el id del usuario ya ha sido mostrado
            if (!shownUserIds.has(userData.id)) {
                inTable(userData);
                // Agregar el id del usuario al conjunto de usuarios mostrados
                shownUserIds.add(userData.id);
            }
        }
    }
}

const inTable = ({id, FirstName, LastName, email, figure}) => {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${id}</td>
        <td>${FirstName}</td>
        <td>${LastName}</td>
        <td>${email}</td>
        <td><img src="${figure}" class="rounded-circle"></td>
    `;
    document.querySelector("table").appendChild(row);
}

const handleError= (err)=> {
  console.log('OH NO!');
  console.log(err);
    
}

