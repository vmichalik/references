import { expect, test } from 'vitest'

import * as exports from './index.js'

test('exports', () => {
  expect(exports).toMatchInlineSnapshot(`
    {
      "injected": [Function],
      "walletConnect": [Function],
    }
  `)
})
