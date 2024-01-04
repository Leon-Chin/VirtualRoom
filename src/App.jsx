import { Button, Segmented, message } from "antd"
import COLORS from "./constants/COLORS"
import Fan from '../src/assets/fan.png'
import LightIcon from '../src/assets/light.png'
import LightOffIcon from '../src/assets/lightoff.png'
import ComputerOn from '../src/assets/computerOn.png'
import ComputerOff from '../src/assets/computerOff.png'
import WindowOn from '../src/assets/windowOn.png'
import WindowOff from '../src/assets/windowOff.png'

import curtainOn from '../src/assets/curtainOpen.png'
import curtainOff from '../src/assets/curtainOff.png'
import AC from '../src/assets/air-conditioner.png'
import { useState } from "react"
import { AppstoreTwoTone, LeftOutlined, PoweroffOutlined, RightOutlined } from '@ant-design/icons';
import LightOn from '../src/assets/BackgroundInsidePics/LightOn.png'
import LightOff from '../src/assets/BackgroundInsidePics/LightOff.png'

import ACOff from '../src/assets/BackgroundInsidePics/ACOff.png'
import ACHotLow from '../src/assets/BackgroundInsidePics/ACHotLow.png'
import ACHotMedium from '../src/assets/BackgroundInsidePics/ACHotMedium.png'
import ACHotHigh from '../src/assets/BackgroundInsidePics/ACHotHigh.png'
import ACCoolLow from '../src/assets/BackgroundInsidePics/ACColdLow.png'
import ACCoolMedium from '../src/assets/BackgroundInsidePics/ACColdMedium.png'
import ACCoolHigh from '../src/assets/BackgroundInsidePics/ACColdHigh.png'

import PCOff from '../src/assets/BackgroundInsidePics/PCOff.png'
import PCOn from '../src/assets/BackgroundInsidePics/PCOn.png'

import WindowOpen from '../src/assets/BackgroundInsidePics/WindowOpen.png'

import CurtainCloseRight from '../src/assets/BackgroundInsidePics/CurtainCloseRight.png'
import CurtainOpenRight from '../src/assets/BackgroundInsidePics/CurtainOpenRight.png'
import MODE from "./constants/MODE"
import { useDispatch, useSelector } from "react-redux"
import { AC_MODE, FAN_SPEED } from "./constants/AC"
import SPECIFIC_LIGHT from "./constants/LIGHT"
import ITEMS from "./constants/ITEMS"
import { changeStatus, getPreStatus, switchMode } from "./api/system.api"
import { setSystem } from "./redux/systemSlice"

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
        zIndex: -100 // 确保背景在内容之下
      }}></div>
      <VirtualRoom />
      <IOTDashboard />
    </div>
  )
}

const VirtualRoom = () => {
  return (
    <div style={{ zIndex: -10, position: 'relative', width: 800, minWidth: 800, height: 452, backgroundImage: "url(/Classroom.png)", backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}>
      <LightPicInside />
      <ACPicInside />
      <PCPicInside />
      <CurtainPicInside />
      <WindowPicInside />
      <WindowPicInsideLeft />
      <CurtainPicInsideLeft />
    </div>
  )
}

const WindowPicInside = () => {
  const { system } = useSelector(state => state.system)
  const { window } = system
  return <>
    {window && <img src={WindowOpen} style={{ zIndex: -1, position: 'absolute', top: 103, right: 0, width: 270 }} />}
  </>
}

const CurtainPicInside = ({ }) => {
  const { system } = useSelector(state => state.system)
  const { curtain } = system
  return (
    <>
      {curtain ? <img src={CurtainOpenRight} style={{ width: 800, position: 'absolute', left: 330, top: 40, }}></img> :
        <img src={CurtainCloseRight} style={{ width: 800, position: 'absolute', left: 310, top: 0, }}></img>}
    </>
  )
}

const WindowPicInsideLeft = () => {
  const { system } = useSelector(state => state.system)
  const { window } = system
  return <>
    {window && <img src={WindowOpen} style={{ zIndex: -1, transform: 'scaleX(-1)', position: 'absolute', top: 103, left: 0, width: 270 }} />}
  </>
}

const CurtainPicInsideLeft = ({ }) => {
  const { system } = useSelector(state => state.system)
  const { curtain } = system
  return (
    <>
      {curtain ? <img src={CurtainOpenRight} style={{ transform: 'scaleX(-1)', width: 800, position: 'absolute', right: 330, top: 40, }}></img> :
        <img src={CurtainCloseRight} style={{ transform: 'scaleX(-1)', width: 800, position: 'absolute', right: 310, top: 0, }}></img>}
    </>
  )
}
const PCPicInside = ({ }) => {
  const { system } = useSelector(state => state.system)
  const { computer } = system
  return <img src={computer ? PCOn : PCOff} style={{ width: 500, position: 'absolute', left: 150, top: 170, }}></img>
}
const LightPicInside = ({ }) => {
  const { system } = useSelector(state => state.system)
  const { lighting: { leftSide, middle1, middle2, middle3, rightSide } } = system
  return (
    <>
      <img src={leftSide ? LightOn : LightOff} style={{ width: 180, position: 'absolute', left: 38 }}></img>
      <img src={middle1 ? LightOn : LightOff} style={{ width: 180, position: 'absolute', left: 176 }}></img>
      <img src={middle2 ? LightOn : LightOff} style={{ width: 180, position: 'absolute', left: 315 }}></img>
      <img src={middle3 ? LightOn : LightOff} style={{ width: 180, position: 'absolute', left: 452 }}></img>
      <img src={rightSide ? LightOn : LightOff} style={{ width: 180, position: 'absolute', left: 591 }}></img>
    </>
  )
}

const ACPicInside = ({ }) => {
  const { system } = useSelector(state => state.system)
  const { airConditioner: { temperature, fanSpeed, mode, isOn } } = system
  const ACOnPic = () => {
    switch (mode) {
      case AC_MODE.COOL:
        switch (fanSpeed) {
          case FAN_SPEED.LOW:
            return ACCoolLow
          case FAN_SPEED.MEDIUM:
            return ACCoolMedium
          case FAN_SPEED.HIGH:
            return ACCoolHigh
        }
        break;
      case AC_MODE.HOT:
        switch (fanSpeed) {
          case FAN_SPEED.LOW:
            return ACHotLow
          case FAN_SPEED.MEDIUM:
            return ACHotMedium
          case FAN_SPEED.HIGH:
            return ACHotHigh
        }
    }
  }
  return <>
    {!isOn ? <img src={ACOff} style={{ width: 116, position: 'absolute', top: 40, left: 130 }}></img>
      : <img src={ACOnPic()} style={{ width: 116, position: 'absolute', top: 40, left: 130 }}></img>}
  </>
}

const IOTDashboard = () => {
  return (
    <div style={{ flex: 1, overflow: 'auto', scrollbarWidth: 'none', height: "100%", }}>
      <ModeList />
      <AirConditioner />
      <Light />
      <OtherItems />
      <SettingButtons />
    </div >
  )
}

const OtherItems = () => {
  const { system } = useSelector(state => state.system)
  const { computer, curtain, window } = system
  const dispatch = useDispatch()
  const handleOperatePC = async () => {
    // await setLight
    const req = {
      item: ITEMS.COMPUTER,
      status: {
        computer: !computer
      }
    }
    await changeStatus(req).then(res => {
      dispatch(setSystem(res.data))
    })

  }
  const handleOperateWindow = async () => {
    const req = {
      item: ITEMS.WINDOW,
      status: {
        window: !window
      }
    }
    await changeStatus(req).then(res => {
      dispatch(setSystem(res.data))
    })
  }
  const handleOperateCurtain = async () => {
    const req = {
      item: ITEMS.CURTAIN,
      status: {
        curtain: !curtain
      }
    }
    await changeStatus(req).then(res => {
      dispatch(setSystem(res.data))
    })
  }

  return (
    <div style={{ minWidth: 400, display: 'flex', padding: 10, gap: 6, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
      {/* 电脑 */}
      <div onClick={handleOperatePC} className="hoverStyle" style={{ padding: 10, borderRadius: 12, display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: COLORS.white }}>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          {computer && <img src={ComputerOn} style={{ width: 30, height: 30 }} />}
          {!computer && <img src={ComputerOff} style={{ width: 30, height: 30 }} />}
        </div>
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column', color: COLORS.commentText }}>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>PC</div>
          {computer ? <div>Status: Open</div> : <div>Status: Close</div>}
        </div>
      </div>
      {/* 窗户 */}
      <div onClick={handleOperateWindow} className="hoverStyle" style={{ padding: 10, borderRadius: 12, display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: COLORS.white }}>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          {window && <img src={WindowOn} style={{ width: 30, height: 30 }} />}
          {!window && <img src={WindowOff} style={{ width: 30, height: 30 }} />}
        </div>
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column', color: COLORS.commentText }}>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>Window</div>
          {window ? <div>Status: Open</div> : <div>Status: Close</div>}
        </div>
      </div>
      <div onClick={handleOperateCurtain} className="hoverStyle" style={{ padding: 10, borderRadius: 12, display: 'flex', justifyContent: 'center', flexDirection: 'column', backgroundColor: COLORS.white }}>
        <div style={{ display: 'flex', justifyContent: 'center', }}>
          {curtain && <img src={curtainOn} style={{ width: 30, height: 30 }} />}
          {!curtain && <img src={curtainOff} style={{ width: 30, height: 30 }} />}
        </div>
        <div style={{ fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: "center", flexDirection: 'column', color: COLORS.commentText }}>
          <div style={{ fontSize: 14, fontWeight: 'bold' }}>Curtain</div>
          {curtain ? <div>Status: Open</div> : <div>Status: Close</div>}
        </div>
      </div>
    </div>
  )
}

const Light = () => {
  const { system } = useSelector(state => state.system)
  const { lighting: { leftSide, middle1, middle2, middle3, rightSide } } = system
  const dispatch = useDispatch()
  const handleOpenAll = async () => {
    // await setLight
    const req = {
      item: ITEMS.LIGHT,
      status: {
        lighting: {
          [SPECIFIC_LIGHT.LeftSide]: true,
          [SPECIFIC_LIGHT.Middle1]: true,
          [SPECIFIC_LIGHT.Middle2]: true,
          [SPECIFIC_LIGHT.Middle3]: true,
          [SPECIFIC_LIGHT.RightSide]: true,
        }
      }
    }
    await changeStatus(req).then(res => {
      dispatch(setSystem(res.data))
    })

  }
  const handleCloseAll = async () => {
    const req = {
      item: ITEMS.LIGHT,
      status: {
        lighting: {
          [SPECIFIC_LIGHT.LeftSide]: false,
          [SPECIFIC_LIGHT.Middle1]: false,
          [SPECIFIC_LIGHT.Middle2]: false,
          [SPECIFIC_LIGHT.Middle3]: false,
          [SPECIFIC_LIGHT.RightSide]: false,
        }
      }
    }
    await changeStatus(req).then(res => {
      dispatch(setSystem(res.data))
    })

  }
  return (<div style={{ minWidth: 400, padding: 10, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
        <img src={LightIcon} style={{ height: 40, width: 40 }} />
        <div style={{ fontWeight: 'bold', fontSize: 18 }}>Light</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, }}>
        <div onClick={handleOpenAll} className="hoverStyle" style={{ fontSize: 12, color: COLORS.commentText, padding: 6, borderRadius: 6, backgroundColor: COLORS.white }}>Open All</div>
        <div onClick={handleCloseAll} className="hoverStyle" style={{ fontSize: 12, color: COLORS.commentText, padding: 6, borderRadius: 6, backgroundColor: COLORS.white }}>Close All</div>
      </div>
    </div>
    <div style={{ marginTop: 10, display: 'flex', gap: 10 }}>
      <SpecificLightItem title={"Left Side"} lightID={SPECIFIC_LIGHT.LeftSide} on={leftSide} />
      <SpecificLightItem title={"Middle 1"} lightID={SPECIFIC_LIGHT.Middle1} on={middle1} />
      <SpecificLightItem title={"Middle 2"} lightID={SPECIFIC_LIGHT.Middle2} on={middle2} />
      <SpecificLightItem title={"Middle 3"} lightID={SPECIFIC_LIGHT.Middle3} on={middle3} />
      <SpecificLightItem title={"Right Side"} lightID={SPECIFIC_LIGHT.RightSide} on={rightSide} />
    </div>
  </div>)
}

const SpecificLightItem = ({ title, lightID, on }) => {
  const dispatch = useDispatch()
  const handleOperateLight = async () => {
    // await setLight
    const req = {
      item: ITEMS.LIGHT,
      status: {
        lighting: {
          [lightID]: !on,
        }
      }
    }
    console.log("qingqiule", req);
    await changeStatus(req).then(res => {
      dispatch(setSystem(res.data))
    })

  }
  return (
    <div
      className="hoverStyle"
      onClick={handleOperateLight}
      style={{ padding: 10, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRadius: 12, backgroundColor: COLORS.white }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {on ? <img src={LightIcon} style={{ height: 40, width: 40 }} /> : <img src={LightOffIcon} style={{ height: 40, width: 40 }} />}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', fontSize: 12, color: COLORS.commentText }}>{title}</div>
    </div>
  )
}

const ModeItem = ({ ModeName, modeValue }) => {
  const dispatch = useDispatch()
  const changeRoomMode = async () => {
    await switchMode(modeValue).then(res => {
      dispatch(setSystem(res.data))
    })
  }
  return <div onClick={changeRoomMode} className="hoverStyle" style={{ padding: 10, width: "40%", display: 'flex', justifyContent: 'center', borderRadius: 12, backgroundColor: COLORS.white }}>{ModeName}</div>
}

const AirConditioner = () => {
  const { system } = useSelector(state => state.system)
  const { airConditioner: { temperature, fanSpeed, mode, isOn } } = system
  const [selectedOn, setSelectedOn] = useState(false)
  const dispatch = useDispatch()
  const lowestDegree = 16
  const highestDegree = 30
  const handleAddDegree = async () => {
    const addedDegree = temperature + 1
    if (addedDegree <= highestDegree) {
      const req = {
        item: ITEMS.AC,
        status: {
          [ITEMS.AC]: {
            temperature: addedDegree,
            fanSpeed,
            mode,
            isOn: true
          }
        }
      }
      await changeStatus(req).then(res => {
        if (res.state === 200) {
          dispatch(setSystem(res.data))
        } else {
          message.error("error")
        }
      })
    }
  }
  const handleMinusDegree = async () => {
    const minusDegree = temperature - 1
    if (minusDegree >= lowestDegree) {
      const req = {
        item: ITEMS.AC,
        status: {
          [ITEMS.AC]: {
            temperature: minusDegree,
            fanSpeed,
            mode,
            isOn: true
          }
        }
      }
      await changeStatus(req).then(res => {
        if (res.state === 200) {
          dispatch(setSystem(res.data))
        } else {
          message.error("error")
        }
      })
    }
  }
  const handleSetFanSpeed = async (speed) => {
    const req = {
      item: ITEMS.AC,
      status: {
        [ITEMS.AC]: {
          temperature,
          fanSpeed: speed,
          mode,
          isOn: true
        }
      }
    }
    await changeStatus(req).then(res => {
      res.state === 200 && dispatch(setSystem(res.data))
    })
  }
  const handleSetMode = async (selectedMode) => {
    const req = {
      item: ITEMS.AC,
      status: {
        [ITEMS.AC]: {
          temperature,
          fanSpeed,
          mode: selectedMode,
          isOn: true
        }
      }
    }
    await changeStatus(req).then(res => {
      res.state === 200 && dispatch(setSystem(res.data))
    })
  }
  const handleOnOff = async (isOn) => {
    const req = {
      item: ITEMS.AC,
      status: {
        [ITEMS.AC]: {
          temperature,
          fanSpeed,
          mode,
          isOn
        }
      }
    }
    await changeStatus(req).then(res => {
      res.state === 200 && dispatch(setSystem(res.data))
    })
  }
  return (<div style={{ minWidth: 400, padding: 10, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ flex: 1, display: 'flex', gap: 10, justifyContent: 'flex-start', alignItems: 'center' }}>
        <img src={AC} style={{ height: 40, width: 40 }} />
        <div style={{ fontSize: 18, fontWeight: 'bold', }}>Air Conditioner</div>
      </div>
      {isOn ?
        <Button onClick={() => handleOnOff(false)} type="primary"><PoweroffOutlined /><span style={{ fontWeight: 'bold' }}>On</span></Button>
        :
        <Button onClick={() => handleOnOff(true)}><PoweroffOutlined /><span style={{ fontWeight: 'bold' }}>OFF</span></Button>}
    </div>

    <div style={{ display: 'flex', padding: 10, borderRadius: 12, backgroundColor: COLORS.white, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
      <div className="hoverStyle" onClick={() => { handleMinusDegree() }} style={{ display: 'flex', alignItems: 'center' }}><LeftOutlined style={{ fontWeight: 800 }} /></div>
      <div style={{ marginTop: 10, margin: '10px 30px', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', }}>
          <div style={{ fontSize: 26 }}>{temperature}</div>
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
          <Segmented value={fanSpeed} options={[FAN_SPEED.LOW, FAN_SPEED.MEDIUM, FAN_SPEED.HIGH]} onChange={handleSetFanSpeed} />
        </div>
      </div>
      <div style={{ flex: 1, padding: 10, borderRadius: 12, backgroundColor: COLORS.white }}>
        <div style={{ flex: 1, display: 'flex', gap: 6, justifyContent: 'flex-start', alignItems: 'center' }}>
          <AppstoreTwoTone style={{ fontSize: 26 }} />
          <div style={{ fontSize: 18 }}>Mode</div>
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', marginTop: 10 }}>
          <Segmented value={mode} options={[AC_MODE.COOL, AC_MODE.HOT]} onChange={handleSetMode} />
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
        <ModeItem ModeName={MODE.Class + " mode"} modeValue={MODE.Class} />
        <ModeItem ModeName={MODE.Meeting + " mode"} modeValue={MODE.Meeting} />
        <ModeItem ModeName={MODE.Rest + " mode"} modeValue={MODE.Rest} />
        {/* <ModeItem ModeName={"Lecture Mode"} /> */}
      </div>
    </div>)
}

const SettingButtons = () => {
  const dispatch = useDispatch()
  const withdraw = async () => {
    await getPreStatus().then(res => {
      res.state === 200 && dispatch(setSystem(res.data))
    })
  }
  return <div className="hoverStyle" onClick={withdraw} style={{ minWidth: 400, display: 'flex', justifyContent: 'center', padding: 10, gap: 6, borderRadius: 14, backgroundColor: COLORS.backgroundGray, margin: 10 }}>
    <div style={{}}>Withdraw</div>
  </div>
}

export default App
