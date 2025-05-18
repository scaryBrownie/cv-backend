import { app } from "./server.mjs";

app.listen(process.env.PORT, () => {
  console.log(`app running on ${process.env.PORT}`);
});
