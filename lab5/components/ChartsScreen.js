import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { LineChart, PieChart } from "react-native-chart-kit";
import SwitchSelector from 'react-native-switch-selector';
import Svg, { Circle } from 'react-native-svg';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

const darkGray = "#1C1C1C"


const styleConfig = {
    bg: "#000000",
    color: 'white',
    toggleBg: '#1C1C1C',
}

let screenWidth = window.width;

export default function ChartScreen() {

    const [toggle, setToggle] = useState(true)
    const [dimensions, setDimensions] = useState({ window, screen });

    const onChange = ({ window, screen }) => {
        setDimensions({ window, screen });
    };

    useEffect(() => {
        Dimensions.addEventListener("change", onChange);
        return () => {
            Dimensions.removeEventListener("change", onChange);
        };
    });

    function ChartShow() {
        if (toggle) {
            return (
                <View>
                    <LineChart
                        data={data}
                        width={dimensions.window.width - 10}
                        chartConfig={chartConfig}
                        height={270}
                        zIndex={1}
                        style={{ top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}
                    />
                </View>
            )
        } else {
            return (
                <View>
                    <PieChart
                        data={dataPie}
                        width={screenWidth}
                        height={300}
                        chartConfig={chartPieConfig}
                        accessor={"size"}
                        backgroundColor={"transparent"}
                        hasLegend={false}
                        center={[screenWidth / 4, 0]}
                    />
                    <View style={{
                        zIndex: 1, position: 'absolute', paddingLeft: 90, marginBottom: 100
                    }}>
                        <Svg height="280" width="300">
                            <Circle cx="118" cy="152" r="70" fill="#000" />
                        </Svg>
                    </View>
                </View >
            )
        }
    }

    return (
        <View style={styles.screen}>
            <View style={styles.toggle}>
                <SwitchSelector
                    options={options}
                    initial={0}
                    textColor={"#999"}
                    selectedColor={styleConfig.color}
                    buttonColor={styleConfig.bg}
                    backgroundColor={styleConfig.toggleBg}
                    borderColor={"#000"}
                    borderRadius={10}
                    onPress={value => setToggle(value)}
                    style={{ paddingTop: 10 }}
                    buttonMargin={1}
                />
            </View>

            <View style={styles.container}>
                <ChartShow isSwitched={toggle} />
            </View>
        </View>
    );
}

const chartConfig = {
    backgroundGradientFrom: styleConfig.bg,
    backgroundGradientTo: styleConfig.bg,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    propsForDots: {
        r: "1",
        strokeWidth: "2",
    }
};

const chartPieConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
}

const options = [
    { label: 'Графік', value: true },
    { label: 'Діаграма', value: false },
];

const dataPie = [
    {
        name: "Black",
        size: 40,
        color: "#1E1A19",
    },
    {
        name: "Orange",
        size: 30,
        color: "#E37103",
    },
    {
        name: "Green",
        size: 30,
        color: "#10732C",
    },
];

const data = {
    fromZero: true,
    datasets: 
    [
        {strokeWidth: 2, color: (opacity = 1) => `rgba(30, 139, 195, ${opacity})`,
        data: [Math.exp(-6), Math.exp(-5.5), Math.exp(-5), Math.exp(-4.5), Math.exp(-4), Math.exp(-3.5), Math.exp(-3), Math.exp(-2.5), Math.exp(-2), Math.exp(-1.5), Math.exp(-1), Math.exp(-0.5),
        Math.exp(0), Math.exp(0.5), Math.exp(1), Math.exp(1.5), Math.exp(2), Math.exp(2.5), Math.exp(3), Math.exp(3.5), Math.exp(4), Math.exp(4.5), Math.exp(5), Math.exp(5.5), Math.exp(6)]}
    ]
};


const styles = StyleSheet.create({

    screen: {
        flex: 1,
        paddingTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: styleConfig.bg
    },

    container: {
        flex: 10,
        alignItems: 'center',
        paddingLeft: 50,
        paddingRight: 50,
        backgroundColor: styleConfig.bg,
        paddingTop: 20
    },

    toggle: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,
        elevation: 1,
    },

});