import _Vue, {PluginObject} from 'vue';
import App from '../app';

const Everflow: PluginObject<EverflowPluginOptions> = {
  install(Vue, options) {
    Vue.prototype.$app = options.everflowApp;
  }
};

export class EverflowPluginOptions {
    everflowApp: App;
}
export default Everflow;