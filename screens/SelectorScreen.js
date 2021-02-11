import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import { useDispatch, useSelector } from 'react-redux';
import EventCard from './components/EventCard.js';


export default function SelectorScreen({navigation}) {

    const dispatch = useDispatch();

    const tripLat = useSelector(state => state.latitude)
    const tripLong = useSelector(state => state.longitude)
    const generatedEvents = useSelector(state => state.generatedEvents)
    const tripName = useSelector(state => state.name)

    // const [generatedEvents, setGeneratedEvents] = useState([])
    
    const initialRegion = {
        latitude: tripLat,
        longitude: tripLong,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.1421,
        }

    const apiKey = "eg8UB2Lxa0g8XZrt2PAAppo8EinYYmpw"
    const apiURL = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&latitude=${tripLat}&longitude=${tripLong}`
    
    const loadEvents = () => {
        fetch(apiURL, {
            headers: {
            "apikey": `${apiKey}`
            }
        })
        .then(response => response.json()) 
        .then(eventsObject => {
            const events = eventsObject._embedded.events
            dispatch({type:"SET_GENERATED_EVENTS", events: events})
                
            })
        .then(spawnEvents)
    }
    const spawnEvents = () => {
        const eventCards = generatedEvents.map((event, i) => {
            const eventLat = event._embedded.venues[0].location.latitude;
            const eventLong = event._embedded.venues[0].location.longitude;

            console.log(tripLat, tripLong)
            return  <EventCard 
            // style={styles.card}
                key={event.id}
                event={event}
                index={i+ 1}
                
            /> 
            }
        )
        return eventCards
    }

    // const handleMapPress = (e) => {
    

    //     const lat = e.nativeEvent.coordinate.latitude;
    //     const fLat = lat.toFixed(3);

    //     const long = e.nativeEvent.coordinate.longitude;
    //     const fLong = long.toFixed(3);
        
    //     setEventLat(fLat);
    //     setEventLong(fLong)

    //     dispatch({type:"SET_LATITUDE", latitude: latitude})
    //     dispatch({type:"SET_LONGITUDE", longitude: longitude})

    
    // }
    const i = 0
    const showEvents = () => {
        return <Text>{i+1} {tripName}</Text>
    }

    return (
        <View style={styles.container}>
            <View> 
                <Text>hi</Text>
                {showEvents()}
            </View>
            <View style={styles.button}>
                <Button
                
                title="Spawn Events"
                onPress={loadEvents}
                >

                </Button>

                <Button
                
                title="Spawn Restaurants"
                onPress={loadEvents}
                >

                </Button>
            </View>
            <View style={styles.mapContainer}>
                <MapView 
                    style={styles.map} 
                    initialRegion={initialRegion} 
                    
                >
                    
                    <Marker 
                        coordinate={{latitude: 	tripLat, longitude: tripLong,}}
                        title={`Latitude:${tripLat} Longitude:${tripLong}`}
                        description="Add Your Next Destination Using the Forum Below"
                    />
                    
                </MapView>
                
            </View>
            <ScrollView style={styles.cards}>
                {spawnEvents()}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'hsl(155, 100%, 84%)',
    },
    mapContainer:{
        height: "40%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: Dimensions.get('window').width,
        height: "100%",
    },
    text: {
        height: "50%",
    },
    search: { 
        left:10,
        height: 40, 
        flex: 1,
        borderColor: 'gray', 
        borderWidth: 1, 
        borderTopWidth:0, 
        borderRightWidth:0,
        borderLeftWidth:0
    },
    touchable: {
        paddingTop:20,
    },
    coord: {
        padding:10,
    },
    cards: {
        paddingTop:10,
    },
    button:{
        flexDirection:'row',
        justifyContent:"space-between"
    },
    
    });

