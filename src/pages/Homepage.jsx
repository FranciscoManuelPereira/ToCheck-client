import React, {useState} from 'react';
/* import PomodoroTimer from '../components/PomodoroTimer'; */
import Settings from '../components/Settings'
import SettingsContext from "../components/SettingsContext";
/* import { Calendar } from 'react-big-calendar' */

const [showSettings, setShowSettings] = useState(false);
const [workMinutes, setWorkMinutes] = useState(45);
const [breakMinutes, setBreakMinutes] = useState(15);


function Homepage() {
  return (
    <div>
      <SettingsContext.Provider value={{
        showSettings,
        setShowSettings,
        workMinutes,
        breakMinutes,
        setWorkMinutes,
        setBreakMinutes,
      }}>
        {showSettings ? <Settings /> : <Timer />}
      </SettingsContext.Provider>
  HOME
    </div>
  )
}

export default Homepage