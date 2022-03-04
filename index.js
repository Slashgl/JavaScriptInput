const app = document.querySelector('.app');
const input = document.querySelector('.search');
const ul = document.querySelector('.results');
const selected = document.querySelector('.selected');

input.onkeyup = debounce(({target}) =>
    fetch(`https://api.github.com/search/repositories?q=${target.value}`)
        .then((res) => res.json())
        .then(res => {
            console.log(res)
            addingAutocompleteResult(res.items)
        }),
    500
)

function addingAutocompleteResult(items, e) {
    ul.replaceChildren()
    items.slice(0,5).map(item =>{
        const li = document.createElement('li');
        li.classList.add('item');
        li.innerHTML = item.name;
        li.addEventListener('click', (e) => {
            addingListResult(item);
            input.value = '';
        })
        ul.append(li)
    })
}


function addingListResult(item) {
    const newListItem = document.createElement('div')
    newListItem.classList.add('selected__item', 'hidden')
    newListItem.innerHTML = `
        <div>
            <div class="selected__text">Name:${item.name}</div>
            <div class="selected__text">Owner:${item.owner.login}</div>
            <div class="selected__text">Stars:${item.stargazers_count}</div>
        </div>
        <div class="selected__delete">
            <img src="img/Vector%207.svg" alt="arrow">
            <img src="img/Vector%208.svg" alt="arrow">
        </div>
    `
    selected.append(newListItem)

    newListItem.querySelector('.selected__delete').onclick = () => newListItem.remove();
}


function debounce(f, ms) {
    let isCooldown = false;
    return function () {
        if(isCooldown) return;
        f.apply(this, arguments);

        isCooldown = true;
        setTimeout(() => (isCooldown = false), ms)
    };
}


// const newSearchItem = items.slice(0,5).map(item =>
//     `<li class="item">${item.name}</li>`
// ).join('')
// ul.innerHTML = newSearchItem