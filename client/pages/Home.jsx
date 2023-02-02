import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView , Image} from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import { SafeAreaView } from 'react-native';
import Moment from 'moment';
import axios from 'axios';
import { DataTable } from 'react-native-paper';

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

function Weather() {
    const [weatherData, setWeatherData] = useState(null);
    const [location, setLocation] = useState({});
    const [forecastData, setForecastData] = useState(null);
    const key = 'fb5c2c22270e5fb6e93c73fd0789bac7';
    // const [city, setCity] = useState(null);




    useEffect(() => {
        async function getLocation() {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
            }
            let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
            setLocation({
                lat: location.coords.latitude,
                lon: location.coords.longitude,
            });
        }
        getLocation();
    }, []);
    useEffect(() => {
        if (location.lat && location.lon) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${key}&units=metric
                `)
                .then(response => {
                    setWeatherData(response.data);


                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [location]);

    useEffect(() => {
        if (location.lat && location.lon) {
            axios
                .get(`https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&appid=${key}&units=metric
                `)
                .then(response => {
                    setForecastData(response.data);

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
         <ImageBackground source={require('../assets/BG.png')} style={styles.header}>
            <View style={styles.header}>
                    <Text style={styles.temp}>{Math.round(weatherData.main.temp - 273.15)}°C</Text>
                    <Text style={styles.city}>{weatherData.name}</Text>
                    <Text style={styles.description}>{weatherData.weather[0].description}</Text>
                    <Image style={styles.icone}source={require('../assets/icone.png')}  />
                   
                    

            </View> 
            
            <View style={styles.ScrollView}>       
                <ScrollView horizontal={true}>
                    {forecastData && forecastData.list.map((item, index) => (
                        <View key={index} style={{ width: 100, height: 100, backgroundColor: '#FFF', margin: 10, borderRadius: 10 }}>
                            <Text style={{ fontSize: 20 }}>
                                {Moment(item.dt_txt).format('HH:mm')}
                            </Text>
                            <Text style={{ fontSize: 20 }}>
                                {Math.round(item.main.temp - 273.15)} °C
                            </Text>
                            <Text style={{ fontSize: 20 }}>
                                {item.main.humidity} %
                            </Text>
                        </View>
                    ))}
                </ScrollView>

            </View>
            <View style={styles.table}>
            <ScrollView>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title style={styles.headerTitle}>Time</DataTable.Title>
                        <DataTable.Title style={styles.headerTitle}>Temperature</DataTable.Title>
                        <DataTable.Title style={styles.headerTitle}>Humidity</DataTable.Title>
                        <DataTable.Title style={styles.headerTitle}>Description</DataTable.Title>
                    </DataTable.Header>
                    {forecastData && forecastData.list.map((item, index) => (
                        <DataTable.Row key={index}>
                            <DataTable.Cell style={styles.cell}>{Moment(item.dt_txt).format('HH:mm')}</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{Math.round(item.main.temp - 273.15)} °C</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{item.main.humidity} %</DataTable.Cell>
                            <DataTable.Cell style={styles.cell}>{weatherData.weather[0].description}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
                </ScrollView>
            </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    ScrollView: {
        flex: 1,
        
        jaustifyContent: 'center',
        alignItems: 'center',
        
    },
      
    table: {
        flex: 2,
        marginTop: 20,
        marginBottom: 20,
     
        backgroundColor:'rgba(255,255,255,0.5)',

    },
    header: {
        flex: 1,
        justifyContent: 'center',
       
    },
    
    temp: {
        fontSize: 50,
        color: '#FFF',
        marginTop: 20,
        marginLeft: 20,
    },
    city: {
        fontSize: 40,
        color: '#FFF',
        marginLeft: 20,     
        // fontFamily: 'Rockwell',
    },
    description: {
        fontSize: 40,
        color: '#FFF',
        marginLeft: 20,
        fontFamily: 'Rockwell',
    },
    icone: {
        width: 100,
        height: 100,
        position: 'absolute',
        right: 20,
        top: 20,
    },
});


export default Weather;



