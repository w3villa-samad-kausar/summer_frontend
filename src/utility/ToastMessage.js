import Toast from "react-native-toast-message";

function successToastMessage(successMessage) {
    
    return Toast.show({
        type: 'success',
        text1: successMessage,
        position: 'bottom',
        visibilityTime: 5000,
        autoHide: true,
        bottomOffset: 40,
    });
}

function errorToastMessage(errorMessage){
    return Toast.show({
        type: 'error',
        text1:errorMessage,
        position: 'bottom',
        visibilityTime: 5000,
        autoHide: true,
        bottomOffset: 40,
    })
}

export {
    successToastMessage,
    errorToastMessage
}