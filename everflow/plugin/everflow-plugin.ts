import Vue from 'vue';
import App from '../app';

const EverFlow: any =  {
  install(Vue, options) {
    Vue.prototype.$everflowApp = options.everflowApp;
  }
};

export default EverFlow;