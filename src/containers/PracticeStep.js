import React, { PureComponent } from 'react'
import { T } from 'lioness'
import styled from 'styled-components'
import { autobind } from 'core-decorators'

import Audio from 'src/components/Audio.js'
import { Button, ButtonStyle, LinkButton } from 'src/components/Button.js'
import SimpleFade from 'src/components/SimpleFade.js'
import { AppUrl, SILENCE } from 'src/constants.js'
import { H2, P } from 'src/styles/elements.js'

const ContentWrap = styled.div`padding: 0 88px;`

const ButtonList = styled.div`
  display: flex;

  & > * {
    margin-right: 16px;
  }
`

/**
 * Practice Step
 */
class PracticeStep extends PureComponent {
  state = {
    isMuted: true,
    hasUnmuted: false,
  }

  @autobind
  handleMuteChange() {
    this.setState(() => ({
      isMuted: !this.state.isMuted,
      hasUnmuted: true,
    }))
  }

  render() {
    const { isMuted, hasUnmuted } = this.state

    return (
      <ContentWrap>
        <H2>
          <T>A quick practice</T>
        </H2>

        <P>
          <T>
            During the test you will listen for different tones. To hear what
            that will sound like, play a tone here before proceeding.
          </T>
        </P>

        <ButtonList>
          <Button
            buttonStyle={ButtonStyle.FRIENDLY}
            onClick={this.handleMuteChange}
          >
            {isMuted ? <T>Play tone</T> : <T>Stop tone</T>}
          </Button>

          {hasUnmuted && (
            <SimpleFade delay={500} duration={500}>
              <LinkButton to={AppUrl.TEST}>
                <T>Okay, start the test</T>
              </LinkButton>
            </SimpleFade>
          )}
        </ButtonList>

        <Audio name="1000" volume={isMuted ? SILENCE : -30} />
      </ContentWrap>
    )
  }
}

export default PracticeStep
