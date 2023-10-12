const app = require("./src/utils/app");
const { PORT } = require("./src/utils/constants");


app.listen(PORT, () => console.log(`app listening on ${PORT}`));
