import React from 'react'
import { T } from 'lioness'

import { AppUrl } from 'src/constants.js'
import { LinkButton } from 'src/components/Button.js'

export default function HomeView() {
  return (
    <div>
      <h1>
        <T>3D Tune-In Hearing Test</T>
      </h1>

      <h2>
        <T>Disclaimer</T>
      </h2>

      <div>
        <T
          message={`
          {{ p:This software nas been developed within the 3D Tune-In project (3D-games for TUNing and lEarniNg about hearing aids). }}
          {{ p:3D Tune-In is a project ﬁnanced by the European Commission within the European Programme HORIZON 2020 — Research and Innovation Action — contract number 644051. }}
          {{ p:For additional information and details on 3D Tune-In, please visit the project web site: www.3d-tune-in.eu }}
          {{ p:The contents of this software are owned by the 3D Tune-In Consortium. }}
          {{ p:This test allows you to estimate your hearing threshold. Please bear in mind that the software implements a demonstrative test, and in no case should it be considered as a medical diagnosis. Its results may not indicate any medical condition or have any medical purpose. }}
        `}
          p={<p />}
        />
      </div>

      <div>
        <T
          message={`
          {{ p:Please follow the instructions carefully for correct usage of the test. }}
          {{ p:You will initially be guided though a simple procedure for adjusting the volume on your device. High volumes can cause damage to your hearing. Please find your comfortable level and maintain it during the entire procedure. }}
          {{ p:The 3D Tune-In Consortium will not be held responsible for any damage related to incorrect usage of the test by users. }}
          `}
          p={<p />}
        />
      </div>

      <LinkButton to={AppUrl.CALIBRATION}>
        <T>
          I understand all these conditions, and I confirm that I am taking this
          test under my sole responsibility
        </T>
      </LinkButton>
    </div>
  )
}
