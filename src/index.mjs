import "./styles.css";

const app = document.querySelector("#app");

app.style.display = "flex";
app.style.justifyContent = "center";
let listData;

const container = document.createElement("div");
const scroll_div = document.createElement("div");
container.classList.add("container");
scroll_div.classList.add("scroll-area");

app.appendChild(container);
container.appendChild(scroll_div);

async function fetchData() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();

  if (data) {
    listData = data.products;
    scroll_div.style.height = `${data.products.length * 110}px`;
    virtualizeList([0, Math.floor(600 / 110)]);
  }
}

function virtualizeList(slcieIndexes) {
  scroll_div.innerHTML = "";
  listData
    .slice(slcieIndexes[0], slcieIndexes[1] + 1)
    .forEach((product, index) => {
      createCard(product, index, slcieIndexes[0]);
    });
}

function createCard(product, index, fromTop) {
  const card = document.createElement("div");
  const imageDiv = document.createElement("div");
  const detailsDiv = document.createElement("div");

  //card style
  card.classList.add("card");
  detailsDiv.classList.add("descriptions");
  card.style.top = `${(fromTop + index) * 110}px`;

  //image tag
  const image = document.createElement("img");
  image.src = product.thumbnail;
  image.alt = "product.description";
  imageDiv.classList.add("image");

  imageDiv.append(image);
  //   card.append(imageDiv);
  scroll_div.append(card);
  container.append(scroll_div);

  //create card details div
  const h3 = document.createElement("h3");
  h3.innerText = product.title;

  const h4 = document.createElement("h4");
  h4.innerText = product.price;

  detailsDiv.append(h3, h4);
  card.append(detailsDiv);
}

fetchData();

//scroll check

container.addEventListener("scroll", () => {
  let newStart = Math.floor(container.scrollTop / 110);

  let newEnd = Math.floor(newStart + container.clientHeight / 110);
  console.log(container);

  virtualizeList([newStart, newEnd]);
});
