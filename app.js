const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let input = document.querySelector(".user-input").value;
  getUser(`https://api.github.com/users/${input}`);
  form.reset()
});

function getUser(gitUser) {
  fetch(gitUser)
    .then((data) => data.json())
    .then((data) => {
      const userBlock = document.createElement("div");

      userBlock.innerHTML = `
      <div class="user-container__inner">
         <div class="userThumb">
          <img src=${data.avatar_url}
          />
        </div>
        <div class="user-all-info">
          <div class="user-main-info">
            <h2>${data.login}</h2>
            <small>${data.location}</small>
          </div>
          <div class="user-main__description">
            <p>
              ${data.bio}
            </p>
          </div>
          <div class="user-main__stats">
            <ul class="user-stats">
              <li><i class="fas fa-eye"></i>${data.followers}</li>
              <li><i class="fas fa-heart"></i>${data.followers}</li>
              <li><i class="fab fa-github"></i></i>${data.public_repos}</li>
            </ul>
          </div>
        </div> 
      </div>
      `;
      const block = document.querySelector(".user-inner-out");
      block.innerHTML = "";
      block.appendChild(userBlock);

      if (data.bio == null) {
        const bioMessage = document.querySelector(".user-main__description p");
        bioMessage.innerHTML = "L' utente non ha nessuna biografia inserita";
      }
    });
}
