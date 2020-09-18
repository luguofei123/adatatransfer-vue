import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import Login from '@/views/Login.vue'

describe('Login.vue', () => {
  it('renders props.msg when passed', () => {
    const username = 'admin1234'
    const wrapper = shallowMount(Login, {
      propsData: { username }
    })
    expect(wrapper.text()).to.include(username)
  })
})
