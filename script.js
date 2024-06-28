
const containerMovie = document.querySelector('.container');
const popUpDiv = document.querySelector('.popup');
let isShowPopup = false;


document.body.addEventListener('click',function(e){
   if (isShowPopup){
    if(e.target.className === "closePopup"){
        popUpDiv.style.display = "none";
        isShowPopup = false;
    }
   }
})


const buttonSearch = document.querySelector('.search')
    .addEventListener('click',function (){
        const inputSearch = document.querySelector('.keyword').value;
        if(inputSearch.length != 0) cariDataSearch(inputSearch); 
    })



function cariDataSearch(searchValue){
    fetch('https://omdbapi.com/?apikey=e1f4312f&s=' + searchValue)
    .then(response => response.json())
    .then(respon => {
        if (respon.Response === "False"){
            return containerMovie.innerHTML = `<h2>${respon.Error}</h2>`; 
        }

        if(containerMovie.childElementCount > 0){
            const dataMovieInCard = [...containerMovie.children];
            dataMovieInCard.forEach(movieCard => movieCard.remove())
        }

        const movie = respon.Search
        movie.forEach(element => {
            containerMovie.innerHTML += showMovieDataIntoHtml(element);
        });

        tambahkanOnclick(Array.from(document.querySelectorAll('.show-detail')));
        popUpDiv.style.display = "none";
        isShowPopup = false;
    })
    .catch(err => {
        return containerMovie.innerHTML = `
        <h2>Pastikan Kamu Terhubung Dengan Internet</h2>
        <h2>Please Check Your Internet</h2>
        <h3>Gagal Mengambil Data</h3>`; 
    });
}

function cariImdbData(imdbId){
    fetch('https://omdbapi.com/?apikey=e1f4312f&i=' + imdbId)
    .then(response => response.json())
    .then(respon => {
        popUpDiv.innerHTML = showPopUpDetail(respon);
        popUpDiv.style.display = 'grid';
        isShowPopup = true;
    })
    .catch(err => {
        return containerMovie.innerHTML = `
        <h2>Pastikan Kamu Terhubung Dengan Internet</h2>
        <h2>Please Check Your Internet</h2>
        <h3>Gagal Mengambil Data</h3>`; 
    });
}



function showMovieDataIntoHtml(data){
    return `
        <div class="item">
            <img src="${data.Poster}" alt="Gagal menampilkan poster">
            <h3>${data.Title}</h3>
            <p>${data.Year}</p>
            <button class="show-detail" data-imdbid="${data.imdbID}">Show More</button>
        </div>
    `;
}

function tambahkanOnclick(dataArray){
    showDetailButton = dataArray
    showDetailButton.forEach(el => {
        el.addEventListener('click',function(){
          cariImdbData(this.dataset['imdbid']);
        })
    })
}

function showPopUpDetail(data){
    return `
        <h4 class="more-detail">More Detail...</h4>
        <div class="content">
            <img src="${data.Poster}" alt="Gagal menampilkan poster">
            <div class="desc">
                <h4>${data.Title}7</h4>
                <p>${data.Released}</p>
                <p>Director : ${data.Director}</p>
                <p>Writer : ${data.Writer}</p>
                <p>${data.Plot}</p>
            </div>
        </div>
        <div class="button">
            <button type="submit" class="closePopup">Close</button>
        </div>
    `;
}