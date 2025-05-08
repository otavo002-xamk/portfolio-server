require("dotenv").config();
const PORT = process.env.PORT || 3001;
const app = require("./server");

app
  .listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server startup error:", err);
  });
