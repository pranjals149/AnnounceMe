import './App.css';
import { Drawer, JoinedClasses, Login, Main } from './Components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { IsUserRedirect, ProtectedRoute } from './Components/routes/Routes';
import { useLocalContext } from './context/context';
import { useState } from 'react';
import { useEffect } from 'react';
import db from './lib/firebase';

function App() {
  const { loggedInMail } = useLocalContext()

  const [createdRooms, setCreatedRooms] = useState([])
  const [joinedRooms, setJoinedRooms] = useState([])

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db.collection('CreatedRooms').doc(loggedInMail).collection('rooms').onSnapshot((snapshot) => {
        setCreatedRooms(snapshot.docs.map((doc) => doc.data()))
      })
      return () => unsubscribe()
    }
  }, [loggedInMail])

  useEffect(() => {
    if (loggedInMail) {
      let unsubscribe = db.collection('JoinedRooms').doc(loggedInMail).collection('rooms').onSnapshot((snapshot) => {
        setJoinedRooms(snapshot.docs.map((doc) => doc.data().joinedData))
      })

      return () => unsubscribe();
    }
  }, [loggedInMail])

  return (
    <Router>
      <Switch>
        {
          createdRooms.map((item, index) => (
            <Route key={index} exact path={`/${item.id}`}>
              <Drawer />
              <Main classData={item} />
            </Route>
          ))
        }

        {
          joinedRooms.map((item, index) => (
            <Route key={index} exact path={`/${item.id}`}>
              <Drawer />
              <Main classData={item} />
            </Route>
          ))
        }

        <IsUserRedirect
          user={loggedInMail}
          loggedInPath='/'
          path='/signin' exact
        >
          <Login />
        </IsUserRedirect>

        <ProtectedRoute
          user={loggedInMail}
          path='/' exact
        >
          <Drawer />

          <ol className='joined'>
            {createdRooms.map((item) => (
              <JoinedClasses classData={item} />
            ))}

            {joinedRooms.map((item) => (
              <JoinedClasses classData={item} />
            ))}
          </ol>

        </ProtectedRoute>
      </Switch>
    </Router>
  );
}

export default App;
