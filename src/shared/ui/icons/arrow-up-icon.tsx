import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgArrowUpIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    width={12}
    ref={ref}
    {...props}
    height={8}
    viewBox="0 0 12 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 6.5L6 1.5L1 6.5"
      stroke="white"
      stroke-width="1.66667"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgArrowUpIcon)
const Memo = memo(ForwardRef)

export default Memo
