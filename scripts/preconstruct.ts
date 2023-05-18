import { execa } from 'execa'
import fs from 'fs-extra'

// Symlinks package sources to dist or download for local development

const isSubmodule = await fs.pathExists('../scripts/preconstruct.ts')
if (isSubmodule) {
  console.log('In submodule, running `preconstruct` from root.')
  const onData = (data: any) => process.stdout.write(data)
  execa('pnpm', ['preconstruct'], {
    cleanup: true,
    cwd: '../',
    env: { SUBMODULE: 'true' },
  }).stdout?.on('data', onData)
  execa('pnpm', ['run', 'link'], { cleanup: true }).stdout?.on('data', onData)
} else {
  console.log('Not in submodule, downloading `@wagmi/core` source.')
  /**
   * 1. git clone https://github.com/wagmi-dev/wagmi.git
   * 2. cd wagmi
   * 3. pnpm i
   * 4. pnpm --filter core build
   * 5. cd ../
   * 6. pnpm link packages/core
   */
}
