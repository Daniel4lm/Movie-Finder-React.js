import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
/*
interface RouteType {
    path: string;
    Component: React.ComponentType<{ routes: any }>;
    exact?: boolean;
}

export interface RouteTypes extends RouteType {
    routes?: RouteType;
}*/

export interface RoutesArrayType {
    routes: RouteType[];
}

export interface RouteType {
    path: string;
    Component: ({ routes }: any) => JSX.Element;
    routes?: {
        path: string;
        Component: (props: any) => JSX.Element;
    }[];
    exact?: boolean;
};

function RoteWithSubroutes(route: RouteType) {

    const { path, exact, routes, Component } = route;

    return (
        <Route
            key={path}
            path={path}
            exact={exact}
            render={(routeProps) => (
                <Component routes={routes} {...routeProps} />
            )}
        />
    );
}

export default function RenderRoutes({ routes }: RoutesArrayType) {

    return (
        <Switch>
            {routes?.map(route => {
                return RoteWithSubroutes(route);
            })}
        </Switch>
    );
}
