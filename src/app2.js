const TMDB_ENDPOINT_BASE = 'https://api.themoviedb.org/3';

function MostraDados ( querytxt = "") {
    $.ajax({
        
        url: TMDB_ENDPOINT_BASE + "/movie/" + querytxt ,
        data: {
            api_key: '9282b780b09d70e9a26c6d1f026d3972',
            language: 'pt-BR'
        }
    }) 
    .done(function( data ){

        let codigo_html = '';
       
        titulo = data.title;
        imagem = 'https://image.tmdb.org/t/p/w500' + data.poster_path;
        descricao = data.overview;
        lancamento = data.release_date;
        duracao = data.runtime;
        identificador = data.id;
        link= data.imdb_id;
        MostrarGeneros(identificador);

        codigo_html += `
            <div class="col-12 col-lg-6">
                <h1>${titulo}</h1>
                <h5>Lançamento:</h5> 
                <p>${lancamento}</p>
                <h5>Sinopse:</h5> 
                <p>${descricao}</p>
                <h5>Genero:</h5>
                <p id="genre"></p>
                <h5>Duração</h5>
                <p>${duracao} Minutos</p>
                <a href="https://www.imdb.com/title/${link}/" class="btn btn-success">Site externo</a>
            </div>
            <div class="col-12 col-lg-6">
                <img id="img_filme"src="${imagem}" alt="...">
            </div>
        `;
           

        $('#dados_filme').html(codigo_html)
    });      
}

function MostrarGeneros ( movieid = "") {
    $.ajax({
        
        url: TMDB_ENDPOINT_BASE + "/movie/"+ movieid,
        data: {
            api_key: '9282b780b09d70e9a26c6d1f026d3972',
            language: 'pt-BR'
        }
    }) 
    .done(function( data ){

        let texto = '';
        texto = data.genres[0].name;
           
        $("#genre").text(texto);
    });      
}

$(document).ready( function () {
    let querytxt = decodeURIComponent(window.location.search);
    querytxt = querytxt.substring(1);
    querytxt = querytxt.slice(6);


    MostraDados(querytxt); 

    $("#buscar_btn").click(function (){
        let querytxt0 = $("#buscar_in").val();
        window.location.href = "search.html" + "?search=" + querytxt0;
    });
});