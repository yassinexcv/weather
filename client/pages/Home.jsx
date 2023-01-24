import React, { useState, useEffect } from 'react';
import { View, Text , StyleSheet} from 'react-native';
import axios from 'axios';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState({});
    const key = 'fb5c2c22270e5fb6e93c73fd0789bac7';

    useEffect(() => {

        navigator.geolocation.getCurrentPosition(
            position => {
                setLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            error => console.log(error),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }, []);

    useEffect(() => {
        if (location.lat && location.lon) {
            axios
                .get(`
                        https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${key}&units=metric`,
                )
                .then(response => {
                    setWeatherData(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [location]);

    if (!weatherData) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
                <Text style={styles.city}>{weatherData.name}</Text>
                <Text style={styles.description}>{weatherData.weather[0].description}</Text>
            </View>
            <View style={styles.body}>
                <View style={styles.bodyContent}>
                    <Text style={styles.info}>Latitude: {location.lat}</Text>
                    <Text style={styles.info}>Longitude: {location.lon}</Text>
                </View>
            </View>
        </View>

    );
}

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#00BFFF',
        },
        header: {
            backgroundColor: '#00BFFF',
            height: 200,
        },
        temp: {
            marginTop: 100,
            fontSize: 40,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        city: {
            fontSize: 30,
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        description: {
            fontSize: 20,
            color: '#fff',
            textAlign: 'center',
        },
        body: {
            marginTop: 40,
        },
        bodyContent: {
            flex: 1,
            alignItems: 'center',
            padding: 30,
        },
        info: {
            fontSize: 18,
            marginTop: 20,
            color: '#fff',
        },
    });


export default Weather;



