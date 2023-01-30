import { useCallback, useState } from "react";
import { View, ActivityIndicator, useWindowDimensions, Alert } from "react-native";
import { styles, VIDEO_HEIGHT, SCREE_SPACE } from "./styles";

import YoutubeIframe, { PLAYER_STATES } from 'react-native-youtube-iframe'
import * as ScreenOrientation from 'expo-screen-orientation'

export function Home() {
    const [videoReady, setVideoReady] = useState(false)

    // Capturando a largura máxima do disposítivo do usuário
    const { width } = useWindowDimensions()

    // Deixando um espaçamento dos 2 lados da tela
    const VIDEO_WIDTH = width - (SCREE_SPACE * 2)

    const handleOnFullScreenChange = useCallback((isFullScreen: boolean) => {
        if (isFullScreen) {
            // Quando o usuário clica na opçao de full screen no video do youtube, o isFullScreen será verdadeiro e o screenorientation vai alterar para LANDSCAPE
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE)
        } else {
            ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT)
        }
    }, [])

    const onChangeState = useCallback((state: string) => {
        // o state vai armazenar o estado do vídeo (play, pause, buffering, e etc)
        if (state === PLAYER_STATES.ENDED) {
            Alert.alert("E aí , curtiu?", "Não deixe de deixar o like!")
        }
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.player}>
                <YoutubeIframe
                    videoId="s1tAYmMjLdY"
                    width={VIDEO_WIDTH}
                    height={videoReady ? VIDEO_HEIGHT : 0} // Fazendo o spinner do loading ficar no centro
                    onReady={() => setVideoReady(true)}
                    onFullScreenChange={handleOnFullScreenChange}
                    onChangeState={onChangeState}
                />

                {/* Mostrando um componente de loading para quando o componente de video ainda não tenha sido totalmente carregado */}
                {!videoReady && <ActivityIndicator color='red' />}
            </View>

        </View>
    )
}