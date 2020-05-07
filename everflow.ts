import Everflow, { EverflowPluginOptions } from './everflow/plugin/everflow-plugin';
import VueRouter from 'vue-router';
import App from './everflow/app';
import Page from './everflow/page';
import Ready from './everflow/ready';
import Request from './everflow/request';
import Prototypes from './everflow/prototypes/prototypes';
import Translator from './everflow/translator';
import Security from './everflow/security';
import errors from './everflow/errors/--init--';
import utils from './everflow/utils/--init--';
import models from './everflow/models/--init--';
import decorators from './everflow/decorators/--init--';
import * as interfaces from './everflow/interfaces/--init--';
import navigationGuards from './everflow/navigation-guards';

export
{
    navigationGuards,
    EverflowPluginOptions,
    VueRouter,
    App,
    Page,
    Ready,
    Request,
    errors,
    utils,
    models,
    decorators,
    interfaces,
    Translator,
    Security
}
export default Everflow;
// Enable Prototypes
Prototypes();
