fetch(' http://localhost:3000/pups')
.then(response => response.json())
.then(data => addPup(data))

let dogbar= document.querySelector('#dog-bar')

function addPup(puppies){
    for (let i = 0; i < puppies.length; i++){
    let pup = document.createElement('span')
    pup.innerHTML = puppies[i].name
    pup.setAttribute('alt',puppies[i].image)
    pup.setAttribute('value',i)
    if (puppies[i].isGoodDog){
        pup.setAttribute('id','Good Dog!')
    }
    else{
        pup.setAttribute('id','Bad Dog!')
    }
    dogbar.appendChild(pup)
    console.log(puppies[i].isGoodDog)
    }
    
}
dogbar.addEventListener('click', (e)=>{
    console.log(e.target.getAttribute('value')) //span
    let doginfo = document.querySelector('#dog-info')
    let img = document.createElement('img')
    img.setAttribute('src',`${e.target.getAttribute('alt')}`)

    let name = document.createElement('h1')
    name.innerHTML = e.target.innerHTML

    let state = document.createElement('button')
    state.innerHTML = e.target.getAttribute('id')
    doginfo.appendChild(name);
    doginfo.appendChild(img);
    doginfo.appendChild(state);
    state.addEventListener('click',(e)=>{
        if(e.target.innerHTML === 'Bad Dog!'){
            e.target.innerHTML = 'Good Dog!'
            fetch(`http://localhost:3000/pups/${(e.target.getAttribute('value'))+1}`,{
                method: 'PATCH',
                body: {isGoodDog : e.target.innerHTML}
            })
        }
        else{
            e.target.innerHTML = 'Bad Dog!'
            fetch(`http://localhost:3000/pups/${(e.target.getAttribute('value'))+1}`,{
                method: 'PATCH',
                body: {isGoodDog : e.target.getAttribute('value')}
            })
        }
    })
})


