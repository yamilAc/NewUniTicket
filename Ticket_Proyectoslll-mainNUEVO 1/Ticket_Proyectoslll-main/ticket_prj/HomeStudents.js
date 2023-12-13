import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import BottomTabStudents from "./BottomTabStudents";
 
export default function Home(){
  return(
    <NavigationContainer independent={true}>
      <BottomTabStudents/>
    </NavigationContainer>
  );
}