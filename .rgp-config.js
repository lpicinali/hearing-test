module.exports = {
  componentPropsMap: {
    T: {
      message: 'msgid',
      messagePlural: 'msgid_plural',
      context: 'msgctxt',
      comment: 'comment',
    },
  },
  funcArgumentsMap: {
    t: ['msgid'],
  },
  trim: true,
  trimLines: true,
  trimNewlines: true,
}
