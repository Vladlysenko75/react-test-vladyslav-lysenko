import {Component} from 'react';

import NavBar from './components/NavBar/NavBar';
import {MyProvider} from './context/MContext';
import './App.css';

class App extends Component {

    render() {
        return (
            <div className="App">
                <MyProvider>
                    <NavBar/>
                    {this.props.children}
                </MyProvider>
            </div>
        )
    }
}

export default App;
