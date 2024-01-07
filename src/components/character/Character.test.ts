/**
 * @vitest-environment happy-dom
 */

import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Character from './Character.vue'

describe('Exercise Tests!', () => {
  it('should render', () => {
    const wrapper = mount(Character, {
      global: {
        provide: {
          favouriteCharacters: [],
        },
      },
      props: {
        index: 0,
        singleCharacter: {
          id: 1,
          name: 'Rick Sanchez',
          status: 'Alive',
          species: 'Human',
          type: '',
          gender: 'Male',
          origin: {
            name: 'Earth (C-137)',
            url: 'https://rickandmortyapi.com/api/location/1',
          },
          location: {
            name: 'Citadel of Ricks',
            url: 'https://rickandmortyapi.com/api/location/3',
          },
          image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
          episode: [
            'https://rickandmortyapi.com/api/episode/1',
            'https://rickandmortyapi.com/api/episode/2',
          ],
          url: 'https://rickandmortyapi.com/api/character/1',
          created: '2017-11-04T18:48:46.250Z',
        },
      },
    })

    expect(wrapper.find('h4').text()).toContain('Rick Sanchez')

    expect(wrapper.find('img').attributes('src')).toBe(
      'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
    )
  })
})
