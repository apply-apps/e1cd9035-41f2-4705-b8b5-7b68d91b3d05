// Filename: index.js
// Combined code from all files

import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TextInput, Button, ScrollView, View, ActivityIndicator } from 'react-native';
import axios from 'axios';

export default function App() {
    const [hero, setHero] = useState('');
    const [villain, setVillain] = useState('');
    const [plot, setPlot] = useState('');
    const [story, setStory] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchStory = async () => {
        setLoading(true);
        setStory('');
        try {
            const response = await axios.post('http://apihub.p.appply.xyz:3300/chatgpt', {
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful assistant. Please create a fairy tale for children based on the given heroes, villains, and plot."
                    },
                    {
                        role: "user",
                        content: `Create a fairy tale with the hero "${hero}", the villain "${villain}", and the plot "${plot}"`
                    }
                ],
                model: "gpt-4o"
            });

            const { data } = response;
            const resultString = data.response;
            setStory(resultString);
        } catch (error) {
            console.error(error);
            setStory('Something went wrong. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <Text style={styles.title}>Fairy Tale Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Hero"
                    value={hero}
                    onChangeText={setHero}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Villain"
                    value={villain}
                    onChangeText={setVillain}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Plot"
                    value={plot}
                    onChangeText={setPlot}
                />
                <Button title="Generate Fairy Tale" onPress={fetchStory} />

                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <View style={styles.storyContainer}>
                        <Text style={styles.story}>{story}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    scrollViewContainer: {
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        padding: 10,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 20,
    },
    storyContainer: {
        marginTop: 20,
    },
    story: {
        fontSize: 18,
        lineHeight: 24,
    },
});