import { useState, useEffect } from 'react';

const useAudio = (url, callbackEnd) => {
 
  const [player,setPlayer] = useState({id:0, playing: false, source: new Audio(url), url: url})
  const [loadedMetaData, setLoadedMetaDa] = useState(false)

  useEffect(()=>{
    if(player.playing)
      player.source.play();
    else{
      player.source.pause();
    }

    player.source.onloadedmetadata = ()=>{
      setLoadedMetaDa(true)
    }

    player.source.addEventListener('ended', () => {
      callbackEnd()
      setPlayer({...player, playing: false})
    })
    return () => {
        player.source.removeEventListener('ended', () => {
          callbackEnd()
          setPlayer({...player, playing: false})
        })
        // Destroyplayer
        player.source.pause();
    }
  },[player, callbackEnd])

  const controller = {
    setCurrentTimeAudio(currentTime){
      player.source.currentTime = currentTime
    },
    setVolumeAudio(volume){
      player.source.volume = volume
    }
    ,
    getCurrentTimeAudio(){
      return player.source.currentTime
    },
    getDurationAudio(){
      return player.source.duration
    },
    getTimePlayedPercent(){
      return player.source.currentTime*100/player.source.duration
    }
    ,
    toggle(){
      setPlayer({...player, playing: !player.playing})
    },
    changeAudio(audio){
      player.source.pause();
      setLoadedMetaDa(false);
      setPlayer({playing: true, source: new Audio(audio.url), url: audio.url, id: audio.id})
    }
  }

  return [player, controller, loadedMetaData]
}

export default useAudio