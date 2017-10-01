import * as $ from 'jquery';

export default class ErrorModal {
    id: string = "";
    title: any;
    body: any;
    footer: any;

    constructor(id: string = "errorModal") {
        this.id = id;
        this.title = $("#" + this.id + "Title");
        this.body = $("#" + this.id + "Body");
        this.footer = $("#" + this.id + "Footer");
    }

    open() {
        $("#" + this.id)['modal']();
    }

    close() {
        //do nothing
    }
}
