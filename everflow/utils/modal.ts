import * as $ from 'jquery';

export default class Modal
{
    id: string = "";
    title: any;
    body: any;
    footer: any;

    constructor(id: string = "modal") {
        this.id = id;
        this.title = $("#" + this.id + "Title");
        this.body = $("#" + this.id + "Body");
        this.footer = $("#" + this.id + "Footer");
    }

    open()
    {
        $("#" + this.id).modal('show');
    }

    close()
    {
        $("#" + this.id).modal('hide');
    }

}
