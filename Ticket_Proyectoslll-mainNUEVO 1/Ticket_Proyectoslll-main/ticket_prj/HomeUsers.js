import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabUsers from "./BottomTabUsers";

export default function Home(){
  return(
    <NavigationContainer independent={true}>
      <BottomTabUsers/>
    </NavigationContainer>
  );
}