const query = elemento => document.querySelector(elemento);
const queryAll = elemento => document.querySelectorAll(elemento);



pizzaJson.map(( pizza, index )=>{
    let pizzaItem = query('.models .pizza-item').cloneNode(true)
    const pizzaQuery = elemento => pizzaItem.querySelector(elemento);
    
    pizzaQuery('.pizza-item--name').innerHTML = pizza.name
    pizzaQuery('.pizza-item--desc').innerHTML = pizza.description
    pizzaQuery('.pizza-item--price').innerHTML = `R$ ${pizza.price.toFixed(2)}`
    pizzaQuery('.pizza-item--img img').src = pizza.img;
    pizzaQuery('.pizza-item a').addEventListener('click', (e)=> {
        e.preventDefault();

        query('.pizzaWindowArea').style.opacity = 0;
        query('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            query('.pizzaWindowArea').style.opacity = 1;
        }, 150);
    })

    query('.pizza-area').appendChild( pizzaItem );
});

query('.pizzaInfo--cancelButton').addEventListener('click', ()=>{
    query('.pizzaWindowArea').style.display = 'none';
})