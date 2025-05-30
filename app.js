const main = document.querySelector("#main .text");
let info;

try {
  info = JSON.parse(localStorage.getItem('info')) || [];
} catch {
  info = [];
  localStorage.removeItem('info');
}

function route() {
  const hash = window.location.hash;

  if (hash === "#home" || hash === "") {
    home();
  } else if (hash === "#about") {
    about();
  } else if (hash === "#get") {
    get();
  } else if (hash === "#add") {
    add();
  } else if (hash === "#manage") {
    manage();
  }
}

window.addEventListener('hashchange', route);
route();

function home() {
  main.innerHTML = `
    <h1>Welcome Home</h1>
    <p>This is the homepage. Use the links above to navigate.</p>
  `;
}

function about() {
  main.innerHTML = `
    <h1>Welcome</h1>
    <p>This web site is used for saving your info. You can add info on 'Add info', manage it in 'Manage info', or see all info in 'Get info'.</p>
    <button onclick="window.location.hash = '#add'">Add your info</button>
  `;
}

function get() {
  main.innerHTML = "";
  if (info.length === 0) {
    main.innerHTML = "<p>No info saved yet.</p>";
    return;
  }

  info.forEach((e) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
      <h3>${e.title}</h3>
      <p>${e.info.slice(0, 20)}...</p>
    `;

    item.addEventListener("dblclick", () => {
      const index = info.findIndex(i => i.title === e.title && i.info === e.info);
      if (index !== -1) {
        info.splice(index, 1);
        localStorage.setItem('info', JSON.stringify(info));
        get();
      }
    });

    main.appendChild(item);
  });
}

function add() {
  main.innerHTML = `
    <form id="addForm">
      <input type="text" name="name" placeholder="Enter title" required>
      <input type="text" name="description" placeholder="Enter info" required>
      <button type="submit">Add</button>
    </form>
  `;

  document.getElementById("addForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const name = e.target.name.value.trim();
    const description = e.target.description.value.trim();

    if (name && description) {
      info.push({ title: name, info: description });
      localStorage.setItem("info", JSON.stringify(info));
      window.location.hash = "#get";
    }
  });
}

function manage() {
  main.innerHTML = "<h1>Your Infos</h1>";

  if (info.length === 0) {
    main.innerHTML += "<p>No info to manage.</p>";
    return;
  }

  info.forEach((e) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML = `
      <h3>${e.title}</h3>
      <p>${e.info.slice(0, 20)}...</p>
    `;
    item.addEventListener("click", () => {
      setTimeout(() => {
        main.innerHTML = `
        <h1>${e.title}</h1>
        <p>${e.info}</p>
        <button onclick="dlt(item)">Delete</button>
      `;
      }, 1);

      let dlt = (el) => {
        const index = info.findIndex(el => el.title === e.title && el.info === e.info);        
        if (index !== -1) {
          info.splice(index, 1);
          localStorage.setItem("info", JSON.stringify(info));
          manage();
        }
      };
    });
    main.appendChild(item);
  })

}