require("dotenv").config();
const PORT = process.env.PORT;
const app = require("./server");

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
