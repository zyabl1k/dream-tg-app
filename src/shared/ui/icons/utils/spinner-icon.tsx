import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgSpinnerIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={45}
    height={48}
    {...props}
    ref={ref}
    viewBox="0 0 45 48"
    fill="none"
  >
    <path
      d="M36.4562 42.7375C32.7503 45.2011 28.397 46.5104 23.947 46.4999C19.4969 46.4894 15.1499 45.1596 11.4556 42.6786C7.76135 40.1975 4.88575 36.6767 3.19248 32.5614C1.4992 28.446 1.06429 23.921 1.94274 19.5585C2.82119 15.196 4.97355 11.1919 8.12764 8.05264C11.2817 4.91339 15.2959 2.77992 19.6625 1.92204C24.0291 1.06417 28.552 1.5204 32.6593 3.23306C36.7667 4.94572 40.2739 7.83787 42.7375 11.5438"
      stroke="#707579"
      stroke-width="3"
      stroke-linecap="round"
    />
  </svg>
)
const ForwardRef = forwardRef(SvgSpinnerIcon)
const Memo = memo(ForwardRef)

export default Memo
