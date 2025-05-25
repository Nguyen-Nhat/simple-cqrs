import amqp from "amqplib";

let channel = null;

export async function connect() {
  const connection = await amqp.connect(process.env.RABBITMQ_URL);
  channel = await connection.createChannel();
}

export async function publishEvent(exchange, routingKey, data) {
  if (!channel) {
    throw new Error("RabbitMQ is not connected.");
  }

  await channel.assertExchange(exchange, "topic", { durable: true });

  channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(data)), {
    persistent: true,
  });
}
