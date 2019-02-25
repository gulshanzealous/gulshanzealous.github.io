import React from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import {Home, Blog, Contact, WritePost, PrivacyPolicy} from './pages'

const Routes = () => {
    return(
        <HashRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/blog" component={Blog} />
                <Route exact path='/contact' component={Contact} />
                <Route exact path='/privacy-policy' component={PrivacyPolicy} />

            </Switch>
        </HashRouter>
    )
}

export default Routes

                // <Route exact path='/write-post' component={WritePost} />
