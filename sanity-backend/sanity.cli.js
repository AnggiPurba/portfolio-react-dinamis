import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
      projectId: 'dcb2c28k', // <-- INI ADALAH ID PROYEK ANDA,
    dataset: 'production'
  },
  /**
   * Enable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  autoUpdates: true,
})
