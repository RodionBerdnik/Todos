const sendBtn = document.getElementById('sendBtn')


sendBtn.addEventListener('click', e=> {
    fetch('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
    // .then(res=> res.json())
    // .then(data=>console.log(data))
    // .catch(err=> console.warn(err))
    // .finally(()=>console.log('Request finished!'))
    getData('https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5')
})


async function getData(url) {
    console.log('Request started!')
    try {
        const res = await fetch(url)
        if(!res.ok){
            throw new Error(`Request failed ${res.status}`)
        }
        const data = await res.json()
        console.log(data)
    } catch (error) {
        console.warn(error)
    }
    console.log('Request finished!')
}