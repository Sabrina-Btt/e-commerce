let carrinho = [];

getAllProductsDataBase();

//Funções Auxiliares
function getAllProductsDataBase() {
    const token = 'd2e7727e16065b64a486255d82e999';

    fetch(
        'https://graphql.datocms.com/',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `${token}`,
            },
            body: JSON.stringify({
                query: `
                {
                    allProducts {
                        inStock
                        name
                        price
                        description
                        id
                      }
                }`
            }),
        }
    )
        .then(res => res.json())
        .then((res) => {
            if (res.data.allProducts.length !== 0) {
                //console.log(res.data.allProducts);
                renderPage(res.data.allProducts);
            } else {
                alert("Error!");
            }
        })
        .catch((error) => {
            console.log(error);
        });
}

function renderPage(products) {

    renderProducts(products);

    addToCart();
}

function renderProducts(products) {
    products.map(elem => {
        let listProduct = document.getElementById("top-3");
        let htmlInsert = `
            <div class="product">
                <img src="./images/logo.png" alt="">
                <h2>${elem.name}</h2>

                <span>${elem.description} </span>

                <span>Preço : ${elem.price} </span>

                <div class="buttons">
                    <button>
                        0
                    </button>
                    <button class="add" productId=${elem.id}>
                        Adicionar
                    </button>
                </div>
            </div>
        `
        listProduct.insertAdjacentHTML('beforeend', htmlInsert)
    })
}

function addToCart() {
    let teste = Array.from(document.querySelectorAll(".add"));
    teste.map(elem => {
        elem.onclick = function (e) {
            e.preventDefault();

            let currentId = elem.getAttribute('productId');
            let ProductFound = carrinho.find(prod => prod.id === currentId);

            if (ProductFound !== undefined) {
                ProductFound.qtd = ProductFound.qtd + 1;
            } else {
                let obj = {
                    id: currentId,
                    qtd: 1
                }
                carrinho.push(obj);
            }
            document.getElementById('quantity').innerText = carrinho.length;
            console.log(carrinho)
        }
    });

}
