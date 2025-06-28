import { View } from "react-native";
import NavBar from "./NavBar";
import { SafeAreaView } from "react-native-safe-area-context";


export default function MainLayout({children}){

    return(
        <SafeAreaView className="flex-1 bg-whit">
            {children}
            <NavBar />
        </SafeAreaView>
    )
}