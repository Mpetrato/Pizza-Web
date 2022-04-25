localStorage.getItem("pizza_cart")
	? (cart = JSON.parse(localStorage.getItem("pizza_cart")))
	: (cart = []);
let modalQnt = 1;
let modalKey = 0;

const saveCart = () => {
    localStorage.setItem("pizza_cart", JSON.stringify(cart));
   };

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
        modalKey = key;

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
                query('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price[sizeIndex]}`
                console.log(sizeIndex)
            })
            sizeIndexNumber = sizeIndex
            console.log(sizeIndexNumber)
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

query('.pizzaInfo--addButton').addEventListener('click', ()=> {
    let size = parseInt(query('.pizzaInfo--size.selected').getAttribute('data-key'));
    let identifier = pizzaJson[modalKey].id + '@' + size;
    let key = cart.findIndex((item)=> item.identifier == identifier);
    if(key > -1) {
        cart[key].qt += modalQnt
    }else {  
        cart.push({
         identifier,
         id: pizzaJson[modalKey].id,
         size,
         qt: modalQnt,
         price: pizzaJson[modalKey].price[size]
        });
    }
    updateCart();
    closeModal();    
})


query('.menu-openner').addEventListener('click', ()=> {
    if(cart.length > 0){
        query('aside').style.left = '0';
    }
    console.log(cart)
})

query('.menu-closer').addEventListener('click', ()=> {
    query('aside').style.left = '100vw';
})

function updateCart() {
    saveCart();
    let pizzaCartString = localStorage.getItem('pizza_cart')
    let pizzaCart = JSON.parse(pizzaCartString)
    
    query('.menu-openner span').innerHTML = pizzaCart.length

    
    if(pizzaCart.length > 0){
        query('aside').classList.add('show');
        query('.cart').innerHTML = '';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart){
            let pizzaItem = pizzaJson.find( item => item.id == cart[i].id)  
            let priceItem = cart[i].price
            console.log(priceItem)
            subtotal += priceItem * cart[i].qt;


            let cartItem = query('.models .cart--item').cloneNode(true)

            let pizzaSizeName;
            switch(cart[i].size){
                case 0:
                    pizzaSizeName = 'P';
                    break
                case 1:
                    pizzaSizeName = 'M';
                    break
                case 2:
                    pizzaSizeName = 'G';
                    break
            }


            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
                if(cart[i].qt > 1){
                    cart[i].qt--
                }else {
                    cart.splice(i, 1);
                }
                updateCart();
            })
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
                cart[i].qt++
                updateCart();
            })

            query('.cart').append(cartItem);
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        query('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`
        query('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`
        query('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`

    } else {
        query('aside').classList.remove('show');
        query('aside').style.left = '100vw';
    }
    
}

updateCart()