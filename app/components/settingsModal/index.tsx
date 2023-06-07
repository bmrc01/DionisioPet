import * as React from "react";
import { useRef } from "react";
import { Animated, Dimensions, View } from "react-native";
import { Button, Card, Divider, IconButton, List, Modal, Text } from "react-native-paper";

export function SettingsModal({ navigation, visible, close }: { navigation: any, visible: boolean, close: () => void }): React.ReactElement {
    const options = [
        {
            name: 'Log-In',
            onPress: () => console.log("clickado"),
            icon: 'login'
        },
        {
            name: 'Configurações',
            onPress: () => {
                close()
                navigation.navigate("Configurações")
            },
            icon: 'cog'
        },
    ]

    const deviceHeight = Dimensions.get('window').height

    var y = new Animated.Value(-deviceHeight)

    function slide() {
        Animated.spring(y, {
            toValue: 0,
            useNativeDriver: false
        }).start();
    };

    return (
        <Modal
            visible={visible}
            onDismiss={close}
            contentContainerStyle={{}}
            style={{ maxWidth: 500 }}
        >
            <Animated.View onLayout={slide} style={{ padding: 16, transform: [{ translateY: y }] }}  >
                <Card>
                    <IconButton style={{ padding: 8, alignSelf: 'flex-start' }} icon='close' onPress={close}></IconButton>
                    <Card.Content>
                        <View>
                            {options.map((option, index) => (
                                <View key={option.name}>
                                    <List.Item
                                        title={option.name}
                                        onPress={option.onPress}
                                        left={props => <List.Icon {...props} icon={option.icon} />}
                                    />
                                    {index != options.length - 1 && <Divider />}
                                </View>
                            ))}
                        </View>
                    </Card.Content>
                </Card>
            </Animated.View>
        </Modal >
    )
}
