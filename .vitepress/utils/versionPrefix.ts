let version = 'master'

export function setVersionPrefix(
  children: { text: string; link: string }[]
) {
  return children.map((child) => ({
    text: child.text,
    link: `/${version}/${child.link}`
  }))
}
