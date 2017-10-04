import * as $ from 'jquery';
import Response from './response';
import Utils from './utils/utils';
import IApp from './interfaces/i-app';
import IResponseCallback from './interfaces/i-response-callback';
import Echo from './utils/echo';

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

    private setFields()
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

    private checkForError()
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
        } else {
            this.errorOther(this.status);
        }
    }

    //overridable
    errorOther(status: number)
    {
        Echo.warn('unknown http error - unhandled');
    }

    //overridable
    error400()
    {
        Echo.warn('400 error - unhandled');
    }

    //overridable
    error401()
    {
        Echo.warn('401 error - unhandled');
    }

    //overridable
    error500()
    {
        //Silently fail...
        if (this.app.config.debug)
        {
            Echo.warn('500 error: Check database, check request method, check server ect...');
        }
        else
        {
            //Use message from config for 500error.
            if (!Utils.isEmpty(this.fields.errorModal))
            {
                this.fields.errorModalMessage.text('Could not connect to server, please try again later.');
                this.fields.errorModal.modal('open');
            }

        }
    }

    //overridable
    entry()
    {
        //Override this function...
    }

}