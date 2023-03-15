import React, {useState} from 'react';
import ReactCalendar from '../components/ReactCalendar';
import PomodoroTimer from '../components/PomodoroTimer'
import Settings from '../components/Settings';
import SettingsContext from "../components/SettingsContext";
import "./Homepage.css";
import "../components/slider.css"

function Homepage() {

const [showSettings, setShowSettings] = useState(false);
const [workMinutes, setWorkMinutes] = useState(45);
const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <div>
      <div className='timerArea'>
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
<ReactCalendar/>
    </div>
  )
}

export default Homepage