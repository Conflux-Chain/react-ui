import React, { ReactNode, useMemo } from 'react'
import withDefaults from '../utils/with-defaults'
import { NormalTypes } from '../utils/prop-types'
import TextChild from './child'

interface Props extends Omit<React.HTMLAttributes<any>, keyof Props> {
  h1?: boolean
  h2?: boolean
  h3?: boolean
  h4?: boolean
  h5?: boolean
  h6?: boolean
  p?: boolean
  b?: boolean
  small?: boolean
  i?: boolean
  span?: boolean
  del?: boolean
  em?: boolean
  blockquote?: boolean
  className?: string
  size?: string | number
  type?: NormalTypes
}

const defaultProps = {
  h1: false,
  h2: false,
  h3: false,
  h4: false,
  h5: false,
  h6: false,
  p: false,
  b: false,
  small: false,
  i: false,
  span: false,
  del: false,
  em: false,
  blockquote: false,
  className: '',
  type: 'default' as NormalTypes,
}

type ElementMap = { [key in keyof JSX.IntrinsicElements]?: boolean }

export type TextProps = Props

type TextRenderableElements = Array<keyof JSX.IntrinsicElements>

const getModifierChild = (
  tags: TextRenderableElements,
  children: ReactNode,
  size?: string | number,
) => {
  if (!tags.length) return children
  const nextTag = tags.slice(1, tags.length)
  return (
    <TextChild tag={tags[0]} size={size}>
      {getModifierChild(nextTag, children, size)}
    </TextChild>
  )
}

const Text: React.FC<React.PropsWithChildren<TextProps>> = ({
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  b,
  small,
  i,
  span,
  del,
  em,
  blockquote,
  size,
  children,
  className,
  ...props
}: TextProps & typeof defaultProps) => {
  const elements: ElementMap = { h1, h2, h3, h4, h5, h6, p, blockquote }
  const inlineElements: ElementMap = { span, small, b, em, i, del }
  const names = Object.keys(elements).filter(
    (name: keyof JSX.IntrinsicElements) => elements[name],
  ) as TextRenderableElements
  const inlineNames = Object.keys(inlineElements).filter(
    (name: keyof JSX.IntrinsicElements) => inlineElements[name],
  ) as TextRenderableElements

  /**
   *  Render element "p" only if no element is found.
   *  If there is only one modifier, just rendered one modifier element
   *  e.g.
   *    <Text /> => <p />
   *    <Text em /> => <em />
   *    <Text p em /> => <p><em>children</em></p>
   *
   */

  const tag = useMemo(() => {
    if (names[0]) return names[0]
    if (inlineNames[0]) return inlineNames[0]
    return 'p' as keyof JSX.IntrinsicElements
  }, [names, inlineNames])

  const renderableChildElements = inlineNames.filter(
    (name: keyof JSX.IntrinsicElements) => name !== tag,
  ) as TextRenderableElements

  const modifers = useMemo(() => {
    if (!renderableChildElements.length) return children
    return getModifierChild(renderableChildElements, children, size)
  }, [renderableChildElements, children, size])

  return (
    <TextChild className={`text ${className}`} tag={tag} size={size} {...props}>
      {modifers}
    </TextChild>
  )
}

const MemoText = React.memo(Text)

export default withDefaults(MemoText, defaultProps)
