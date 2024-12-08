import firestore from '@react-native-firebase/firestore';


export const getUserByIdentifier = async (userId: any, phoneNumber: any) => {
    try {
        let userDoc;

        if (userId) {
            // Query by userId
            userDoc = await firestore().collection('users').doc(userId).get();
            if (userDoc.exists) {
                return userDoc.data()
            }
        } else if (phoneNumber) {
            try {
                // Fetch all users
                const usersSnapshot = await firestore().collection('users').get();

                let matchedUser = null;

                // Iterate through the users to find the matching phone number
                usersSnapshot.forEach((doc) => {
                    const data = doc.data();

                    // Check if the phoneNumber matches
                    if (data.phoneNumber === phoneNumber) {
                        matchedUser = { id: doc.id, ...data };
                    }
                });

                if (matchedUser) {
                    return matchedUser; // Return the matched user data
                } else {
                    return false;
                }
            } catch (error) {
                return false;
            }
        } else {
            return false;
        }
    } catch (error) {
        return false;

    }
};
