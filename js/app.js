const formularioTwees = document.querySelector("#tweets__form");
const listaTweets = document.querySelector("#result");

let tweets = [];

addEventListener();
function addEventListener() {
  formularioTwees.addEventListener("submit", agregandoTweet);
  document.addEventListener("DOMContentLoaded", cargandoDocumento);
}

function agregandoTweet(e) {
  e.preventDefault();

  const tweet = document.querySelector("#agg").value;

  if (tweet === "") {
    mensajeError("El Tweet no puede estar Vacio");
    return;
  }

  const objTweet = {
    id: Date.now(),
    tweet,
  };

  tweets = [...tweets, objTweet];

  tweetHTML();

  formularioTwees.reset();
}

function mensajeError(err) {
  const mensaje = document.createElement("div");
  mensaje.textContent = err;
  mensaje.classList.add("err");

  formularioTwees.appendChild(mensaje);

  setTimeout(() => {
    mensaje.remove();
  }, 3000);
}

function tweetHTML() {
  limpiarHTML();
  if (tweets.length > 0) {
    tweets.forEach((arr) => {
      const li = document.createElement("li");
      li.textContent = arr.tweet;
      li.classList.add("tweets__tweet");

      listaTweets.appendChild(li);

      const borrador = document.createElement("a");
      borrador.textContent = "X";
      borrador.classList = "tweets__borrador";
      borrador.onclick = () => {
        borradorTweet(arr.id);
      };
      li.appendChild(borrador);
    });
    localStorage.setItem("tweets", JSON.stringify(tweets));
  }
}

function limpiarHTML() {
  while (listaTweets.firstChild) {
    listaTweets.removeChild(listaTweets.firstChild);
  }
}

function cargandoDocumento() {
  tweets = JSON.parse(localStorage.getItem("tweets")) || [];
  tweetHTML();
}

function borradorTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  tweetHTML();
}
