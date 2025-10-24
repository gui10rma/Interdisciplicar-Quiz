import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    StatusBar
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const APP_NAME = "A Ascensão do Coder";

// Como estamos em TypeScript, podemos tipar o componente como React.FC (Functional Component)
const LoginScreen: React.FC = () => {
    const handleLogin = () => {
        console.log("Botão de Login pressionado");
    };

    const handleSignUp = () => {
        console.log("Botão de Cadastro pressionado");
    };

    const handleGoogleLogin = () => {
        console.log("Botão de Login com Google pressionado");
    };

    return (
        // Reativando o ImageBackground com o caminho correto
        <ImageBackground
            source={require('../../assets/background.jpg')}
            style={styles.background}
        >
            <StatusBar barStyle="light-content" />

            <View style={styles.overlay}>
                <Text style={styles.title}>{APP_NAME}</Text>

                <View style={styles.buttonsContainer}>
                    {/* Botão de Login */}
                    <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={handleLogin}>
                        <Text style={[styles.buttonText, styles.buttonPrimaryText]}>Login</Text>
                    </TouchableOpacity>

                    {/* Botão de Cadastro */}
                    <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={handleSignUp}>
                        <Text style={[styles.buttonText, styles.buttonSecondaryText]}>Cadastre-se</Text>
                    </TouchableOpacity>

                    {/* Divisor */}
                    <View style={styles.divider}>
                        <View style={styles.dividerLine} />
                        <Text style={styles.dividerText}>OU</Text>
                        <View style={styles.dividerLine} />
                    </View>

                    {/* Botão do Google */}
                    <TouchableOpacity style={[styles.button, styles.googleButton]} onPress={handleGoogleLogin}>
                        <FontAwesome name="google" size={20} color="#333" style={styles.icon} />
                        <Text style={[styles.buttonText, styles.googleButtonText]}>Entrar com Google</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#FFFFFF',
        fontFamily: 'Roboto', // Fonte para Android
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10
    },
    buttonsContainer: {
        width: '90%',
        alignItems: 'center',
    },
    button: {
        width: '100%',
        paddingVertical: 15,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        flexDirection: 'row',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonPrimary: {
        backgroundColor: '#8A2BE2',
    },
    buttonPrimaryText: {
        color: '#FFFFFF',
    },
    buttonSecondary: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    buttonSecondaryText: {
        color: '#FFFFFF',
    },
    divider: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        marginVertical: 10,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: '#FFF',
        opacity: 0.5,
    },
    dividerText: {
        width: 40,
        textAlign: 'center',
        color: '#FFF',
        opacity: 0.8,
    },
    googleButton: {
        backgroundColor: '#FFFFFF',
    },
    googleButtonText: {
        color: '#333333',
    },
    icon: {
        marginRight: 10,
    }
});

export default LoginScreen;
