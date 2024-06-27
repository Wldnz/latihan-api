


$('.search').on('click',() => {
    const cariMovie = $('.keyword').val();
    if (cariMovie === ''){
        alert('Tolong Inputkan Data Terlebih Dahulu Sebelum Mencari')
    }else{
        alert(cariMovie)
        tampilkanHasilSearch(cariMovie);
    }
    

})



// ketika body di klik dan akan mengclose popup
// function closePop(isShowPop){
    let isShowPop = false;
    $('body').on('click',function(e){
        // $('.popupBox').hide();
        if (e.target.className === "closePopup"){
            if(isShowPop){
                e.target.parentElement.style.display = "none";
                isShowPop = false;
            }
        }
    }); 
// }
// ketika button show Detail di klik




function tampilkanHasilSearch(cariMovie){
    $.ajax({
        url : `https://omdbapi.com/?apikey=e1f4312f&s=${cariMovie}`,
        success : function(res){
            tampilkanDataKeHtml(res)
            $('.show-detail').on('click',function (){
                const getImdbId = $(this).attr('data-detail');
                $.ajax({
                    url : `https://omdbapi.com/?apikey=e1f4312f&i=${getImdbId}`,
                    success : function(res){
                       let showPop =  `
                                        <img src="${res.Poster}" alt="this movie doesn't have an poster">
                                        <div class="desc1">
                                            <p>Movie Name :${res.Title}</p>
                                            <p>Release in ${res.Year}</p>
                                            <p>Writer : ${res.Writer}</p>
                                            <p>Director : ${res.Director}</p>
                                            <div class="desc2">
                                                <p>${res.Plot}</p>
                                            </div>
                                        </div>
                                        <p class="closePopup">X</p>
                                        `
                    //    console.log(showPop)
                       $('.popupBox').html(showPop)
                       $('.popupBox').show("grid");
                       isShowPop = true;
                    }
                })
            });

        },
        error : (err) => {alert('Gagal menampilkan Data')}
    })
}


function tampilkanDataKeHtml(data){
    const movieName = data.Search;
            // console.log(movieName);
    
    let isShowPop = false;

    if (document.querySelector('.container').childElementCount !== 0) {
        Array.from(document.querySelector('.container').children).forEach(e => e.remove())
    }


    if (movieName === undefined) {
        return alert('Masukkan Data Film Yang Valid')
    };
    let listMovie = movieName.forEach(movie => {
        let item =  
        `
            <div class="item">
            <img src="${movie.Poster}" alt="this movie doesn't have an poster">
            <h2 class="title">${movie.Title}</h2>
            <p class="year">Release in ${movie.Year}</p>
            <button class= "show-detail" data-detail=${movie.imdbID}>Show More</button>
            </div>
        `
        $('.container').append(item); 
    });
}