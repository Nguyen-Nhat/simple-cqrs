import "dotenv/config";
import app from "./src/app.js";
import { connect as connectRabbitMQ } from "./src/lib/rabbitmq.js";
import { startProductEventRelay } from "./src/eventRelay/index.js";

const PORT = process.env.PORT || 3001;

async function start() {
  await connectRabbitMQ();
  startProductEventRelay();

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

start();
