import clsx from "clsx"
import {  useEffect, useState } from "react"
import ProgressBar from "../helpers/ProgressBar"
import styles from "./audio.module.scss"
import {IoPlay, IoPause, IoPlayBack, IoPlayForward, IoPlaySkipBack, IoPlaySkipForwardSharp, IoCaretDownOutline} from "react-icons/io5"
import {BsFillCaretUpFill} from "react-icons/bs"
import { useDispatch, useSelector } from "react-redux"
import { audioState } from "../../redux/selectors"
import useAudio from "../../hooks/useAudio"
import delay from "../utils/delay"
import { audioSlice } from "../../redux/reducers/audioSlice"
import secondsToTimeData from "../utils/secondsToTimeData"
import { CHAPTER } from "../../constants"

export default function AudioPlayerBottom(){
    const [currentVal,setCurrentVal] = useState(0)
    const [collapse, setCollapse] = useState(true)

    const audioEndCall = async()=>{
        setCurrentVal(100)
        await delay(500)
        setCurrentVal(0)
        let indexChap = _urls.findIndex(_url => _url.id === player.id)
        if(indexChap < _urls.length-1){
          playChapter(indexChap+1)
        }else{
          controller.setCurrentTimeAudio(0)
          dispatch(audioSlice.actions.pause())
          
        }
    }

    const dispatch = useDispatch()
    const audio = useSelector(audioState)
    const _urls = audio.chapter.map((url, index)=>({url: url, id: index}))
    const [player, controller, loadedMetaData ] = useAudio("", audioEndCall)
    const [storyId,setStoryId] = useState(audio.id)
    const [dragged, setDragged] = useState({isDragged:false, coor:0})
    const handlePause = ()=>{
        dispatch(audioSlice.actions.pause())
    }
    
    const handlePlay = ()=>{
        dispatch(audioSlice.actions.resume())
    }
    
    const playChapter = (chapterId) => {
        dispatch(audioSlice.actions.play({...audio, chapterId, played: false}))
    }
    const handleChangeChapter = (chapterId) => {
        if(player.id !== chapterId){
            playChapter(chapterId)
        }
    }

    
    const setTimeAudio = (currentTime) => {
        controller.setCurrentTimeAudio(currentTime)
        setCurrentVal(controller.getTimePlayedPercent())
    }

    const playBackAudio = (e, seconds=10)=>{
        setTimeAudio(controller.getCurrentTimeAudio() > seconds ? controller.getCurrentTimeAudio() - seconds : 0)
    }

    const playForwadAudio = (e, seconds=10)=>{
        
        setTimeAudio(controller.getCurrentTimeAudio() + seconds > controller.getDurationAudio() ? controller.getDurationAudio() : controller.getCurrentTimeAudio() + seconds)
    }

    const skipBackAudio = (e) => {
          if(player.id>0){
            playChapter(player.id-1)
        }
    }

    const skipFowardAudio = (e) => {
        if(player.id<_urls.length-1){
            playChapter(player.id+1)
        }
    }

    const setTimePercentAudio = (currentTimePercent) => {
        let currentTime = controller.getDurationAudio() * currentTimePercent/100
        controller.setCurrentTimeAudio(currentTime)
        setCurrentVal(currentTimePercent)
    }

    const handleMouseUp = (e) => {
        e.preventDefault();
        setDragged({isDragged: true,coor: e.clientY})

    }

    const handleMouseOut = (e) => {
        e.preventDefault();
        if(dragged.isDragged){

            if(e.clientY+5<dragged.coor){   
                setCollapse(false)
            }
            else{
                if(e.clientY>dragged.coor+5){
                    if(!collapse){
                        setCollapse(true)
                    }
                    else{
                        dispatch(audioSlice.actions.close())
                    }
                }
            }
        }
        setDragged({isDragged: false,coor: 0})
    }

    useEffect(()=>{
        if(!audio.played){
            if(storyId !== audio.id){
                setStoryId(audio.id)
                controller.changeAudio(_urls[audio.chapterId]) 
            }
            else{
                if(audio.chapterId !== player.id){
                    controller.changeAudio(_urls[audio.chapterId]) 
                }
                else{
                    if(!player.playing){
                        controller.toggle()
                    }
                }
            }
            dispatch(audioSlice.actions.played())
        }else{
            if(!audio.playing){
                if(player.playing){
                    controller.toggle()
                }
            }
        }

    },[audio, _urls, controller, dispatch, player.id, storyId, player.playing])

    useEffect(()=>{
        let loop = setInterval(()=>{
          if(player.playing){
            setCurrentVal((controller.getCurrentTimeAudio() * 100/controller.getDurationAudio()))
          }
        },1000)
        return (
          ()=>clearInterval(loop)
        )
      },[player, controller])

    return(
        <div className={clsx(styles.wrapper,{
            [styles.collapseIn]:collapse,
            [styles.collapseOut]:!collapse,
            [styles.aniPlaying]: player.playing,
            [styles.aniPause] : !player.playing,
            [styles.close]: audio.close
        })} onMouseDown={handleMouseUp} onMouseUp={handleMouseOut} onMouseLeave={handleMouseOut}>
            <ProgressBar currentVal={currentVal} onClickBar={setTimePercentAudio} />
       
            <div className={clsx(styles.timeAudioLeft)}>{loadedMetaData?secondsToTimeData(Math.ceil(controller.getCurrentTimeAudio())):"00:00"}</div>
            <div className={clsx(styles.timeAudioRight)}>{loadedMetaData?secondsToTimeData(Math.ceil(controller.getDurationAudio())):"00:00"}</div>
           
            <div className={clsx(styles.controller)}>
                <div className={clsx(styles.btn,{
                        [styles.btnDisabled] : audio.chapterId===0
                    })} onClick={skipBackAudio}>
                    <IoPlaySkipBack className={clsx("v-m")} />
                </div>
                <div className={clsx(styles.btn)} onClick={playBackAudio}>
                    <IoPlayBack className="v-m"/>
                </div>
                <div className={clsx(styles.playButton)} onClick={audio.playing?handlePause:handlePlay}>
                    {audio.playing?<IoPause/>:<IoPlay/>}
                </div>
                <div className={clsx(styles.btn)} onClick={playForwadAudio}>
                    <IoPlayForward className="v-m" />
                </div>
                <div className={clsx(styles.btn,{
                        [styles.btnDisabled] : audio.chapterId === audio.chapter.length-1
                    })} onClick={skipFowardAudio}>
                    <IoPlaySkipForwardSharp className={clsx("v-m")}/>
                </div>
            </div>
            <div className={clsx(styles.Collapse)}>
                    {collapse?<BsFillCaretUpFill className="v-m" onClick={()=>setCollapse(!collapse)}/>:<IoCaretDownOutline className="v-m" onClick={()=>setCollapse(!collapse)}/>}
            </div>
            
            <div className={clsx(styles.chapterWrapper)}>
                {audio.chapter.length > 0 && audio.chapter.map((data,index) => 
                    <div key={"tap"+index} className={clsx(styles.chapterItem,{
                        [styles.chapterActive]: audio.chapterId === index
                    })} onClick={()=>handleChangeChapter(index)}>
                        {CHAPTER} {index+1}
                    </div>
                )}
            </div>
            
            
        </div>
    )
}