import { Route, NavigationGuard } from 'vue-router';

export default (to: Route, from: Route, next: CallableFunction) => {
    document.title = to.meta.title;
    next();
};

