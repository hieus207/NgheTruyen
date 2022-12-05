import React, { useState } from 'react'
import useAudio from '../../../hooks/useAudio'

const MultiPlayer = ({ urls }) => {
  const [player, toggle, changeAudio] = useAudio(urls[0])

  const handleAudioChange = (e) => {
      if(player.url!==e.target.attributes.url){
        changeAudio(e.target.attributes.url.value)
      }
  }
  return (
    <div>
      <button onClick={toggle}>{player.playing?"Pause":"Play"}</button>
      {urls.map((url,index)=>{
        return(
          <div key={"test"+index} onClick={handleAudioChange} url={url}>{"bai "+index}</div>
        )
      })}
    </div>
  )
}

export default MultiPlayer