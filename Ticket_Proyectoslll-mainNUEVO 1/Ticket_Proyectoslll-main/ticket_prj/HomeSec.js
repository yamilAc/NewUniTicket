import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabSecretary from "./BottomTabSecretary";
 
export default function Home(){
  return(
    <NavigationContainer independent={true}>
      <BottomTabSecretary/>
    </NavigationContainer>
  );
}