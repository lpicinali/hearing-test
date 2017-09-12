import { TestExtent } from 'src/constants.js'

const extent =
  process.env.EXTENT === TestExtent.TRIMMED
    ? TestExtent.TRIMMED
    : TestExtent.NORMAL

export default extent
