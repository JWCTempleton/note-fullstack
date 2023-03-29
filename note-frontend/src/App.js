import "./App.css";
import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";
// import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import Footer from "./components/Footer";
import Toggleable from "./components/Toggleable";
import NoteForm from "./components/NoteForm";
import Home from "./components/Home";
import User from "./components/User";
import LoginPage from "./components/LoginPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
} from "react-router-dom";

function App() {
  const [allNotes, setAllNotes] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    noteService.getAll().then((response) => {
      setAllNotes(response);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const user = await loginService.login({
  //       username,
  //       password,
  //     });

  //     window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

  //     noteService.setToken(user.token);
  //     setUser(user);
  //     setUsername("");
  //     setPassword("");
  //   } catch (exception) {
  //     setErrorMessage("Wrong credentials");
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //   }
  // };

  const addNote = (noteObject) => {
    noteService.create(noteObject).then((returnedNote) => {
      setAllNotes(allNotes.concat(returnedNote));
    });
  };
  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");
  };

  const toggleImportanceOf = (id) => {
    const note = allNotes.find((note) => note.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then((response) => {
        setAllNotes(allNotes.map((note) => (note.id !== id ? note : response)));
      })
      .catch((error) => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const notesToShow = showAll
    ? allNotes
    : allNotes.filter((note) => note.important === true);

  // return (
  //   <div>
  //     <h1>Notes</h1>
  //     <Notification message={errorMessage} />
  //     {!user && (
  //       <LoginForm
  //         handleLogin={handleLogin}
  //         setUsername={setUsername}
  //         setPassword={setPassword}
  //         username={username}
  //         password={password}
  //       />
  //     )}
  //     {user && (
  //       <div>
  //         <p>{user.name} logged in</p>
  //         <button onClick={handleLogout}>Logout</button>
  //         <Toggleable buttonLabel="new note">
  //           <NoteForm createNote={addNote} />{" "}
  //         </Toggleable>{" "}
  //       </div>
  //     )}{" "}
  //     <h2>Notes</h2>
  //     <div>
  //       <button onClick={() => setShowAll(!showAll)}>
  //         show {showAll ? "important" : "all"}
  //       </button>
  //     </div>
  //     <ul>
  //       {notesToShow.map((note) => (
  //         <Note
  //           key={note.id}
  //           note={note}
  //           toggleImportance={() => toggleImportanceOf(note.id)}
  //         />
  //       ))}
  //     </ul>
  //     <Footer />
  //   </div>
  // );
  const Notes = ({ notesToShow, toggleImportanceOf }) => (
    <div>
      <h2>Notes</h2>
      {user && (
        <Toggleable buttonLabel="new note">
          <NoteForm createNote={addNote} />{" "}
        </Toggleable>
      )}
      <ul>
        {notesToShow.map((note) => (
          <li key={note.id}>
            <Link to={`/notes/${note.id}`}>{note.content}</Link>{" "}
            {user && (
              <button onClick={() => toggleImportanceOf(note.id)}>
                {note.important ? "Make not important" : "Make important"}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );

  // const Login = (props) => {
  //   const navigate = useNavigate();

  //   // const onSubmit = (event) => {
  //   //   event.preventDefault()
  //   //   props.onLogin('mluukkai')
  //   //   navigate('/')
  //   // }

  //   return (
  //     <div>
  //       <h2>login</h2>
  //       <form onSubmit={handleLogin}>
  //         <div>
  //           username: <input />
  //         </div>
  //         <div>
  //           password: <input type="password" />
  //         </div>
  //         <button type="submit">login</button>
  //       </form>
  //     </div>
  //   );
  // };
  const padding = {
    padding: 5,
  };
  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/notes">
            notes
          </Link>
          {user && (
            <Link style={padding} to="/user">
              user
            </Link>
          )}
          {user ? (
            <div>
              <p>{user.username} logged in</p>{" "}
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link style={padding} to="/login">
              login
            </Link>
          )}
          {!user && (
            <Link style={padding} to="/signup">
              sign up
            </Link>
          )}
        </div>

        <Routes>
          <Route
            path="/notes/:id"
            element={
              <Note
                allNotes={allNotes}
                toggleImportanceOf={toggleImportanceOf}
              />
            }
          />
          <Route
            path="/notes"
            element={
              <Notes
                notesToShow={notesToShow}
                toggleImportanceOf={toggleImportanceOf}
              />
            }
          />
          <Route
            path="/user"
            element={
              user ? <User user={user} /> : <Navigate replace to="/login" />
            }
          />
          <Route
            path="/login"
            element={
              <LoginForm
                setUsername={setUsername}
                setPassword={setPassword}
                username={username}
                password={password}
                user={user}
                setUser={setUser}
              />
            }
          />
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={
              <LoginPage
                setUsername={setUsername}
                setPassword={setPassword}
                username={username}
                password={password}
                user={user}
                setUser={setUser}
              />
            }
          />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
