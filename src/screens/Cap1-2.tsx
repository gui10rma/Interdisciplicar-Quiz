import React, { useState } from 'react'; // Não precisamos mais do 'useEffect'
import {
    StyleSheet,
    View,
    Text,
    ImageBackground,
    Image,
    StatusBar,
    Pressable
} from 'react-native';

// --- Constantes das Imagens (Atualizadas) ---
// 1. Fundo atualizado para 'neonm1.jpg'
const neonBgImage = require('../../assets/neonm1.jpg'); 
// 2. Apenas o avatar padrão é necessário
const lexiAvatarImage = require('../../assets/lexi_avatar.png');
// ------------------------------

// --- Novas Falas ---
const introDialogues = [
    "O Paradoxo acredita que apenas a 'lógica perfeita' é digna de acessar o núcleo do conhecimento.", // 0
    "E, para provar isso, ele transformou todo o meu programa de ensino em um campo minado de desafios de programação. Cada módulo, cada conceito, agora é um portão trancado.", // 1
    "Eu não consigo combatê-lo daqui de fora, ele é inteligente demais e se adapta a cada tentativa minha. Mas você... você está aí dentro. Você é meus olhos, minhas mãos e meu cérebro na linha de frente.", // 2
    "O que me diz, Coder? Pronto(a) para começar a sua ascensão?" // 3
];
// ---------------------

// Nome do componente alterado para evitar conflito
const ArcanumIntroScreen: React.FC = () => {
    const [dialogueIndex, setDialogueIndex] = useState(0);

    // 3. Lógica de piscar e 'useEffect' REMOVIDOS

    const handleScreenPress = () => {
        const nextIndex = dialogueIndex + 1;

        // Se o diálogo tiver terminado
        if (nextIndex >= introDialogues.length) {
            console.log("Fim do diálogo de introdução! Navegando para a Missão 1...");
            // Aqui você colocaria sua lógica de navegação (ex: navigation.navigate('Mission1'))
            return; 
        }

        // Avança para a próxima fala
        setDialogueIndex(nextIndex);

        // 4. Lógica de trocar imagem e piscar REMOVIDA
    };

    return (
        <ImageBackground source={neonBgImage} style={styles.background}>
            <StatusBar barStyle="light-content" />

            <Pressable style={styles.overlay} onPress={handleScreenPress}>

                {/* 5. Overlay vermelho de piscar REMOVIDO */}

                <View style={styles.avatarContainer}>
                    <Image
                        source={lexiAvatarImage} // 6. Imagem agora é fixa
                        style={styles.avatar}
                    />
                </View>

                <View style={styles.dialogContainer}>
                    <Text style={styles.dialogText}>
                        {introDialogues[dialogueIndex]} {/* Usando o novo array de falas */}
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
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Leve escurecida no fundo
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    // 7. Estilo 'redFlashOverlay' REMOVIDO
    avatarContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // zIndex não é mais necessário
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
        // Usei a mesma cor rosa do diálogo anterior que você tinha
        backgroundColor: 'rgba(255, 105, 180, 0.80)', 
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        padding: 20,
        justifyContent: 'center',
        marginBottom: 20,
        // zIndex não é mais necessário
    },
    dialogText: {
        color: '#FFFFFF',
        fontSize: 18,
        // Você pode adicionar uma fonte customizada aqui se quiser
        // fontFamily: 'SuaFonteCustomizada', 
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    }
});

// Exporta o novo componente
export default ArcanumIntroScreen;