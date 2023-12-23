import { Button, Segmented } from "antd"
import COLORS from "./Contents/COLORS"
import Fan from '../src/assets/fan.png'
import LightIcon from '../src/assets/light.png'
import LightOffIcon from '../src/assets/lightoff.png'
import ComputerOn from '../src/assets/computerOn.png'
import ComputerOff from '../src/assets/computerOff.png'
import WindowOn from '../src/assets/windowOn.png'
import WindowOff from '../src/assets/windowOff.png'
import AC from '../src/assets/air-conditioner.png'
import { useState } from "react"
import { AppstoreTwoTone, LeftOutlined, PoweroffOutlined, RightOutlined } from '@ant-design/icons';

const App = () => {
  return (
    <div style={{ height: '100%', width: '100%', display: 'flex', alignItems: 'center' }}>
      <div style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        backgroundImage: "url(/Classroom.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        filter: 'blur(50px)',
        zIndex: -1 // 确保背景在内容之下
      }}></div>
      <VirtualRoom />
      <IOTDashboard />
    </div>
  )
}

const VirtualRoom = () => {
  return (
    <div style={{ width: 800, minWidth: 800, height: 452, backgroundImage: "url(/Classroom.png)", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>

    </div>
  )
}

const IOTDashboard = () => {

  return (
    <div style={{ flex: 1, overflow: 'auto', scrollbarWidth: 'none', height: "100%", }}>
      <ModeList />
      <AirConditioner />
      <Light />
      <OtherItems />
    </div >
  )
}

const OtherItems = () => {
  const [isPCOn, setIsPCOn] = useState(false)
  const [isWindowOpen, setIsWindowOpen] = useState(true)
  const handleOperatePC = async () => {
    // await
    setIsPCOn(!isPCOn)
  }
  const handleOperateWindow = async () => {
    // await
    setIsWindowOpen(!isWindowOpen)
  }
  return (
    <div style={{ minWidth: 400, display: 'flex', padding: 10, gap: 6, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
      {/* 电脑 */}
      <div onClick={handleOperatePC} className="hoverStyle" style={{ padding: 10, borderRadius: 12, display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: COLORS.white }}>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          {isPCOn && <img src={ComputerOn} style={{ width: 30, height: 30 }} />}
          {!isPCOn && <img src={ComputerOff} style={{ width: 30, height: 30 }} />}
        </div>
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column', color: COLORS.commentText }}>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>PC</div>
          {isPCOn ? <div>Status: Open</div> : <div>Status: Close</div>}
        </div>
      </div>
      {/* 窗户 */}
      <div onClick={handleOperateWindow} className="hoverStyle" style={{ padding: 10, borderRadius: 12, display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: COLORS.white }}>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          {isWindowOpen && <img src={WindowOn} style={{ width: 30, height: 30 }} />}
          {!isWindowOpen && <img src={WindowOff} style={{ width: 30, height: 30 }} />}
        </div>
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column', color: COLORS.commentText }}>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>Window</div>
          {isWindowOpen ? <div>Status: Open</div> : <div>Status: Close</div>}
        </div>
      </div>
    </div>
  )
}

const Light = () => {
  return (<div style={{ minWidth: 400, padding: 10, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
        <img src={LightIcon} style={{ height: 40, width: 40 }} />
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>Light</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, }}>
        <div className="hoverStyle" style={{ fontSize: 12, color: COLORS.commentText, padding: 6, borderRadius: 6, backgroundColor: COLORS.white }}>Open All</div>
        <div className="hoverStyle" style={{ fontSize: 12, color: COLORS.commentText, padding: 6, borderRadius: 6, backgroundColor: COLORS.white }}>Close All</div>
      </div>
    </div>
    <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
      <SpecificLightItem title={"Left Side"} on={true} />
      <SpecificLightItem title={"Middle 1"} on={false} />
      <SpecificLightItem title={"Middle 2"} on={true} />
      <SpecificLightItem title={"Middle 3"} on={true} />
      <SpecificLightItem title={"Right Side"} on={true} />
    </div>
  </div>)
}

const SpecificLightItem = ({ title, on }) => {
  const handleOperateLight = async () => {
    // await setLight
  }
  return (
    <div className="hoverStyle" style={{ padding: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 12, backgroundColor: COLORS.white }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {on && <img src={LightIcon} style={{ height: 40, width: 40 }} />}
        {!on && <img src={LightOffIcon} style={{ height: 40, width: 40 }} />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: 12, color: COLORS.commentText }}>{title}</div>
    </div>
  )
}

const ModeItem = ({ ModeName }) => {
  return <div className="hoverStyle" style={{ padding: 10, width: "40%", display: 'flex', justifyContent: 'center', borderRadius: 12, backgroundColor: COLORS.white }}>{ModeName}</div>
}

const AirConditioner = () => {
  const [on, setOn] = useState(false)
  const [degree, setDegree] = useState(23)
  const [fanSpeed, setFanSpeed] = useState("Medium")
  const [mode, setMode] = useState("Cool")

  const lowestDegree = 16
  const highestDegree = 30
  const handleAddDegree = async () => {
    const addedDegree = degree + 1
    if (addedDegree <= highestDegree) {
      setDegree(addedDegree)
    }
  }
  const handleMinusDegree = async () => {
    const minusDegree = degree - 1
    if (minusDegree >= lowestDegree) {
      setDegree(minusDegree)
    }
  }
  const handleSetFanSpeed = async (speed) => {
    setFanSpeed(speed)
  }
  const handleSetMode = async (selectedMode) => {
    setMode(selectedMode)
  }
  return (<div style={{ minWidth: 400, padding: 10, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
        <img src={AC} style={{ height: 40, width: 40 }} />
        <div style={{ fontSize: 18, fontWeight: 'bold', }}>Air Conditioner</div>
      </div>
      {on ?
        <Button onClick={() => setOn(false)} type="primary"><PoweroffOutlined /><span style={{ fontWeight: 'bold' }}>On</span></Button>
        :
        <Button onClick={() => setOn(true)}><PoweroffOutlined /><span style={{ fontWeight: 'bold' }}>OFF</span></Button>}
    </div>

    <div style={{ display: 'flex', padding: 10, borderRadius: 12, backgroundColor: COLORS.white, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
      <div className="hoverStyle" onClick={() => { handleMinusDegree() }} style={{ display: 'flex', alignItems: 'center' }}><LeftOutlined style={{ fontWeight: 800 }} /></div>
      <div style={{ marginTop: 10, margin: '10px 30px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', }}>
          <div style={{ fontSize: 26 }}>{degree}</div>
          <div>&deg;C</div>
        </div>
      </div>
      <div className="hoverStyle" onClick={() => { handleAddDegree() }}><RightOutlined style={{ fontWeight: 800 }} /></div>
    </div>

    <div style={{ display: 'flex', marginTop: 10, gap: 10 }}>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', flexDirection: 'column', padding: 10, borderRadius: 12, backgroundColor: COLORS.white }}>
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'flex-start', alignItems: 'center' }}>
          <img src={Fan} style={{ height: 30, width: 30 }} />
          <div style={{ fontSize: 18 }}>Fan Speed</div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <Segmented defaultValue={fanSpeed} options={["Low", "Medium", "High"]} onChange={handleSetFanSpeed} />
        </div>
      </div>
      <div style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: COLORS.white }}>
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'flex-start', alignItems: 'center' }}>
          <AppstoreTwoTone style={{ fontSize: 26 }} />
          <div style={{ fontSize: 18 }}>Mode</div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <Segmented defaultValue={mode} options={["Cool", "Hot"]} onChange={handleSetMode} />
        </div>
      </div>
    </div>

  </div>)
}

const ModeList = () => {
  return (
    <div style={{ minWidth: 400, padding: 10, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
      <div style={{ fontWeight: 'bold', }}>Mode</div>
      <div style={{ marginTop: 10, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <ModeItem ModeName={"Lecture Mode"} />
        <ModeItem ModeName={"Lecture Mode"} />
        <ModeItem ModeName={"Lecture Mode"} />
        <ModeItem ModeName={"Lecture Mode"} />
      </div>
    </div>)
}

export default App
