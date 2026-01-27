const { readFileSync } = require("fs");
const { createServer } = require("http");
const { parse } = require("url");
const { renderToString } = require("react-dom/server");
const React = require("react");

const pizzas = [
  {
    name: "Focaccia",
    price: 6,
  },
  {
    name: "Pizza Margherita",
    price: 10,
  },
  {
    name: "Pizza Spinaci",
    price: 12,
  },
  {
    name: "Pizza Funghi",
    price: 12,
  },
  {
    name: "Pizza Prosciutto",
    price: 15,
  },
];

function Home() {
  return (
    <div>
      <h1>🍕 Fast React Pizza Co.</h1>
      <p>This page has been rendered with React on the server 🤯</p>

      <h2>Menu</h2>
      <ul>
        {pizzas.map((pizza) => (
          <MenuItem pizza={pizza} key={pizza.name} />
        ))}
      </ul>
      <a href="/">Go back to index</a>
    </div>
  );
}

function Counter() {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>+1</button>
      <span>{count}</span>
    </div>
  );
}

function MenuItem({ pizza }) {
  return (
    <li>
      <h4>
        {pizza.name} (${pizza.price})
      </h4>
      <Counter />
    </li>
  );
}

const htmlTemplate = readFileSync(`${__dirname}/index.html`, "utf-8");
const clientJS = readFileSync(`${__dirname}/client.js`, "utf-8");

const server = createServer((req, res) => {
  const parsedUrl = parse(req.url, true).pathname;

  if (parsedUrl === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(
      htmlTemplate.replace(
        "%%%CONTENT%%%",
        `
    <h1>Hallo, this is manual SSR</h1>
    <p>
      I created this to learn Next.js by first learning how it works under the
      hood.
    </p>
    <a href="/pizza">Go to pizza page</a>
    `,
      ),
    );
  } else if (parsedUrl === "/dragunwf") {
    res.end("DragunWF");
    } else if (parsedUrl === "/pizza") {
      const renderedHtml = renderToString(<Home />);
      const html = htmlTemplate.replace(
        "%%%CONTENT%%%",
        `<div id="root">${renderedHtml}</div>`
      );
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(html);
    } else if (parsedUrl === "/client.js") {
    res.writeHead(200, { "Content-Type": "application/javascript" });
    res.end(clientJS);
  } else {
    res.end("Unknown route");
  }
});

server.listen(8000, () => {
  console.log("Server is listening on port 8000");
});
