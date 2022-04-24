let modalQnt = 1;

const query = elemento => document.querySelector(elemento);
const queryAll = elemento => document.querySelectorAll(elemento);

// Listagem das pizzas
pizzaJson.map(( pizza, index )=>{
    let pizzaItem = query('.models .pizza-item').cloneNode(true)
    const pizzaQuery = elemento => pizzaItem.querySelector(elemento);
    
    pizzaItem.setAttribute('data-key', index);
    pizzaQuery('.pizza-item--name').innerHTML = pizza.name
    pizzaQuery('.pizza-item--desc').innerHTML = pizza.description
    pizzaQuery('.pizza-item--price').innerHTML = `R$ ${pizza.price[0]}`
    pizzaQuery('.pizza-item--img img').src = pizza.img;
    pizzaQuery('.pizza-item a').addEventListener('click', (e)=> {
        e.preventDefault();
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQnt = 1;


        query('.pizzaInfo h1').innerHTML = pizzaJson[key].name
        query('.pizzaInfo--desc').innerHTML = pizzaJson[key].description
        query('.pizzaBig img').src = pizzaJson[key].img
        query('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[2]}`
        query('.pizzaInfo--size.selected').classList.remove('selected');
        queryAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });

        query('.pizzaInfo--qt').innerHTML = modalQnt;

        query('.pizzaWindowArea').style.opacity = 0;
        query('.pizzaWindowArea').style.display = 'flex';
        setTimeout(()=>{
            query('.pizzaWindowArea').style.opacity = 1;
        }, 150);

        queryAll('.pizzaInfo--size').forEach((size, sizeIndex)=>{
            size.addEventListener('click', (e)=>{
                query('.pizzaInfo--size.selected').classList.remove('selected');
                size.classList.add('selected');
                console.log(size, sizeIndex)
                query('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[sizeIndex]}`
            })
        });
    })

    query('.pizza-area').appendChild( pizzaItem );
});

// Eventos do modal

function closeModal(){
    query('.pizzaWindowArea').style.opacity = 0;
    setTimeout(()=>{
        query('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

queryAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item)=>{
    item.addEventListener('click', closeModal);
})

query('.pizzaInfo--qtmenos').addEventListener('click', ()=>{
    if(modalQnt > 1){
        modalQnt--
    }
    query('.pizzaInfo--qt').innerHTML = modalQnt;
})
query('.pizzaInfo--qtmais').addEventListener('click', ()=>{
    modalQnt++
    query('.pizzaInfo--qt').innerHTML = modalQnt;
})

