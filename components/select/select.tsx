import React, { useEffect, useMemo, useRef, useState } from 'react'
import { NormalSizes, SelectTypes } from '../utils/prop-types'
import useTheme from '../styles/use-theme'
import useClickAway from '../utils/use-click-away'
import useCurrentState from '../utils/use-current-state'
import { pickChildByProps } from '../utils/collections'
import SelectIcon from './select-icon'
import SelectOption from './select-option'
import SelectDropdown from './select-dropdown'
import SelectMultipleValue from './select-multiple-value'
import Grid from '../grid'
import { SelectContext, SelectConfig } from './select-context'
import { getSizes, getSelectColors } from './styles'
import Ellipsis from '../shared/ellipsis'

interface Props {
  disabled?: boolean
  size?: NormalSizes
  value?: string | string[]
  initialValue?: string | string[]
  placeholder?: React.ReactNode | string
  icon?: React.ComponentType
  onChange?: (value: string | string[]) => void
  pure?: boolean
  multiple?: boolean
  className?: string
  width?: string
  variant?: SelectTypes
  dropdownClassName?: string
  dropdownStyle?: object
  disableMatchWidth?: boolean
}

const defaultProps = {
  disabled: false,
  size: 'medium' as NormalSizes,
  icon: SelectIcon as React.ComponentType,
  pure: false,
  multiple: false,
  width: 'initial',
  className: '',
  variant: 'line',
  disableMatchWidth: false,
}

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof Props>
export type SelectProps = Props & typeof defaultProps & NativeAttrs

const Select: React.FC<React.PropsWithChildren<SelectProps>> = ({
  children,
  size,
  disabled,
  initialValue: init,
  value: customValue,
  icon: Icon,
  onChange,
  pure,
  multiple,
  placeholder,
  width,
  variant,
  className,
  dropdownClassName,
  dropdownStyle,
  disableMatchWidth,
  ...props
}) => {
  const theme = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState<boolean>(false)
  const [value, setValue, valueRef] = useCurrentState<string | string[] | undefined>(() => {
    if (!multiple) return init
    if (Array.isArray(init)) return init
    return typeof init === 'undefined' ? [] : [init]
  })
  const isEmpty = useMemo(() => {
    if (!Array.isArray(value)) return !value
    return value.length === 0
  }, [value])
  const sizes = useMemo(() => getSizes(theme, size), [theme, size])

  const colors = useMemo(() => {
    return getSelectColors(disabled, theme.palette, variant)
  }, [disabled, theme.palette, variant])

  const updateVisible = (next: boolean) => setVisible(next)
  const updateValue = (next: string) => {
    setValue(last => {
      if (!Array.isArray(last)) return next
      if (!last.includes(next)) return [...last, next]
      return last.filter(item => item !== next)
    })
    onChange && onChange(valueRef.current as string | string[])
    if (!multiple) {
      setVisible(false)
    }
  }

  const initialValue: SelectConfig = useMemo(
    () => ({
      value,
      variant,
      visible,
      updateValue,
      updateVisible,
      size,
      ref,
      disableAll: disabled,
    }),
    [visible, size, disabled, ref, value, multiple, variant],
  )

  const clickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
    event.nativeEvent.stopImmediatePropagation()
    event.preventDefault()
    if (disabled) return
    setVisible(!visible)
  }

  useClickAway(ref, () => setVisible(false))
  useEffect(() => {
    if (customValue === undefined) return
    setValue(customValue)
  }, [customValue])

  const selectedChild = useMemo(() => {
    const [, optionChildren] = pickChildByProps(children, 'value', value)
    return React.Children.map(optionChildren, child => {
      if (!React.isValidElement(child)) return null
      const el = React.cloneElement(child, { preventAllEvents: true })
      if (!multiple) return el
      return (
        <SelectMultipleValue size={sizes.fontSize} disabled={disabled}>
          {el}
        </SelectMultipleValue>
      )
    })
  }, [value, children, multiple])

  return (
    <SelectContext.Provider value={initialValue}>
      <div
        className={`select ${multiple ? 'multiple' : ''} ${className}`}
        ref={ref}
        onClick={clickHandler}
        {...props}>
        {isEmpty && (
          <span className="value placeholder">
            <Ellipsis height={sizes.height}>{placeholder}</Ellipsis>
          </span>
        )}
        {value && !multiple && <span className="value">{selectedChild}</span>}
        {value && multiple && <Grid.Container gap={0.5}>{selectedChild}</Grid.Container>}
        <SelectDropdown
          visible={visible}
          className={dropdownClassName}
          dropdownStyle={dropdownStyle}
          disableMatchWidth={disableMatchWidth}>
          {children}
        </SelectDropdown>
        {!pure && (
          <div className="icon">
            <Icon />
          </div>
        )}
        <style jsx>{`
          .select {
            display: inline-flex;
            align-items: center;
            user-select: none;
            white-space: nowrap;
            position: relative;
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            max-width: 80vw;
            width: ${width};
            overflow: hidden;
            transition: border 0.2s ease 0s, color 0.2s ease-out 0s, box-shadow 0.2s ease 0s;
            border: ${colors.border};
            border-radius: ${theme.expressiveness.R2};
            padding: 0 calc(${theme.layout.gapHalf} * 9 / 8) 0 calc(${theme.layout.gapHalf} * 1.5);
            height: ${sizes.height};
            min-width: ${sizes.minWidth};
            background-color: transparent;
          }

          .multiple {
            height: auto;
            min-height: ${sizes.height};
            padding: ${theme.layout.gapQuarter} calc(${sizes.fontSize} * 2)
              ${theme.layout.gapQuarter} ${theme.layout.gapHalf};
          }

          .select:hover {
            border-color: ${colors.hoverColor};
          }

          .select:hover .icon,
          .select:hover .value {
            color: ${colors.hoverColor};
          }

          .value {
            display: inline-flex;
            flex: 1;
            height: 100%;
            align-items: center;
            line-height: 1;
            padding: 0;
            margin-right: 1.25rem;
            font-size: ${sizes.fontSize};
            color: ${colors.color};
            width: calc(100% - 1.25rem);
          }

          .value :global(svg) {
            display: none;
          }
          .value :global(.option) {
            border: 0;
          }

          .value > :global(div),
          .value > :global(div:hover) {
            border-radius: 0;
            background-color: transparent;
            padding: 0;
            margin: 0;
            color: inherit;
          }

          .placeholder {
            color: ${colors.placeholderColor};
          }

          .icon {
            position: absolute;
            right: calc(${theme.layout.gapHalf} * 9 / 8);
            font-size: ${sizes.fontSize};
            top: 50%;
            bottom: 0;
            transform: translateY(-50%) rotate(${visible ? '180' : '0'}deg);
            pointer-events: none;
            transition: transform 200ms ease;
            display: flex;
            align-items: center;
            color: ${colors.color};
          }
        `}</style>
      </div>
    </SelectContext.Provider>
  )
}

type SelectComponent<P = {}> = React.FC<P> & {
  Option: typeof SelectOption
}

type ComponentProps = Partial<typeof defaultProps> &
  Omit<Props, keyof typeof defaultProps> &
  NativeAttrs
;(Select as SelectComponent<ComponentProps>).defaultProps = defaultProps

export default Select as SelectComponent<ComponentProps>
