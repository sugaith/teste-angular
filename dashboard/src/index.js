import React from 'react';
import ReactDOM from 'react-dom';
import  ScreenUsers from './Telas/Users/ScreenUsers';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter , Route} from 'react-router-dom'


ReactDOM.render((
    <BrowserRouter>
        <div>
            <Route exact path="/" component={ScreenUsers} />
        </div>
    </BrowserRouter>
), document.getElementById('root'))
registerServiceWorker();
