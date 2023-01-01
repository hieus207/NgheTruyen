import clsx from 'clsx'
import React, { useEffect, useState } from 'react'
import styles from "./audioPlayer.module.scss"

const ItemAudioPlayer = React.memo(({isActive, onClick, url, id, index, manager=false, onUpdate=null, onDelete=null}) => {

    return(
        <div 
        className={clsx(styles.chapterItem,"j-between","d-flex",{
        //   [styles.activeItem]:player.id == _url.id
          [styles.activeItem]:isActive
        })} 
        
        // onClick={handleAudioChange} 
        onClick={onClick} 
        // url={_url.url} 
        url={url} 
        // _id={_url.id}>
        _id={id}>
        
        {"tập "+ (index+1)}
        {manager&&
        <span>
        <button onClick={()=>onUpdate(index)}>Sửa</button>
        <button onClick={()=>onDelete(index)}>Xoá</button>
        </span>
        }

      </div>
    )
})

export default ItemAudioPlayer
