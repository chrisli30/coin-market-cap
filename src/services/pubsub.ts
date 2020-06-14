// import { PubSub } from '@google-cloud/pubsub';

// import BaseService from './base';
// import Logger from '../loaders/logger';

// const pubSubClient = new PubSub();

// export default class PubSubService extends BaseService {
//     async publishMsg({ topicName, data }) {
//         const dataBuffer = Buffer.from(JSON.stringify(data));
//         const messageId = await pubSubClient.topic(topicName).publish(dataBuffer);

//         Logger.info('service: PubSubService, topicName: %s, data: %O, messageId: %s', topicName, data, messageId);
//     }
// }
