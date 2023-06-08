import { FlatList, NativeScrollEvent, NativeSyntheticEvent, Platform, SafeAreaView, ScrollView, View } from "react-native";
import { PetCard, pet } from "../../components/petCard";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Modal, IconButton, Portal, Searchbar, Text, Chip, Button } from "react-native-paper";
import axiosClient from "../../utils/apiClient";
import { SettingsModal } from "../../components/settingsModal";
import { FilterModal } from "../../components/filtersModal";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AdoptedPetsContext } from "../../utils/adoptedPetsContext";

type filter = {
    name: string,
    useToFilter: boolean
}

export function Home({ navigation }): JSX.Element {
    const [usableTags, setUsableTags] = React.useState([])
    const [filters, setFilters] = React.useState([]);
    const [settingsModalVisible, setSettingsModalVisible] = React.useState(false);
    const [filtersModalVisible, setFiltersModalVisible] = React.useState(false);

    React.useEffect(() => {
        navigation.setOptions({
            title: "DionísioPet",
            headerRight: () => (
                <View style={{}}>
                    <View style={{ flexDirection: "row", alignSelf: "flex-end" }}>
                        <IconButton icon="filter-variant" onPress={() => setFiltersModalVisible(true)} />
                        <IconButton icon="account-circle" onPress={() => setSettingsModalVisible(true)} />
                    </View>
                </View >
            )
        })
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <PetList
                navigation={navigation}
                tags={filters}
                setUsableFilters={(tags) => setUsableTags(tags.map(item => item.toLowerCase()))}
            />
            <Portal>
                <SettingsModal
                    navigation={navigation}
                    visible={settingsModalVisible}
                    close={() => setSettingsModalVisible(false)}
                />

                <FilterModal
                    navigation={navigation}
                    visible={filtersModalVisible}
                    usableTags={usableTags}
                    close={(selectedTags: string[]) => {
                        if (selectedTags !== null)
                            setFilters(selectedTags)

                        setFiltersModalVisible(false)
                    }}
                />
            </Portal>
        </SafeAreaView>
    );
};

export function PetList({ navigation, tags, setUsableFilters }: { navigation: any, tags: string[], setUsableFilters: (tags: string[]) => void }): JSX.Element {
    const [petList, setPetList] = React.useState<pet[]>([]);
    const [refreshing, setRefreshing] = React.useState<boolean>(false);
    const [filteredPetList, setFiltedPetList] = React.useState<pet[]>([]);

    const { adoptedPets, setAdoptedPets } = React.useContext(AdoptedPetsContext);

    const insets = useSafeAreaInsets();

    React.useEffect(() => {
        onRefresh();
    }, []);

    React.useEffect(() => {
        setFiltedPetList(petList.filter(pet => {
            let petTags: string[] = JSON.parse(pet.tag.toLowerCase())
            return petTags.some(item => tags.includes(item.toLowerCase()));
        }))
    }, [tags]);

    React.useEffect(() => {
        setPetList(petList.filter(pet => !adoptedPets.includes(pet._id)))
    }, [adoptedPets]);

    function onRefresh() {
        setRefreshing(true);
        axiosClient.get('/pets')
            .then((response) => {
                setPetList(response.data)

                const tags = response.data.map((pet: pet) => JSON.parse(pet.tag));
                const tagList = [].concat(...tags);
                setUsableFilters(Array.from(new Set(tagList)));

                setRefreshing(false);
            }).catch(reason => {
                setRefreshing(false);
            });
    }

    const renderItem = ({ item }: { item: pet }) => {
        return (
            <View
                style={{ flex: 1, margin: 4, marginHorizontal: 8 }}
            >
                <PetCard
                    pet={item}
                    onPress={() => navigation.navigate("Detalhes", {
                        id: item._id
                    })}
                />
            </View >
        );
    }

    return (
        <FlatList
            stickyHeaderHiddenOnScroll
            bounces
            nestedScrollEnabled={true}
            refreshing={refreshing}
            onRefresh={onRefresh}
            data={filteredPetList && filteredPetList.length > 0 ? filteredPetList : petList}
            numColumns={Platform.OS === "web" ? 3 : 1}
            renderItem={renderItem}
            ListFooterComponent={(!refreshing && <Text style={{ alignSelf: "center", margin: 16, marginBottom: insets.bottom + 16 }}>Por enquanto é só.</Text>)}
        />
    )
}