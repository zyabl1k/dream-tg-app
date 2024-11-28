import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgCloseIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    {...props}
    width={14}
    height={14}
    viewBox="0 0 14 14"
    fill="none"
  >
    <path
      d="M1 13L13 1M13 13L1 0.999999"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgCloseIcon)
const Memo = memo(ForwardRef)

export default Memo
