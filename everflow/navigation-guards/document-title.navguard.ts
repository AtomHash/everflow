import { Route } from 'vue-router';

export default (to: Route, from: Route, next: CallableFunction) => {
    // Add to beforeEach, document title updates on navigation
    document.title = to.meta.title;
    next();
};

