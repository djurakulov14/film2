import {movies} from './db.js'

let ul = document.querySelector('.promo__interactive-list')
let c  = document.querySelector('.promo__bg')
let inpSearch = document.querySelector('#search')
let block = document.querySelector('#block')
c.style.backgroundImage = `url('./img/bg.jpg')`

document.querySelector('.btnsearch').onclick = () => {
    let value = inpSearch.value.toLowerCase().trim()
    
    let filtered = movies.filter(item => {
        if(item.Title.toLowerCase().includes(value)) {
            return item
        }
    })
    
    reload(filtered)
}

const reload = (arr) => {
    ul.innerHTML = ""
    let remove_dublikat = []
    block.innerHTML = ""
    showMovie(arr[0])
    
    // const modalf = () => {
    //     let back = document.createElement('div')
    //     let modal = document.createElement('div')
    //     let boss = document.createElement('div')
    //     let line = document.createElement('div')
    //     let stars = document.createElement('div')
        
    //     back.classList.add('back')
    //     modal.classList.add('modal')
    //     boss.classList.add('boss')
    //     line.classList.add('line')
    //     stars.classList.add('stars')
        
        
    //     boss.append(line, stars)
    //     modal.append(boss)
        
        
    //     document.querySelector('.promo').after(back)
        
    //     back.after(modal)
        
    // }
    
    for(let item of arr) {
        let li = document.createElement('li')
        let del = document.createElement('div')

        li.classList.add('promo__interactive-item')
        del.classList.add('delete')
        
        li.innerHTML = `${arr.indexOf(item) + 1}. ${item.Title}`
        
        li.append(del)
        ul.append(li)
        
        del.onclick = () => {
            arr = arr.filter(elem => elem.ID !== item.ID)
            reload(arr)
        }
        
        li.onclick = () => {
            showMovie(item)
            document.querySelector('.promo__genre').innerHTML = item.Genre
            document.querySelector('.promo__title').innerHTML = item.Title
            document.querySelector('.promo__descr').innerHTML = item.Plot
            document.querySelector('.imdb').innerHTML = `IMDb: ${item.imdbRating}`
            document.querySelector('.kinopoisk').innerHTML = `Кинопоиск: ${item.Ratings[0].Value}`
        }
        
        let li2 = document.createElement('li')
        
        li2.classList.add('promo__menu-item')
        
        if(remove_dublikat.includes(item.Genre)){

        } else{
            li2.innerHTML = item.Genre
            remove_dublikat.push(item.Genre)
        }
        
        block.append(li2)
        
        li2.onclick = () => {
            ul.innerHTML = ''
            arr = arr.filter(elem => elem.Genre == item.Genre)
            reload(arr)
            li2.classList.add('promo__menu-item_active')
        }
    }
}

const showMovie = (movie) => {
    c.style.backgroundImage = `url('${movie.Poster}')`
}

reload(movies)

// ДЗ
// 1) Сделать жанры
// 2) Сделать модальное окно где показаны остальные данные так же данне показываются на главное странице 
// 3) Рейтинг фильмов по звездам 10 баллов IMDB это 5 звезд
// 4) Поисковик по клику а не по печати

