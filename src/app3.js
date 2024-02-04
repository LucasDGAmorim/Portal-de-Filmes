const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';

 
function MostraFilmesPesquisados ( querytxt = "") {
    $.ajax({
        
        url: TMDB_ENDPOINT_BASE + "/search/movie",
        data: {
            api_key: '9282b780b09d70e9a26c6d1f026d3972',
            language: 'pt-BR',
            query: querytxt
        }
    }) 
    .done(function( data ){

        let codigo_html = '';
        for (i=0; i < 6; i++){

            titulo = data.results[i].title;
            imagem = 'https://image.tmdb.org/t/p/w500' + data.results[i].poster_path;
            descricao = data.results[i].overview;
            lancamento = data.results[i].release_date;
            identificador = data.results[i].id;
            id1 = `77${i}`;
            id2 = `78${i}`;
            MostrarGeneros( identificador, id1);
            PegarLink( identificador, id2);

           codigo_html += `
                <div class="col mb-4">
                <div class="card">
                <div class="row no-gutters">
                <div class="col-4 col-lg-12">
                <img src="${imagem}" class="card-img" alt="...">
                </div>
                <div class="col-8 col-lg-12">
                <div class="card-body">
                    <h5 class="card-title"><strong>${titulo}</strong></h5>
                    <h6><strong>Lançamento</strong></h6>
                    <p>${lancamento}</p>
                    <h6><strong>Sinopse</strong></h6>
                    <p class="card-text">${descricao}</p>
                    <h6><strong>Genero</strong></h6>
                    <p class="genre" id="77${i}"></p>
                    <a id="78${i}" href="" class="btn btn-success">Ver filme</a>
                </div>
                </div>
                </div>
                </div>
            </div>
           `;
           
        }

        $('#pesquisa_filmes').html(codigo_html)
    });      
}

function MostrarGeneros ( movieid = "", iden = "") {
    $.ajax({
        
        url: TMDB_ENDPOINT_BASE + "/movie/"+ movieid,
        data: {
            api_key: '9282b780b09d70e9a26c6d1f026d3972',
            language: 'pt-BR'
        }
    }) 
    .done(function( data ){

        let texto = '';
        let id = '#' + iden ;
        texto = data.genres[0].name;
           
        $(id).text(texto);
    });      
}

function PegarLink ( movieid = "", iden = "") {
    $.ajax({
        
        url: TMDB_ENDPOINT_BASE + "/movie/"+ movieid,
        data: {
            api_key: '9282b780b09d70e9a26c6d1f026d3972',
            language: 'pt-BR'
        }
    }) 
    .done(function( data ){

        let texto = '';
        let id = '#' + iden ;
        texto = data.imdb_id;
           
        $(id).attr("href" , `https://www.imdb.com/title/${texto}/`);
    });      
}

$(document).ready( function () {
    let querytxt = decodeURIComponent(window.location.search);
    querytxt = querytxt.substring(1);
    querytxt = querytxt.slice(7);

    MostraFilmesPesquisados (querytxt);

    $("#buscar_btn").click(function (){
        let querytxt = $("#buscar_in").val();
        window.location.href = "search.html" + "?search=" + querytxt;
    });
});