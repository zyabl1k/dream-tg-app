import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgCgSpinnerIcon = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    fill={'currentColor'}
    height={20}
    ref={ref}
    stroke={'currentColor'}
    strokeWidth={0}
    viewBox={'0 0 24 24'}
    width={20}
    xmlns={'http://www.w3.org/2000/svg'}
    {...props}
  >
    <path
      clipRule={'evenodd'}
      d={
        'M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14m0 3c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10'
      }
      fillRule={'evenodd'}
      opacity={0.2}
      stroke={'none'}
    />
    <path d={'M2 12C2 6.477 6.477 2 12 2v3a7 7 0 0 0-7 7z'} stroke={'none'} />
  </svg>
)
const ForwardRef = forwardRef(SvgCgSpinnerIcon)
const Memo = memo(ForwardRef)

export default Memo
