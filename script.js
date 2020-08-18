// search button clicked 
document.getElementById("inputForm").addEventListener('submit', (submitInput) => {
    formData();

    const searchInput = document.getElementById("text-search").value;

    const fetchUrl = `https://api.lyrics.ovh/suggest/${searchInput}`;

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => {
            if (data) {
                displaySuggestion(data);
            } else {
                document.getElementById("search-result").innerText = "No item found !"
            }
        })
        .catch(error => {
            console.log(error);
            document.getElementById("search-result").innerText = "No item found !"
        })
    submitInput.preventDefault();
});


// display suggestions  
function displaySuggestion(songData) {
    let data = songData.data;

    let list = [];
    for (let i = 0; i < 10; i++) {
        const item = {
            title: data[i].title,
            albumTitle: data[i].album.title,
            albumImage: data[i].album.cover_small,
            artistName: data[i].artist.name,
            artistImage: data[i].artist.picture_small
        }

        list.push(item);
    }

    //  html display suggestion  
    let display = document.getElementById("single-result");
    display.innerHTML = "";
    document.querySelector('.single-result').style.display = "block";
    for (let i = 0; i < list.length; i++) {
        let {
            title,
            albumTitle,
            albumImage,
            artistName,
            artistImage
        } = list[i];


        display.innerHTML +=
            `<div id="display-result" class="row d-flex result m-3 align-items-center">
            <div class="col-md-6">
                <h3 class="lyrics-name"><span id="title">${title}</span></h3>
                <p class="author lead">Artist : <span id="artistName">${artistName}</span></p>
                <p class="author lead">Album : <span id="albumTitle">${albumTitle}</span></p>
            </div>
            <div class="col-md-3  ">
                <img src="${artistImage}" class="img-fluid">
                <img src="${albumImage}" class="img-fluid">
            </div>
            <div class ="col-md-3  text-md-right text-center">
                <a href="#/" onclick="getLyrics('${title}','${artistName}','${albumImage}','${artistImage}')" class="btn btn-success">Get Lyrics</a>
            </div>
        </div>`
    }

}


// get the lyrics from clicked suggestions  

const getLyrics = (title, artistName) => {
    const fetchUrl = `https://api.lyrics.ovh/v1/${artistName}/${title}`;

    fetch(fetchUrl)
        .then(response => response.json())
        .then(data => displayLyrics(data, title, artistName))
        .catch(error => console.log(error))
}



// display lyrics from getLyrics  

const displayLyrics = (data, title, artistName, albumImage, artistImage) => {
    document.querySelector('.single-result').style.display = "none";
    document.querySelector('.single-lyrics').style.display = "block";
    document.querySelector('.lyrics').style.display = "block";
    document.getElementById("song-title").innerText = title;
    document.getElementById("song-artist").innerText = " - " + artistName;
    document.getElementById("song-lyrics").innerText = "";
    document.getElementById("search-result").innerText = "";

    if (data == undefined) {
        document.getElementById("song-lyrics").innerText = "Sorry! Lyrics is not found.";
    } else if (data.lyrics) {
        document.getElementById("song-lyrics").innerText = data.lyrics;
    } else {
        document.getElementById("song-lyrics").innerText = "Sorry! Lyrics is not found.";
    }
}

// reset the form data
const formData = () => {
    document.getElementById("song-image").innerHTML = "";
    document.getElementById("search-result").innerText = "";
    document.getElementById("single-result").innerText = "";
    document.getElementById("song-title").innerText = "";
    document.getElementById("song-artist").innerText = "";
    document.getElementById("song-lyrics").innerText = "";
}

//go back button click
document.getElementById("go-back").addEventListener('click', function goBack() {
    document.querySelector('.single-result').style.display = "block";
    document.querySelector('.single-lyrics').style.display = "none";
});
