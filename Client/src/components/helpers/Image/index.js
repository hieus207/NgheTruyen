import clsx from "clsx"
import styles from "./image.module.scss"

export default function Image({src="", alt="", largest = false, large = false, normal = false, small = false, thumb = false}){
    return(
        <img className={clsx({
            [styles.largest]:largest,
            [styles.large]:large,
            [styles.normal]:normal,
            [styles.small]:small,
            [styles.thumb]:thumb,
        })} src={src} alt={alt}/>
    )
}
