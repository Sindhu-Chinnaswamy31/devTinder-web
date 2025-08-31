import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Setting from './components/Setting';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Provider } from "react-redux";
import appStore from './utils/appStore';

function App() {

  return (
    <>
      <Provider store={appStore}> 
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/feed" element={<Feed />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/setting" element={<Setting />} />
                <Route path="/connections" element={<Connections />} />
                <Route path="/requests" element={<Requests />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </>
  )
}

export default App
