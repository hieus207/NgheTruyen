import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import useAudio from '../../../hooks/useAudio'
import delay from '../../utils/delay'
import ProgressBar from '../ProgressBar'
import styles from "./audioPlayer.module.scss"
import {IoPlay, IoPause, IoPlayBack, IoPlayForward} from "react-icons/io5"
import secondsToTimeData from '../../utils/secondsToTimeData'

const AudioPlayer = ({ urls, manager = false, onDelete = null, onUpdate = null }) => {
  
  const [currentVal,setCurrentVal] = useState(0)

  const _urls = urls.map((url, index)=>{return {url: url, id: index}})

  const audioEnd = async()=>{
    setCurrentVal(100)
    await delay(500)
    setCurrentVal(0)
    let indexChap = _urls.findIndex(_url => _url.id == player.id)
    if(indexChap < _urls.length-1){
      console.log("goi change AUdio từ audio end")
      controller.changeAudio(_urls[indexChap+1])
    }else{
      controller.setCurrentTimeAudio(0)
    }
  }

  const [player, controller, loadedMetaData] = useAudio(_urls[0].url, audioEnd)

  const handleAudioChange = (e) => {
    if(player.id !== e.target.attributes._id.value){
      setCurrentVal(0)
      console.log("goi handlechange AUdio")
      controller.changeAudio({url: e.target.attributes.url.value, id: e.target.attributes._id.value})
    }
  }

  useEffect(()=>{
    let loop = setInterval(()=>{
      if(player.playing){
        setCurrentVal((controller.getCurrentTimeAudio() * 100/controller.getDurationAudio()))
      }
    },1000)
    return (()=>clearInterval(loop))
  
  },[player])

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

  return (
    <div className={clsx(styles.wrapper)}>
      <div className={clsx(styles.playerWrapper)}>
        <ProgressBar currentVal={currentVal} onClickBar={setTimePercentAudio} />
        <div className={clsx(styles.controls)}>
          {
            loadedMetaData &&
            <div className={clsx(styles.timeAudio)}>
              <div>{secondsToTimeData(Math.ceil(controller.getCurrentTimeAudio()))}</div>
              <div>{secondsToTimeData(Math.ceil(controller.getDurationAudio()))}</div>
            </div>
          }
          <button className='m-left-5' onClick={()=>playBackAudio(10)}><IoPlayBack/></button>
          <button className='m-left-5' onClick={controller.toggle}>{player.playing?<IoPause/> : <IoPlay/>}</button>
          <button className='m-left-5' onClick={()=>playForwadAudio(10)}><IoPlayForward/></button>
          
        </div>

        {_urls.map((_url,index)=>{
          return(
            <div 
              className={clsx(styles.chapterItem,"j-between","d-flex",{
                [styles.activeItem]:player.id == _url.id
              })} 
              key={"test "+index} 
              onClick={handleAudioChange} 
              url={_url.url} 
              _id={_url.id}>

                 {"tập "+ (index+1)}
                {manager&&
                  <span>
                  <button onClick={onUpdate}>Sửa</button>
                  <button onClick={onDelete}>Xoá</button>
                  </span>

                }
            </div>
          )
        })}
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
}

export default AudioPlayer