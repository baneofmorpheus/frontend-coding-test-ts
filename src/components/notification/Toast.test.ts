/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Toast from './Toast.vue'

describe('Exercise Tests!', () => {
  it('should render', () => {
    const wrapper = mount(Toast, {
      props: {
        toast: {
          severity: 'success',
          summary: 'Data retrieved',
          detail: 'Characters list has loaded successfully',
        },
      },
    })

    expect(wrapper.find('.text-left > p').text()).toBe('Data retrieved')
    expect(wrapper.find('.text-left > p:nth-child(2)').text()).toBe(
      'Characters list has loaded successfully',
    )
  })
})
