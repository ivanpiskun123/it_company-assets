import React, {useContext, useEffect} from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {AuthContext} from "../context";

const  AppRouter = () => {
    const {isAuth, isLoading, isAdmin, currentUserId} = useContext(AuthContext);


    return (
      isAuth
        ?
        <Switch>
            {privateRoutes.map(route =>
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            {  
              <Redirect to={`/units_list/`+localStorage.getItem('user_id')}/>
            }

        </Switch>
        :
        <Switch>
            {publicRoutes.map(route =>
                <Route
                    component={route.component}
                    path={route.path}
                    exact={route.exact}
                    key={route.path}
                />
            )}
            <Redirect to='/sign_in'/>
        </Switch>
    )
}

export default AppRouter;
