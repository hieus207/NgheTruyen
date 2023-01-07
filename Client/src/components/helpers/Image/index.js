import clsx from "clsx"
import styles from "./image.module.scss"

export default function Image({src="", alt="", largest = false, large = false, normal = false,regular =false,  small = false, thumb = false, thumbAvatar = false,logo = false, logoSmall = false,topRound = false, className=""}){
    return(
        <img className={clsx({
            [styles.largest]:largest,
            [styles.large]:large,
            [styles.normal]:normal,
            [styles.regular]:regular,
            [styles.small]:small,
            [styles.thumb]:thumb,
            [styles.thumbAvatar]:thumbAvatar,
            [styles.logo]:logo,
            [styles.topRound]: topRound,
            [styles.logoSmall]: logoSmall,
            [className] : true
        })} src={src} alt={alt}/>
    )
}
