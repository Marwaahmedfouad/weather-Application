import React, { useState } from 'react';
import { Text, View, ImageBackground, StyleSheet, SafeAreaView, TextInput, Platform, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios';
import one from '../../assets/11.png'
import two from '../../assets/12.png'
import three from '../../assets/13.png'
import four from '../../assets/14.png'
import five from '../../assets/15.png'
import six from '../../assets/16.png'


const Images = [one, two, three, four, five, six]
export default function Home() {
    const [city, setCity] = useState("")
    const [weather, setWeather] = useState({})
    const [randomImage, setrandomImage] = useState(Images[5])
    const [loading, setloading] = useState(false)

//get data from API
    const getweather = async () => {
        if (!city.trim()) {
            setWeather({}); 
            return;
        } 
        setloading(true)
        try {
            const res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=e981facd0606e1a87e5506256581c8bb`)
            setWeather(res.data)
            const n = Math.floor(Math.random() * Images.length)
            setrandomImage(Images[n])
            setloading(false)
        } catch (error) {
            alert('check city name');
            setloading(false)
        }
    }
    // Clear weather data when input becomes empty
    const handleTextChange = (text) => {
        setCity(text);
        if (!text.trim()) {
            setWeather({}); 
        }
    }
    return (
        <ImageBackground source={randomImage} style={styles.Image} imageStyle={{ opacity: 0.7 }}>
            <SafeAreaView style={[styles.safeArea, { marginTop: Platform.OS === 'android' ? 60 : 0 }]}>
                <View style={styles.TextInputcontainer}>
                    <TextInput
                        style={styles.TextInput}
                        value={city}
                        placeholder='Enter your city name'
                        onChangeText={handleTextChange} 
                    />
                    {loading ? <ActivityIndicator size='small' color='black' /> : <AntDesign onPress={getweather} name="check" size={29} color="black" />}
                </View>
                {Object.keys(weather).length > 0 ? <>
                    <View style={styles.Textlocationcontainer}>
                        <Text style={styles.location}>
                            {weather?.name} , {weather?.sys?.country}
                        </Text>
                    </View>


                    <View style={styles.Textweathercontainer}>
                        <Text style={styles.temp}>
                            {Math.round(weather.main.temp)} c
                        </Text>
                        <Text style={styles.weather}>
                            {weather.weather[0].main}
                        </Text>
                    </View>
                </> : null}
            </SafeAreaView>
        </ImageBackground>
    );
}
const styles = StyleSheet.create({
    Image: {
        flex: 1,
        width: 393,
        height: 890
    },
    TextInputcontainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: '80%',
        justifyContent: 'space-between'
    },
    TextInput: {
        height: 40,
        width: '60%',
        fontWeight: '600'

    },
    locationcontainer: {
        marginVertical: 15
    },
    location: {
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.55)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5
    },
    weathercontaianer: {
        alignItems: 'center'
    },
    temp: {
        color: 'white',
        fontSize: 100,
        fontWeight: '600',
        textAlign: 'center',
        backgroundColor: 'rgba(0,0,0,.4)',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 30,
        overflow: 'hidden',
        marginTop: 10,
        textShadowColor: 'rgba(0,0,0,0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 5
    },
    weather: {
        color: 'white',
        textAlign: 'center',
        fontSize: 48,
        fontWeight: '700',
        shadowColor: '#000000',
        textShadowOffset: { width: -1, height: 1 },
        shadowOpacity: 0.7
    }
})





