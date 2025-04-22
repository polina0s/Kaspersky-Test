export const Highlights = (text: string): React.ReactNode[] => {
  const highlight: React.ReactNode[] = []
  const regex = /<kw>(.*?)<\/kw>/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    const [fullMatch, keyword] = match
    const start = match.index

    if (start > lastIndex) {
      highlight.push(text.slice(lastIndex, start))
    }

    highlight.push(
      <span key={start} className="highlight">
        {keyword}
      </span>,
    )

    lastIndex = start + fullMatch.length
  }

  if (lastIndex < text.length) {
    highlight.push(text.slice(lastIndex))
  }

  return highlight
}
