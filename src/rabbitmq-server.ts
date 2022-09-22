import { Channel, Connection, ConsumeMessage, Message } from "amqplib";

export default class RabbitmqServer {
    private conn: Connection;
    private channel: Channel;

    constructor(private uri: string) { }

    async start(): Promise<void> {
        this.conn = await require('amqplib').connect(this.uri);
        this.channel = await this.conn.createChannel();
    }

    async publishInQueue(queue: string, message: any) {
        await this.channel.assertQueue(queue, { durable: true });
        return this.channel.sendToQueue(queue, Buffer.from(message));
    }

    async publishInExchange(exchange: string, routingKey: string, message: any): Promise<boolean> {
        return this.channel.publish(exchange, routingKey, Buffer.from(message));
    }

    async consume(queue: string, callback: (message: Message) => void) {
        return this.channel.consume(queue, (message: ConsumeMessage | null) => {
            if (message) {
                callback(message);
                this.channel.ack(message);
            }
        });
    }
}