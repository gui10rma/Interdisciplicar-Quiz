import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    StatusBar,
    Pressable,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

// --- Constantes das Imagens ---
const neonBgImage = require('../../assets/neon_city.jpg');
const lexiAvatarImage = require('../../assets/lexi_avatar.png');
const lexiEmergencyImage = require('../../assets/lexi_avatar_preocupada.png');
// ------------------------------

// --- Falas da Lexi ---
const lexisDialogues = [
    "E aí! Seja muito bem-vindo(a) à 'Ascensão do Coder'. Meu nome é Lexi, e eu vou ser sua guia nessa jornada.",
    "Eu criei este lugar, o Arcanum do Código, como um playground digital para treinar os melhores desenvolvedores do mundo. Aqui, você vai aprender tudo, do básico ao avançado, de uma forma que...",
    "Opa. Isso não estava no script. Segura aí um segundo.",
    "Ok, Coder. Parece que vamos ter que pular a parte do 'tour tranquilo'. O Arcanum foi infectado por... algo. Não é um vírus comum. É um... Paradoxo.",
    "Uma entidade de código que se espalha reescrevendo as regras do sistema e trancando tudo por trás de 'Firewalls de Enigmas'. Ele não quer destruir o Arcanum, ele quer... testá-lo. E a nós."
];
// ---------------------

const NeonBackgroundScreen = () => {
    const [dialogueIndex, setDialogueIndex] = useState(0);
    const [currentImage, setCurrentImage] = useState(lexiAvatarImage);
    const [isFlashing, setIsFlashing] = useState(false);
    const [flashToggle, setFlashToggle] = useState(false);

    // 🚨 useNavigation precisa ser tipado corretamente (para evitar erro de tipo)
    const navigation = useNavigation<any>();

    // Controla o efeito de piscar
    useEffect(() => {
        let flashInterval: any = null; // 👈 trocado de NodeJS.Timeout → any (React Native não reconhece NodeJS.Timeout)
        if (isFlashing) {
            flashInterval = setInterval(() => {
                setFlashToggle(prev => !prev);
            }, 150);
        } else {
            setFlashToggle(false);
        }

        return () => {
            if (flashInterval) clearInterval(flashInterval);
        };
    }, [isFlashing]);

    const handleScreenPress = () => {
        const nextIndex = dialogueIndex + 1;

        if (nextIndex >= lexisDialogues.length) {
            setIsFlashing(false);
            navigation.navigate('Mission1'); // 👈 navega para próxima tela
            return;
        }

        setDialogueIndex(nextIndex);

        if (nextIndex >= 2) {
            setCurrentImage(lexiEmergencyImage);
        } else {
            setCurrentImage(lexiAvatarImage);
        }

        if (nextIndex === 2) {
            setIsFlashing(true);
        } else {
            setIsFlashing(false);
        }
    };

    return (
        <ImageBackground source={neonBgImage} style={styles.background}>
            <StatusBar barStyle="light-content" />

            <Pressable style={styles.overlay} onPress={handleScreenPress}>
                {isFlashing && flashToggle && <View style={styles.redFlashOverlay} />}

                <View style={styles.avatarContainer}>
                    <Image source={currentImage} style={styles.avatar} />
                </View>

                <View style={styles.dialogContainer}>
                    <Text style={styles.dialogText}>
                        {lexisDialogues[dialogueIndex]}
                    </Text>
                </View>
            </Pressable>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    redFlashOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        zIndex: 1,
    },
    avatarContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 2,
    },
    avatar: {
        width: 600,
        height: 600,
        resizeMode: 'contain',
        marginTop: 40,
    },
    dialogContainer: {
        flex: 1,
        width: '95%',
        backgroundColor: 'rgba(255, 105, 180, 0.80)',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        justifyContent: 'center',
        marginBottom: 20,
        zIndex: 2,
    },
    dialogText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
});

export default NeonBackgroundScreen;
