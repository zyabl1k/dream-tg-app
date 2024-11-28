import type { SVGProps } from 'react'
import { Ref, forwardRef, memo } from 'react'
const SvgDragPilIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    {...props}
    ref={ref}
    xmlns="http://www.w3.org/2000/svg"
    width={36}
    height={4}
    viewBox="0 0 36 4"
    fill="none"
  >
    <g filter="url(#filter0_b_198_3344)">
      <rect width={36} height={4} rx="2" fill="black" fill-opacity="0.15" />
    </g>
    <defs>
      <filter
        id="filter0_b_198_3344"
        x="-54"
        y="-54"
        width="144"
        height="112"
        filterUnits="userSpaceOnUse"
        color-interpolation-filters="sRGB"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feGaussianBlur in="BackgroundImageFix" stdDeviation="27" />
        <feComposite
          in2="SourceAlpha"
          operator="in"
          result="effect1_backgroundBlur_198_3344"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_backgroundBlur_198_3344"
          result="shape"
        />
      </filter>
    </defs>
  </svg>
)
const ForwardRef = forwardRef(SvgDragPilIcon)
const Memo = memo(ForwardRef)

export default Memo
