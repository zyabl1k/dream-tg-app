import { Ref, forwardRef, memo, type SVGProps } from 'react'

const SvgStartIcon = (
  props: SVGProps<SVGSVGElement>,
  ref: Ref<SVGSVGElement>
) => (
  <svg
    ref={ref}
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 28 28"
    fill="none"
  >
    <path
      opacity="0.1"
      d="M7.28637 25.5752C7.09826 26.2639 7.25082 26.8325 7.94195 27.1633C8.63309 27.4942 9.17167 27.2565 9.59016 26.6781C15.5893 18.4354 15.6144 18.235 25.9423 20.9139C26.631 21.102 27.2572 20.977 27.588 20.2859C27.9189 19.5948 27.6512 18.971 27.0728 18.5525C18.5372 12.13 18.9078 12.095 21.3086 2.20038C21.4967 1.5117 21.3441 0.943099 20.653 0.612226C19.9619 0.281353 19.4233 0.519079 19.0048 1.09747C12.8028 9.17233 13.0381 9.56815 2.65265 6.86167C1.96397 6.67356 1.3102 6.85614 0.979327 7.54728C0.648454 8.23841 0.943774 8.80456 1.52217 9.22305C10.1154 15.6732 9.88745 15.7057 7.28637 25.5752Z"
      fill="black"
    />
  </svg>
)

const ForwardRef = forwardRef(SvgStartIcon)
const Memo = memo(ForwardRef)

export default Memo
