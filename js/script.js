window.addEventListener('DOMContentLoaded', () => {
    loadContent('js/db.json', () => {
      const cartWrapper = document.querySelector('.cart__wrapper'),
        cart = document.querySelector('.cart'),
        close = document.querySelector('.cart__close'),
        open = document.querySelector('#cart'),
        goodsBtn = document.querySelectorAll('.goods__btn'),
        products = document.querySelectorAll('.goods__item'),
        confirm = document.querySelector('.confirm'),
        badge = document.querySelector('.nav__badge'),
        totalCost = document.querySelector('.cart__total > span'),
        titles = document.querySelectorAll('.goods__title');


      openCart = () => {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
      };

      closeCart = () => {
        cart.style.display = '';
        document.body.style.overflow = '';
      };

      open.addEventListener('click', openCart);
      close.addEventListener('click', closeCart);

      goodsBtn.forEach(function(btn, i) {
        btn.addEventListener('click', () => {
          const item = products[i].cloneNode(true),
                trigger = item.querySelector('button'),
                removeBtn = document.createElement('div'),
                empty = cartWrapper.querySelector('.empty');
          
            trigger.remove();
            
            showConfirm();
            calcGoods();

            removeBtn.classList.add('goods__item-remove');
            removeBtn.innerHTML = '&times';
            item.appendChild(removeBtn);


            cartWrapper.appendChild(item);
            if (empty) {
              empty.style.display = 'none';
            }
            
            calcTotal();
            removeFromCart(); 
        });
      });

      sliceTitle = () => {
        titles.forEach(function(item) {
          if (item.textContent.length < 60) {
            return;
          } else {
              // const str = item.textContent.slice(0, 71) + '...';
              const str = `${item.textContent.slice(0, 61)}...`;
              item.textContent = str;
          }
        });  
      }

      sliceTitle();

      showConfirm = () => {
        confirm.style.display = 'block';
        let counter = 100;
        const id = setInterval(frame, 10);

        function frame() {
          if ( counter == 10) {
            clearInterval(id);
            confirm.style.display = '';
          } else {
              counter--;
              confirm.style.opacity = '.' + counter;
              confirm.style.transform = `translateY(-${counter}px)`;
          }
        }
      }
      //setInterval(sliceTitle, 100)
      //setTimeout(sliceTitle, 100)

      calcGoods = () => {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = items.length;
      }

      calcTotal = () => {
        const prices = cartWrapper.querySelectorAll('.goods__item > .goods__price > span');
        let total = 0;
        
        prices.forEach(function(item) {
          total += +item.textContent;
        });

        totalCost.textContent = total;
      }

      removeFromCart = () => {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        const empty = cartWrapper.querySelector('.empty');
        removeBtn.forEach(function(btn) {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();
                    calcGoods();
                    calcTotal();
                    if (badge.textContent === '0') {
                      empty.style.display = '';
                    } 
                });
            });
      }

  });
 
});

const loadContent = async(url, callback) => {
    await fetch(url) //Обещание
      .then(response => response.json())
      .then(json => createElement(json.goods));

    callback();
}

function createElement(arr) {
  const goodsWrapper = document.querySelector('.goods__wrapper');
  
  arr.forEach(function(item) {
      let card = document.createElement('div');
      card.classList.add('goods__item');
      card.innerHTML = `
          <img class="goods__img" src="${item.url}" alt="phone">
          <div class="goods__colors">Доступно цветов: 4</div>
          <div class="goods__title">
              ${item.title}
          </div>
          <div class="goods__price">
              <span>${item.price}</span> руб/шт
          </div>
          <button class="goods__btn">Добавить в корзину</button>
      `;
      goodsWrapper.appendChild(card);
  });
}


// fetch('')
//   .then(response => response.json())
//   .then(json => console.log(json))