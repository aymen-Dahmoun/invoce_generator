import { View } from "react-native";


export default function Spacer({ height = 10 }) {
  return (
    <View style={{ height: height, backgroundColor:"transparent" }} />
  );
}