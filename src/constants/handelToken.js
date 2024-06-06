import AsyncStorage from "@react-native-async-storage/async-storage";
exports.setToken = async (value) => {
    try {
        await AsyncStorage.setItem('token', value);
    } catch (e) {
        console.error("token error");
    }
};
exports.getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return value;
        }
    } catch (e) {
        console.error("token error");
    }
};

exports.clearToken = async () => {
    try {
        await AsyncStorage.removeItem('token');
    } catch (e) {
        console.error("clear token error");
    }
};

exports.config = async () => {
    try {
        return {
            headers: {
                'authorization': await AsyncStorage.getItem('token')
            },
            withCredentials: true
        };
    } catch (e) {
        console.error("config error");
    }
}