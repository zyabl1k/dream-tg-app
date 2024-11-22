interface Paragraph {
  title: string | null
  text: string
  index: number
}

export const parseDescription = (description: string): Paragraph[] => {
  return description
    .split('\n')
    .reduce<Paragraph[]>((acc, paragraph, index) => {
      const match = paragraph.match(/^(.*?):/)
      const title = match ? match[1] : null
      const textWithoutTitle = title
        ? paragraph.replace(/^(.*?):\s*/, '')
        : paragraph

      if (title) {
        acc.push({ title, text: textWithoutTitle, index })
      } else if (acc.length > 0) {
        acc[acc.length - 1].text += ` ${textWithoutTitle}`
      } else {
        acc.push({ title: null, text: textWithoutTitle, index })
      }
      return acc
    }, [])
}
