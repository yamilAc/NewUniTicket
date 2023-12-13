import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "./BottomTabs";

export default function Home(){
  return(
    <NavigationContainer independent={true}>
      <BottomTab/>
    </NavigationContainer>
  );
}