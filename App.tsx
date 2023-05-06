import { StatusBar } from "expo-status-bar";
import moment from "moment";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Vibration, Button } from "react-native";
import CountDown from "react-native-countdown-component";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export default function App() {
	const [duration, setDuration] = useState(0);
	const [expDate, setExpDate] = useState(moment());
	const [isCountdownOpen, setIsCountDownOpen] = useState(false);
	//"2023-05-06 18:27:45"

	useEffect(() => {
		const date = moment();
		const diff = moment.duration(moment(expDate).diff(moment(date)));
		const hours: number = diff.asHours();
		const minutes: number = diff.asHours();
		const seconds: number = diff.asHours();
		setDuration(hours * 60 * 60 + minutes * 60 + seconds);
	}, [expDate]);

	return (
		<View style={styles.container}>
			<StatusBar style="auto" />
			<Text style={styles.countDownHeader}>Countdown until Date:</Text>
			<CountDown
				until={duration}
				timeToShow={["D", "H", "M", "S"]}
				onFinish={() => {
					Vibration.vibrate(100);
					alert("finished");
				}}
				onPress={() => {
					Vibration.vibrate(10);
					alert("Seleccione fecha");
				}}
				size={20}
			/>
			<Button
				title="Set Countdown"
				onPress={() => {
					setIsCountDownOpen(true);
				}}
			/>
			{isCountdownOpen && (
				<RNDateTimePicker
					style={{ paddingBottom: 16 }}
					mode="time"
					value={expDate.toDate()}
					onChange={(value) => {
						const newExpDate = moment(value.nativeEvent.timestamp);
						console.log(newExpDate);
						setExpDate(newExpDate);
						setIsCountDownOpen(false);
					}}
				/>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
	countDownHeader: {
		fontSize: 32,
		paddingBottom: 16,
	},
});
