'use strict';



import moment from 'moment';


export default class MainController {
    constructor($log) {
        'ngInject';
        this.$log = $log;
        this.awesomeThings = ['Angular', 'Webpack', 'babel'];
    }

    $onInit() {
        
        
        this.moment_version = moment.version;
        
    }
}
