import { WSLink } from './ws-link'
import { ApolloLink } from '@apollo/client/core';


declare global {
    const GraphQLPlayground: any

    namespace globalThis  {
        var init: () => void;
    }
}


function createApolloLink(session: any, subscriptionEndpoint?: string): { link: ApolloLink } {
    console.warn(session)
    const link = new WSLink({
        url: (subscriptionEndpoint || session.endpoint).replace(/^http/, 'ws'),
        connectionParams: () => session.headers,
    });
    return { link }
}

globalThis.init = function init() {
    const loadingWrapper = document.getElementById("loading-wrapper");
    if (loadingWrapper) {
        loadingWrapper.classList.add("fadeOut");
    }

    const root = document.getElementById("root");
    if (root) {
        root.classList.add("playgroundIn");
    }

    GraphQLPlayground.init(root, {
        createApolloLink,
    });
}
