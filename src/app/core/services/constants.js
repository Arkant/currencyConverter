'use strict';

export default function (app) {
    app.constant('ROUTE_ERRORS', {
            auth: 'Authorization has been denied.',
    });
    app.constant('fees', [0, 1, 3, 5]);
    app.constant('actions', ['Buy', 'Sell']);
    app.constant('curNames', ['USD', 'EUR', 'RUB', 'BTC']);
}
