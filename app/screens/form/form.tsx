import React from "react";
import { ToastAndroid, View, StyleSheet, Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, Dialog, Portal, Provider, Surface, Text, TextInput, useTheme } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDown from "react-native-paper-dropdown";
import { fullPet } from "../../components/petCard";



export function Form({ route }: { route: any }): JSX.Element {
    const { pet }: { pet: fullPet } = route.params;
    const navigation = useNavigation();
    const theme = useTheme();

    const [dialogVisible, setDialogVisible] = React.useState(false);

    //States do DateTimePicker
    const [date, setDate] = React.useState(new Date());
    const [showDatePicker, setShowDatePicker] = React.useState(false);
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShowDatePicker(false);
        setDate(currentDate);

        setBirthday(currentDate.toLocaleDateString("pt-BR") === new Date().toLocaleDateString("pt-BR") ? "" : currentDate.toLocaleDateString("pt-BR"))
    };

    //States de dropDown
    const [showGenderDropDown, setShowGenderDropDown] = React.useState(false);
    const [showDeficiencyDropDown, setShowDeficiencyDropDown] = React.useState(false);

    //States dos campos
    const [birthday, setBirthday] = React.useState<string>("");
    const [gender, setGender] = React.useState<string>("");
    const [deficiencias, setDeficiencias] = React.useState<string>("");

    React.useEffect(() => {
        navigation.setOptions({ title: 'Formulario' })
    });


    const generos = [
        { label: "Masculino", value: "masculino" },
        { label: "Feminino", value: "feminino" },
        { label: "Outros", value: "outros" }
    ]

    const deficienciasItems = [
        { label: "Deficiência visual", value: "visual" },
        { label: "Deficiência auditiva", value: "auditiva" },
        { label: "Deficiência física", value: "fisica" },
        { label: "Deficiência intelectual", value: "intelectual" },
        { label: "Deficiência de fala", value: "fala" },
        { label: "Deficiência cognitiva", value: "cognitiva" },
        { label: "Deficiência psicossocial", value: "psicossocial" },
        { label: "Deficiência múltipla", value: "multipla" }
    ];

    return (
        <View>
            <Portal>
                <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)} >
                    <Dialog.Content>
                        <Text variant="bodyMedium">Deseja adotar {pet.name}?</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setDialogVisible(false)}>Não</Button>
                        <Button onPress={() => {
                            setDialogVisible(false)
                            navigation.navigate("Confirmação", { pet: pet })
                        }}
                        >Sim</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
            <Surface mode="flat" style={{ margin: 8, paddingHorizontal: 8, paddingBottom: 8, borderRadius: 8 }}>
                <Text style={{ margin: 8 }}>Informações de contato</Text>
                <TextInput style={styles.input} label="Nome" mode="outlined" />
                <TextInput style={styles.input} label="E-mail" mode="outlined" />
                <TextInput style={styles.input} label="Celular" mode="outlined" />
            </Surface >

            <Surface mode="flat" style={{ margin: 8, paddingHorizontal: 8, paddingBottom: 8, borderRadius: 8 }}>
                <Text style={{ margin: 8 }}>Informações gerais</Text>
                <View style={[styles.input, { flexDirection: "row" }]}>
                    <View style={{ flex: 1 }}>
                        <DropDown
                            label="Genero"
                            mode="outlined"
                            visible={showGenderDropDown}
                            showDropDown={() => setShowGenderDropDown(true)}
                            onDismiss={() => setShowGenderDropDown(false)}
                            value={gender}
                            setValue={(value) => setGender(value)}
                            list={generos}
                        />
                    </View>
                    <View style={{ width: 8 }}></View>
                    <TextInput
                        style={{ flex: 1 }}
                        label="Nascimento"
                        mode="outlined"
                        value={birthday}
                        onChangeText={(text) => setBirthday(text)}
                        right={<TextInput.Icon icon="calendar" onPress={() => setShowDatePicker(true)} />}
                    />
                    {showDatePicker && (<DateTimePicker
                        display="default"
                        maximumDate={new Date()}
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        onChange={onChange} />
                    )}
                </View>
                <View style={styles.input}>
                    <DropDown
                        label="Deficiências"
                        mode="outlined"
                        visible={showDeficiencyDropDown}
                        showDropDown={() => setShowDeficiencyDropDown(true)}
                        onDismiss={() => setShowDeficiencyDropDown(false)}
                        value={deficiencias}
                        setValue={(value) => {
                            console.log(value)
                            setDeficiencias(value)
                        }}
                        list={deficienciasItems}
                        multiSelect
                    />
                </View>
                {deficiencias.split(",").length > 1 && (<TextInput
                    style={[styles.input, { height: 150 }]}
                    label="Mais informações"
                    multiline
                    mode="outlined" />
                )}
            </Surface>


            <Button
                style={{ margin: 8 }}
                mode="contained-tonal"
                onPress={() => setDialogVisible(true)}
            >Continuar adoção de {pet.name}</Button>
        </View >
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 8,
    },
    inputFlex: {
        flex: 1
    }
});

