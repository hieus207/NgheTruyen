import clsx from 'clsx'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import useAudio from '../../../hooks/useAudio'
import delay from '../../utils/delay'
import ProgressBar from '../ProgressBar'
import styles from "./audioPlayer.module.scss"
import {IoPlay, IoPause, IoPlayBack, IoPlayForward} from "react-icons/io5"
import secondsToTimeData from '../../utils/secondsToTimeData'
import ItemAudioPlayer from './ItemAudioPlayer'

const AudioPlayer = (({ urls, manager = false, onDelete = null, onUpdate = null }) => {

  const [currentVal,setCurrentVal] = useState(0)

  const audioEndCall = async()=>{
    setCurrentVal(100)
    await delay(500)
    setCurrentVal(0)
    let indexChap = _urls.findIndex(_url => _url.id == player.id)
    if(indexChap < _urls.length-1){
      controller.changeAudio(_urls[indexChap+1])
    }else{
      controller.setCurrentTimeAudio(0)
    }
  }

  const [_urls] = useState(urls.map((url, index)=>({url: url, id: index})))

  const [player, controller, loadedMetaData] = useAudio(_urls[0].url, audioEndCall) //useState

  
  const handleAudioChange = (e) => {
    if(e.target.attributes._id && (player.id !== e.target.attributes._id.value)){
      setCurrentVal(0)
      controller.changeAudio({url: e.target.attributes.url.value, id: e.target.attributes._id.value})
    }
  }

  const setTimePercentAudio = (currentTimePercent) => {
    let currentTime = controller.getDurationAudio() * currentTimePercent/100
    controller.setCurrentTimeAudio(currentTime)
    setCurrentVal(currentTimePercent)
  }

  const setTimeAudio = (currentTime) => {
    controller.setCurrentTimeAudio(currentTime)
    setCurrentVal(controller.getTimePlayedPercent())
  }

  const playBackAudio = (seconds=10)=>{
    setTimeAudio(controller.getCurrentTimeAudio() > seconds ? controller.getCurrentTimeAudio() - seconds : 0)
  }

  const playForwadAudio = (seconds=10)=>{
    setTimeAudio(controller.getCurrentTimeAudio() + seconds > controller.getDurationAudio() ? controller.getDurationAudio() : controller.getCurrentTimeAudio() + seconds)
  }

  
  useEffect(()=>{
    let loop = setInterval(()=>{
      if(player.playing){
        setCurrentVal((controller.getCurrentTimeAudio() * 100/controller.getDurationAudio()))
      }
    },1000)
    return (
      ()=>clearInterval(loop)
    )
  },[player])

  const renderItem = useCallback(()=>{
    return _urls.map((_url,index)=>{
      return <ItemAudioPlayer key={index} isActive={player.id == _url.id} onClick={handleAudioChange} url={_url.url} id={_url.id} index={index} manager={manager} onUpdate={onUpdate} onDelete={onDelete}/>
    })
  },[player.id])
  

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.playerWrapper)}>
        <ProgressBar currentVal={currentVal} onClickBar={setTimePercentAudio} />

        <div className={clsx(styles.controls)}>
          {
            <div className={clsx(styles.timeAudio)}>
              <div>{loadedMetaData?secondsToTimeData(Math.ceil(controller.getCurrentTimeAudio())):"00:00"}</div>
              <div>{loadedMetaData?secondsToTimeData(Math.ceil(controller.getDurationAudio())):"00:00"}</div>
            </div>
          }
          <button className='m-left-5' onClick={()=>playBackAudio(10)}><IoPlayBack/></button>
          <button className='m-left-5' onClick={controller.toggle}>{player.playing?<IoPause/> : <IoPlay/>}</button>
          <button className='m-left-5' onClick={()=>playForwadAudio(10)}><IoPlayForward/></button>
          
        </div>
        <div className={clsx(styles.itemWrapper)}>
        {_urls && renderItem()}
        </div>
        
    
      </div>
      <div className={clsx(styles.controls)}>
        <button onClick={()=>playBackAudio(120)}>-2m</button>
        <button onClick={()=>playBackAudio(60)}>-1m</button>
        <button onClick={()=>playBackAudio(30)}>-30s</button>
        <button onClick={()=>playBackAudio(10)}>-10s</button>
        &nbsp;
        &nbsp;
        <button onClick={()=>playForwadAudio(10)}>+10s</button>
        <button onClick={()=>playForwadAudio(30)}>+30s</button>
        <button onClick={()=>playForwadAudio(60)}>+1m</button>
        <button onClick={()=>playForwadAudio(120)}>+2m</button>
        <button>Tốc độ phát</button>
      </div>
    </div>
  )
})

export default AudioPlayer