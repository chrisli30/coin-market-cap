import config from '../config';
import CryptoCurrency from '../jobs/cryptoCurrency';
import Agenda from 'agenda';

export default ({ agenda }: { agenda: Agenda }) => {
    agenda.define(
        'send-email',
        { priority: 'high', concurrency: config.agenda.concurrency },
        // @TODO Could this be a static method? Would it be better?
        new CryptoCurrency().handler,
    );

    agenda.start();
};
