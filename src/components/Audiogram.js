import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IPropTypes from 'immutable-props'
import { last, size, values } from 'lodash'
import { fromJS, Map, List } from 'immutable'

import { Ear, TestFrequencies } from 'src/constants.js'
import extent from 'src/extent.js'
import { BLACK, BLUE, DARK_BLUE, GRAY, RED, SILVER } from 'src/styles/colors.js'

const TEST_FREQUENCIES = TestFrequencies[extent]

console.log({ TEST_FREQUENCIES })

const AudiogramFrequencies = [...TEST_FREQUENCIES]
const AudiogramFrequencyValues = [
  -20,
  -10,
  0,
  10,
  20,
  30,
  40,
  50,
  60,
  70,
  80,
  90,
  100,
  110,
  120,
]

const GRAPH_WIDTH = 350
const GRAPH_HEIGHT = 280
const PADDING = {
  LEFT: 40,
  RIGHT: 20,
  TOP: 30,
  BOTTOM: 20,
}

const GW = GRAPH_WIDTH - (PADDING.LEFT + PADDING.RIGHT)
const GH = GRAPH_HEIGHT - (PADDING.TOP + PADDING.BOTTOM)
const CIRCLE_RADIUS = 6

const getFrequencyX = frequency => {
  return (
    PADDING.LEFT +
    GW *
      AudiogramFrequencies.indexOf(frequency) /
      (size(AudiogramFrequencies) - 1)
  )
}

const getDecibelY = decibel => {
  return (
    PADDING.TOP +
    GH *
      (decibel - AudiogramFrequencyValues[0]) /
      (last(AudiogramFrequencyValues) - AudiogramFrequencyValues[0])
  )
}

const AudiogramPoint = ({ ear, size, cx, cy, ...props }) => {
  return ear === Ear.RIGHT ? (
    <circle
      r={size}
      fill={BLACK}
      stroke={RED}
      strokeWidth={2}
      cx={cx}
      cy={cy}
      {...props}
    />
  ) : (
    <g cx={cx} cy={cy} {...props}>
      <line
        x1={cx - size * 0.75}
        y1={cy - size * 0.75}
        x2={cx + size * 0.75}
        y2={cy + size * 0.75}
        stroke={BLUE}
        strokeWidth={2}
      />
      <line
        x1={cx - size * 0.75}
        y1={cy + size * 0.75}
        x2={cx + size * 0.75}
        y2={cy - size * 0.75}
        stroke={BLUE}
        strokeWidth={2}
      />
    </g>
  )
}

AudiogramPoint.propTypes = {
  ear: PropTypes.oneOf(values(Ear)),
  size: PropTypes.number.isRequired,
  cx: PropTypes.number.isRequired,
  cy: PropTypes.number.isRequired,
}

/**
 * Interactive audiogram graph component
 */
class Audiogram extends Component {
  static propTypes = {
    ear: PropTypes.oneOf(values(Ear)).isRequired,
    data: IPropTypes.Map.isRequired,
    isInteractive: PropTypes.bool,
    onFrequencyValueChange: PropTypes.func,
  }

  static defaultProps = {
    isInteractive: true,
    onFrequencyValueChange: () => {},
  }

  constructor(props) {
    super(props)

    this.state = {
      areas: props.data.reduce((list, value, frequency) => {
        const frequencyAreas = fromJS(
          AudiogramFrequencyValues.map(
            decibel =>
              new Map({
                frequency,
                decibel,
                isHighlighted: false,
                isPopulated: false,
              })
          )
        )
        return list.concat(frequencyAreas)
      }, new List()),
    }
  }

  setAreaHighlighted(frequency, decibel, isHighlighted) {
    this.setState(state => ({
      areas: state.areas.map(
        area =>
          area.get('frequency') === frequency && area.get('decibel') === decibel
            ? area.set('isHighlighted', isHighlighted)
            : area
      ),
    }))
  }

  handleMouseEnterArea(frequency, decibel) {
    this.setAreaHighlighted(frequency, decibel, true)
  }

  handleMouseLeaveArea(frequency, decibel) {
    this.setAreaHighlighted(frequency, decibel, false)
  }

  handleClickArea(frequency, decibel) {
    this.props.onFrequencyValueChange(frequency, decibel)
  }

  render() {
    const { ear, data, isInteractive, ...props } = this.props
    const { areas } = this.state

    const frequencyWidth = GW / (data.size - 1)
    const valueHeight = GH / (AudiogramFrequencyValues.length - 1)

    delete props.onFrequencyValueChange

    return (
      <div style={{ maxWidth: 380 }} {...props}>
        <svg
          viewBox={`0 0 ${GRAPH_WIDTH} ${GRAPH_HEIGHT}`}
          width={GRAPH_WIDTH}
          height={GRAPH_HEIGHT}
          style={{
            width: '100%',
            background: BLACK,
            // border: `1px solid ${DARK_BLUE}`,
            borderRadius: 3,
            overflow: 'hidden',
          }}
        >
          {/* Frequency grid lines */}
          <g>
            {data
              .keySeq()
              .map(frequency => (
                <line
                  x1={getFrequencyX(frequency)}
                  y1={PADDING.TOP}
                  x2={getFrequencyX(frequency)}
                  y2={PADDING.TOP + GH}
                  stroke={DARK_BLUE}
                  key={frequency}
                />
              ))
              .toArray()}
          </g>

          {/* Decibel grid lines */}
          <g>
            {AudiogramFrequencyValues.map(decibel => (
              <line
                x1={PADDING.LEFT}
                y1={getDecibelY(decibel)}
                x2={PADDING.LEFT + GW}
                y2={getDecibelY(decibel)}
                stroke={decibel === 0 ? GRAY : DARK_BLUE}
                key={decibel}
              />
            ))}
          </g>

          {/* Value lines */}
          <g>
            {data
              .take(data.size - 1)
              .map((value, frequency) => {
                const nextFrequency = data
                  .keySeq()
                  .get(data.keySeq().keyOf(frequency) + 1)

                return (
                  <line
                    x1={getFrequencyX(frequency)}
                    y1={getDecibelY(value)}
                    x2={getFrequencyX(nextFrequency)}
                    y2={getDecibelY(data.get(nextFrequency))}
                    stroke={ear === Ear.RIGHT ? RED : BLUE}
                    key={frequency}
                  />
                )
              })
              .toArray()}
          </g>

          {/* Decibel labels */}
          <g>
            {AudiogramFrequencyValues.map(decibel => (
              <text
                x={PADDING.LEFT - 10}
                y={getDecibelY(decibel) + 3}
                textAnchor="end"
                style={{
                  fontSize: 10,
                  fill: SILVER,
                }}
                key={decibel}
              >
                {decibel}
              </text>
            ))}
          </g>

          {/* Frequency labels */}
          <g>
            {data.keySeq().map(frequency => (
              <text
                x={getFrequencyX(frequency)}
                y={PADDING.TOP - 12}
                textAnchor="middle"
                style={{
                  fontSize: 10,
                  fill: SILVER,
                }}
                key={frequency}
              >
                {frequency}
              </text>
            ))}
          </g>

          {/* Interactable areas */}
          {isInteractive && (
            <g>
              {areas
                .map(area => {
                  const frequency = area.get('frequency')
                  const decibel = area.get('decibel')

                  const areaRect = (
                    <rect
                      x={getFrequencyX(frequency) - frequencyWidth / 2}
                      y={getDecibelY(decibel) - valueHeight / 2}
                      width={frequencyWidth}
                      height={valueHeight}
                      onMouseEnter={() =>
                        this.handleMouseEnterArea(frequency, decibel)}
                      onMouseLeave={() =>
                        this.handleMouseLeaveArea(frequency, decibel)}
                      onClick={() => this.handleClickArea(frequency, decibel)}
                      fill="transparent"
                      stroke="transparent"
                      style={{ cursor: 'pointer' }}
                    />
                  )

                  const areaPoint = area.get('isHighlighted') && (
                    <AudiogramPoint
                      cx={getFrequencyX(frequency)}
                      cy={getDecibelY(decibel)}
                      size={CIRCLE_RADIUS}
                      ear={ear}
                    />
                  )

                  return (
                    <g key={`${area.get('frequency')}-${area.get('decibel')}`}>
                      {areaPoint}
                      {areaRect}
                    </g>
                  )
                })
                .toArray()}
            </g>
          )}

          {/* Current values */}
          <g>
            {data
              .map((value, frequency) => (
                <AudiogramPoint
                  ear={ear}
                  cx={getFrequencyX(frequency)}
                  cy={getDecibelY(value)}
                  size={CIRCLE_RADIUS}
                  style={{ cursor: 'pointer' }}
                  key={frequency}
                />
              ))
              .toArray()}
          </g>
        </svg>
      </div>
    )
  }
}

export default Audiogram
