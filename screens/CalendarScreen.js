
import React, {useState} from 'react';


import {SafeAreaView, StyleSheet, View, Text, Button} from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';
import { useDispatch, useSelector } from "react-redux";



export default function CalendarScreen({navigation}) {
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const dispatch = useDispatch()
    const startDate = useSelector(state => state.start)
    const endDate = useSelector(state => state.end)
    
    const handleClick = () => {
        dispatch({type:"SET_START", start: selectedStartDate.toString()});
        dispatch({type:"SET_END", end: selectedEndDate.toString()});
        navigation.navigate("Map")
        
    }


    const onDateChange = (date, type) => {
        
        if (type === 'END_DATE') {
        setSelectedEndDate(date);
        } else {
        setSelectedEndDate(null);
        setSelectedStartDate(date);
        }
    };

    
  return (
    <SafeAreaView style={styles.bigContainer}>
        <View style={styles.bigContainer}>
            <View style={styles.container}>
                <Text style={styles.titleStyle}>
                Pick Your Date and Confirm Below
                </Text>
                <CalendarPicker
                startFromMonday={true}
                allowRangeSelection={true}
                minDate={new Date(2018, 1, 1)}
                maxDate={new Date(2050, 6, 3)}
                weekdays={
                    [
                    'Mon', 
                    'Tue', 
                    'Wed', 
                    'Thur', 
                    'Fri', 
                    'Sat', 
                    'Sun'
                    ]}
                months={[
                    'January',
                    'Febraury',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December',
                ]}
                previousTitle="Previous"
                nextTitle="Next"
                todayBackgroundColor="#e6ffe6"
                selectedDayColor="#66ff33"
                selectedDayTextColor="#000000"
                scaleFactor={375}
                textStyle={{
                    fontFamily: 'Cochin',
                    color: '#000000',
                }}
                onDateChange={onDateChange}
                />
                <View style={styles.textStyle}>
                    <Text style={styles.textStyle}>
                        Selected Start Date :
                    </Text>
                    <Text style={styles.textStyle}>
                        {selectedStartDate ? selectedStartDate.toString() : ''}
                    </Text>
                    <Text style={styles.textStyle}>
                        Selected End Date :
                    </Text>
                    <Text style={styles.textStyle}>
                        {selectedEndDate ? selectedEndDate.toString() : ''}
                    </Text>
                    <Button 
                        style={styles.button}
                        onPress={handleClick}
                        title='Submit Date'
                    />
                </View>
            </View>
        </View>
    </SafeAreaView>
    );
    };
  

    const styles = StyleSheet.create({
    bigContainer: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: 'hsl(179, 59%, 86%)',
        padding: 16,
    },
    container: {
        
        paddingTop: 20,
        backgroundColor: '#ffffff',
        padding: 1,
        borderRadius: 10,
        
    },
    textStyle: {
        marginTop: 10,
        
    },
    titleStyle: {
        textAlign: 'center',
        fontSize: 20,
        margin: 20,
    },
    button: {
        color: "white",
        backgroundColor: 'white',
        top:2
    },
    });

