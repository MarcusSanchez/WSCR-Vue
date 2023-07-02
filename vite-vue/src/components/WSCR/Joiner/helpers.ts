import { Ref, UnwrapRef } from "vue";

export function validateName(str: string): boolean {
    // Check if the string matches the pattern of 3-16 characters
    return /^[a-zA-Z0-9]{3,16}$/.test(str);
}

export function validateRoom(str: string): boolean {
    // Check if the string matches the pattern of four digits
    if (/^\d{4}$/.test(str)) {
        // Convert the string to a number
        let num = parseInt(str, 10);

        // Check if the number is within the desired range
        if (num >= 0 && num <= 9999) {
            return true;
        }
    }
}

export function setJoinButtonHelper(joinButton: Ref<string>, roomNumber: string, uName: string): void {
    if (roomNumber.length > 0 && uName.length > 0) {
        joinButton.value = `Join Room ${roomNumber} as ${uName}`;
    } else if (roomNumber.length > 0) {
        joinButton.value = `Join Room ${roomNumber}`;
    } else if (uName.length > 0) {
        joinButton.value = `Join Room as ${uName}`;
    } else {
        joinButton.value = `Join Room`;
    }
}