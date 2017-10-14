import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './everflow/app';
import Events from './everflow/events';
import History from './everflow/history';
import Page from './everflow/page';
import Permission from './everflow/permission';
import Ready from './everflow/ready';
import Request from './everflow/request';
import ResponseCallback from './everflow/response-callback';
import Response from './everflow/response';
import Prototypes from './everflow/prototypes/prototypes';
import Translator from './everflow/translator';
import errors from './everflow/errors/__init__';
import utils from './everflow/utils/__init__';
import models from './everflow/models/__init__';
import decorators from './everflow/decorators/__init__';
import permissions from './everflow/permissions/__init__';
import * as interfaces from './everflow/interfaces/__init__';

export
{
    Vue,
    VueRouter,
    App,
    Events,
    History,
    Page,
    Permission,
    Ready,
    Request,
    ResponseCallback,
    Response,
    errors,
    utils,
    models,
    decorators,
    permissions,
    interfaces,
    Translator
}
//Enable Prototypes
Prototypes();