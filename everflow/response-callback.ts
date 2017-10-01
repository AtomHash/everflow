import * as $ from 'jquery';
import Response from './response';
import Utils from './utils/utils';
import IApp from './interfaces/i-app';
import IResponseCallback from './interfaces/i-response-callback';

export default class ResponseCallback implements IResponseCallback
{
    response: Response;
    app: IApp;
    status: number;
    fields: any;
    params: any;

    constructor(response: Response, params: any=null)
    {
        this.app = window.app;
        this.response = response;
        this.status = response.status;
        this.params = params;
        this.setFields();
        this.checkForError();
    }

    setFields()
    {
        var $elements: any = {};
        $.each(this.app.currentView.$refs, function (index, value) {
            if (index.endsWith('modal')) //Ignore messages and headers of modals...
            {
                $elements[index] = $(value).modal();
            }
            else
            {
                $elements[index] = $(value);
            }
        });
        this.fields = $elements;

    }

    //DO NOT MODIFY
    checkForError()
    {
        // default error testing. 
        if (this.status !== 200) {
            this.error();
        } else {
            this.entry();
        }
    }

    //overridable
    error()
    {
        if (this.status === 400) {
            //Client validation and user errors
            this.error400();
        } else if (this.status === 401) {
            //Unauthorized access to page or resource
            this.error401();
        } else if (this.status === 500) {
            //server error / api request did not complete
            this.error500();
        }
            
    }

    //overridable
    error400()
    {
        console.log('400 error');
    }

    //overridable
    error401()
    {
        console.log('401 error');
    }

    //overridable
    error500()
    {
        //Silently fail...
        if (this.app.config.debug)
        {
            console.log('500 error: Check database, check request method, check server ect...');
        }
        else
        {
            //Use message from config for 500error.
            if (!Utils.isNull(this.fields.errorModal))
            {
                this.fields.errorModalMessage.text(this.app.config.error500.message);
                this.fields.errorModal.modal('open');
            }

        }
    }

    //overridable
    entry()
    {
        //Override this function...
        console.log('callback parent');
    }
}