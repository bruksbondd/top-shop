import styles from './P.module.css'
import cn from 'classnames'
import { Pprops } from './P.props'

export const P = ({
  size = 'm',
  children,
  className,
  ...props
}: Pprops): JSX.Element => {
  return (
    <p
      className={cn(styles.p, className, {
        [styles.s]: size == 's',
        [styles.m]: size == 'm',
        [styles.l]: size == 'l',
      })}
      {...props}
    >
      {children}
    </p>
  )
}
