export const FadeInOutBottom = {
  visible: {
    opacity: 1,
    y: 0,
  },
  invisible: {
    opacity: 0,
    y: -20,
  },
}

export const FadeInOut = {
  visible: {
    opacity: 1,
  },
  invisible: {
    opacity: 0,
  },
}

export const containerVariants = {
  collapsed: { opacity: 0 },
  expanded: { opacity: 1 },
}

export const CollapseDrawerCard = {
  collapsed: {
    width: 287,
    height: 360,
    top: '0',
    left: 'calc(50% - 143.5px)',
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
    scale: [1, 0.6, 1],
  },
  expanded: {
    width: '100vw',
    height: '97vh',
    top: '3vh',
    left: '0',
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
    scale: [1],
  },
}
