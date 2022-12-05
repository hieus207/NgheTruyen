import { useState, useEffect } from 'react';

const useAudio = url => {
 
  const [player,setPlayer] = useState({playing: false, source: new Audio(url), url: url})

  useEffect(()=>{
    console.log(player)
    if(player.playing)
      player.source.play();
    else
      player.source.pause();
  },[player])

  useEffect(() => {

    player.source.addEventListener('ended', () => {
      setPlayer({...player, playing: false})
    })
    return () => {
        player.source.removeEventListener('ended', () => {
          setPlayer({...player, playing: false})
        })
    }
  }, [player])

  const toggle = ()=>{
    setPlayer({...player, playing: !player.playing})
  }

  const changeAudio = (url) =>{
      player.source.pause();
      setPlayer({playing: true, source: new Audio(url), url: url})
  }

  return [player, toggle, changeAudio]
}

export default useAudio