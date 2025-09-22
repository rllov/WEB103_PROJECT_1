const renderHeroes = async () => {
  const response = await fetch("/heroes");
  const data = await response.json();

  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = "";

  const types = [
    { label: "Support", className: "support" },
    { label: "Damage", className: "attack" }, // "Damage" type uses "attack" class
    { label: "Tank", className: "tank" },
  ];

  types.forEach(({ label, className }) => {
    const columnWrapper = document.createElement("div");
    columnWrapper.className = "column-wrapper";

    const title = document.createElement("div");
    title.className = "column-title";
    title.textContent = label;

    const column = document.createElement("div");
    column.className = `hero-column ${className}`;

    data
      .filter((hero) => hero.type === label)
      .forEach((hero) => {
        const card = document.createElement("div");
        card.className = "card";

        const topContainer = document.createElement("div");
        topContainer.className = "top-container";
        topContainer.style.backgroundImage = `url(${hero.icon})`;

        const bottomContainer = document.createElement("div");
        bottomContainer.className = "bottom-container";

        const name = document.createElement("h3");
        name.textContent = hero.name;

        const affiliation = document.createElement("p");
        affiliation.textContent = "Affiliation: " + hero.affiliation;

        const detailsLink = document.createElement("a");
        detailsLink.href = `/heroes/${hero.id}`;
        detailsLink.textContent = "Details";
        detailsLink.setAttribute("role", "button");

        bottomContainer.appendChild(name);
        bottomContainer.appendChild(affiliation);
        bottomContainer.appendChild(detailsLink);

        card.appendChild(topContainer);
        card.appendChild(bottomContainer);

        column.appendChild(card);
      });

    columnWrapper.appendChild(title);
    columnWrapper.appendChild(column);
    mainContent.appendChild(columnWrapper);
  });
};
const renderHero = async () => {
  const pathParts = window.location.pathname.split("/");
  const requestedID = parseInt(pathParts[pathParts.length - 1]);
  const response = await fetch("/heroes");
  const data = await response.json();
  const hero = data.find((h) => h.id === requestedID);
  if (hero) {
    document.getElementById("image").src = hero.icon;
    document.getElementById("name").textContent = hero.name;
    document.getElementById("type").textContent = "Type: " + hero.type;
    document.getElementById("description").textContent = hero.description;
    document.getElementById("real_name").textContent =
      "Real Name: " + hero.real_name;
    document.getElementById("affiliation").textContent =
      "Affiliation: " + hero.affiliation;
    document.title = `Hero - ${hero.name}`;
  } else {
    const message = document.createElement("h2");
    message.textContent = "No Hero Available";
    document.getElementById("hero-content").appendChild(message);
  }
};

if (document.getElementById("main-content")) {
  renderHeroes();
}
if (document.getElementById("hero-content")) {
  renderHero();
}
