import React, {useState, useContext} from 'react';
import ReactCalendar from '../components/ReactCalendar';
import PomodoroTimer from '../components/PomodoroTimer'
import Settings from '../components/Settings';
import SettingsContext from "../components/SettingsContext";
import { createContext } from "react";
import ReactSwitch from "react-switch";
import { AuthContext } from '../context/auth.context';
import "./Homepage.css";
import "../components/slider.css"

export const ThemeContext = createContext(null);

function Homepage() {
  const { loggedIn, user, logout } = useContext(AuthContext);

 /*  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };
 */
const [showSettings, setShowSettings] = useState(false);
const [workMinutes, setWorkMinutes] = useState(25);
const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    /* <ThemeContext.Provider value={{ theme, toggleTheme }}> */
    <div className='background'>
      {loggedIn ? (
        <>
      <section className='TimerAndCalendar'>
     {/*  <div className="switch">
          <label> {theme === "light" ? "🌕" : "🌑"}</label>
          <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
        </div> */}
        <ReactCalendar/>
      <div >
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <PomodoroTimer />}
      </SettingsContext.Provider>
      </div>
</section>
</>
      ) : (
<>
<div className='logoffHomepage'>
<section>
  
  
</section>
</div>

</>
      
      )}
    </div>
   /*  </ThemeContext.Provider> */
  );
}

export default Homepage