
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
        dispatch({type:"SET_START", start: selectedStartDate});
        dispatch({type:"SET_END", end: selectedEndDate });
        navigation.navigate("Map")
        
    }


    const onDateChange = (date, type) => {
        
        if (type === 'END_DATE') {
            const endString = date.toString();
            const end = endString.split('12:00:00')[0]
            setSelectedEndDate(end);
        } else {
        const startString = date.toString();
        const start = startString.split('12:00:00')[0];
        setSelectedEndDate(null);
        setSelectedStartDate(start);
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
                todayBackgroundColor = "hsl(181, 59%, 97%)"
                selectedDayColor = "hsl(181, 59%, 94%)"
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
                        {selectedStartDate ? selectedStartDate: ''}
                    </Text>
                    <Text style={styles.textStyle}>
                        Selected End Date :
                    </Text>
                    <Text style={styles.textStyle}>
                        {selectedEndDate ? selectedEndDate : ''}
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
        backgroundColor: 'hsl(181, 59%, 96%)',
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

