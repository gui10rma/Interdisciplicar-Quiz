import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    StatusBar,
    Pressable
} from 'react-native';

// --- Constantes das Imagens ---
const neonBgImage = require('../../assets/neon_city.jpg');
const lexiAvatarImage = require('../../assets/lexi_avatar.png');
// NOVA IMAGEM: O nome do ficheiro foi alterado conforme solicitado
const lexiEmergencyImage = require('../../assets/lexi_avatar_preocupada.png');
// ------------------------------

// --- Falas da Lexi (com a nova fala de emergência) ---
const lexisDialogues = [
    "E aí! Seja muito bem-vindo(a) à 'Ascensão do Coder'. Meu nome é Lexi, e eu vou ser sua guia nessa jornada.", // 0
    "Eu criei este lugar, o Arcanum do Código, como um playground digital para treinar os melhores desenvolvedores do mundo. Aqui, você vai aprender tudo, do básico ao avançado, de uma forma que...", // 1
    "Opa. Isso não estava no script. Segura aí um segundo.", // 2
    "Ok, Coder. Parece que vamos ter que pular a parte do 'tour tranquilo'. O Arcanum foi infectado por... algo. Não é um vírus comum. É um... Paradoxo.", // 3
    "Uma entidade de código que se espalha reescrevendo as regras do sistema e trancando tudo por trás de 'Firewalls de Enigmas'. Ele não quer destruir o Arcanum, ele quer... testá-lo. E a nós." // 4
];
// ---------------------

const NeonBackgroundScreen: React.FC = () => {
    const [dialogueIndex, setDialogueIndex] = useState(0);
    // Estado para controlar qual imagem da Lexi é mostrada
    const [currentImage, setCurrentImage] = useState(lexiAvatarImage);
    // Estado para controlar o efeito de piscar
    const [isFlashing, setIsFlashing] = useState(false);
    const [flashToggle, setFlashToggle] = useState(false);

    // Este useEffect controla a animação de piscar
    useEffect(() => {
        let flashInterval: NodeJS.Timeout | null = null;
        if (isFlashing) {
            // Cria um intervalo que inverte o 'flashToggle' a cada 150ms
            flashInterval = setInterval(() => {
                setFlashToggle(prev => !prev);
            }, 150);
        } else {
            // Garante que o flash para desligado
            setFlashToggle(false);
        }

        // Função de limpeza: para o intervalo quando o componente é desmontado
        return () => {
            if (flashInterval) clearInterval(flashInterval);
        };
    }, [isFlashing]); // Este efeito roda sempre que 'isFlashing' muda

    const handleScreenPress = () => {
        const nextIndex = dialogueIndex + 1;

        // Se o diálogo tiver terminado
        if (nextIndex >= lexisDialogues.length) {
            console.log("Fim do diálogo. Próxima tela aqui!");
            setIsFlashing(false); // Para de piscar
            return; // Para a execução
        }

        // Avança para a próxima fala
        setDialogueIndex(nextIndex);

        // --- LÓGICA DE ESTADO VISUAL ATUALIZADA ---

        // Lógica da Imagem: Mudar para "preocupada" a partir do índice 2
        if (nextIndex >= 2) {
            setCurrentImage(lexiEmergencyImage);
        } else {
            setCurrentImage(lexiAvatarImage);
        }

        // Lógica do Flash: Piscar APENAS no índice 2 ("Opa...")
        if (nextIndex === 2) {
            setIsFlashing(true); // Começa a piscar
        } else {
            setIsFlashing(false); // Para de piscar em todas as outras falas (incluindo a 3)
        }
    };

    return (
        <ImageBackground source={neonBgImage} style={styles.background}>
            <StatusBar barStyle="light-content" />

            <Pressable style={styles.overlay} onPress={handleScreenPress}>

                {/* Overlay vermelho que pisca (só aparece se 'isFlashing' e 'flashToggle' forem verdadeiros) */}
                {isFlashing && flashToggle && <View style={styles.redFlashOverlay} />}

                <View style={styles.avatarContainer}>
                    <Image
                        source={currentImage} // Usa o estado para definir a imagem
                        style={styles.avatar}
                    />
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
    // --- NOVO ESTILO ---
    redFlashOverlay: {
        ...StyleSheet.absoluteFillObject, // Cobre a tela inteira
        backgroundColor: 'rgba(255, 0, 0, 0.4)',
        zIndex: 1, // Fica por cima do overlay, mas por baixo do avatar e diálogo
    },
    // --- FIM NOVO ESTILO ---
    avatarContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        zIndex: 2, // Garante que fica por cima do flash
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
        zIndex: 2, // Garante que fica por cima do flash
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
    }
});

export default NeonBackgroundScreen;

