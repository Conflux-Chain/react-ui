import { Input } from 'components'
import { mount } from 'enzyme'
import React from 'react'
import { nativeEvent } from 'tests/utils'

describe('Input', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Input placeholder="placeholder" />)
    expect(() => wrapper.unmount()).not.toThrow()
  })

  it('should work with different sizes', () => {
    const wrapper = mount(
      <div>
        <Input size="mini" />
        <Input size="small" />
        <Input size="large" />
        <Input width="50%" />
        <Input variant="solid" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should work with different color', () => {
    const wrapper = mount(
      <div>
        <Input color="primary" />
        <Input color="success" />
        <Input color="warning" />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be work with label', () => {
    const wrapper = mount(
      <div>
        <Input label="label" />
        <Input variant="solid" label="label" />
        <Input labelRight="label" />
        <Input variant="solid" labelRight="label" />
        <Input>
          <span>Block Label</span>
        </Input>
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should be work with icon', () => {
    const wrapper = mount(
      <div>
        <Input icon={<span>test-icon</span>} />
        <Input iconRight={<span>test-icon</span>} />
      </div>,
    )
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should set input from value', () => {
    let wrapper = mount(<Input defaultValue="test" />)
    let input = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('test')

    wrapper = mount(<Input value="test2" />)
    input = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('test2')

    wrapper.setProps({ value: 'test3' })
    input = wrapper.find('input').getDOMNode() as HTMLInputElement
    expect(input.value).toEqual('test3')
  })

  it('should trigger event when input changed', () => {
    let value = ''
    const callback = jest
      .fn()
      .mockImplementation((e: React.ChangeEvent<HTMLInputElement>) => (value = e.target.value))
    const wrapper = mount(<Input onChange={callback} />)
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).toHaveBeenCalled()
    expect(value).toEqual('test')
  })

  it('should ignore event when input disabled', () => {
    const callback = jest.fn()
    const wrapper = mount(
      <div>
        <Input onChange={callback} clearable disabled />
      </div>,
    )
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).not.toHaveBeenCalled()
    wrapper.find('div.clear-icon').at(0).simulate('click', nativeEvent)
    expect(callback).not.toHaveBeenCalled()
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should ignore event when input readonly', () => {
    const callback = jest.fn()
    const wrapper = mount(<Input onChange={callback} readOnly />)
    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).not.toHaveBeenCalled()
  })

  it('should clear text', () => {
    let value = ''
    const callback = jest
      .fn()
      .mockImplementation((e: React.ChangeEvent<HTMLInputElement>) => (value = e.target.value))
    const clearHandler = jest.fn()
    const wrapper = mount(<Input onChange={callback} clearable onClearClick={clearHandler} />)

    wrapper
      .find('input')
      .at(0)
      .simulate('change', { target: { value: 'test' } })
    expect(callback).toHaveBeenCalled()
    expect(value).toEqual('test')

    wrapper.find('.clear-icon').at(0).simulate('click', nativeEvent)
    expect(clearHandler).toHaveBeenCalled()
    expect(value).toEqual('')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should trigger focus correctly', () => {
    const focus = jest.fn()
    const blur = jest.fn()
    const wrapper = mount(<Input onFocus={focus} onBlur={blur} />)

    const input = wrapper.find('input').at(0)
    input.simulate('focus')
    expect(focus).toHaveBeenCalled()
    input.simulate('blur')
    expect(blur).toHaveBeenCalled()
  })

  it('should trigger hover correctly', () => {
    const mouseOver = jest.fn()
    const mouseOut = jest.fn()
    const wrapper = mount(<Input onMouseOver={mouseOver} onMouseOut={mouseOut} />)

    const input = wrapper.find('input').at(0)
    input.simulate('mouseOver')
    expect(mouseOver).toHaveBeenCalled()
    input.simulate('mouseOut')
    expect(mouseOut).toHaveBeenCalled()
  })

  it('should trigger icon event', () => {
    const click = jest.fn()
    const wrapper = mount(
      <Input icon={<span id="test-icon">icon</span>} onIconClick={click} iconClickable />,
    )
    wrapper.find('#test-icon').simulate('click', nativeEvent)
    expect(click).toHaveBeenCalled()
  })

  it('should ignore icon event when input disabled', () => {
    const click = jest.fn()
    const wrapper = mount(
      <Input icon={<span id="test-icon">icon</span>} onIconClick={click} iconClickable disabled />,
    )
    wrapper.find('#test-icon').simulate('click', nativeEvent)
    expect(click).not.toHaveBeenCalled()
  })

  it('should ignore iconRight event when input disabled', () => {
    const click = jest.fn()
    const wrapper = mount(
      <Input
        iconRight={<span id="test-icon">icon</span>}
        onIconRightClick={click}
        iconRightClickable
        disabled
      />,
    )
    wrapper.find('#test-icon').simulate('click', nativeEvent)
    expect(click).not.toHaveBeenCalled()
  })

  it('should forward ref by default', () => {
    const ref = React.createRef<HTMLInputElement>()
    const wrapper = mount(<Input ref={ref} />)
    expect(ref.current).not.toBeNull()
    expect(() => wrapper.unmount()).not.toThrow()
  })
})
