import { getFirestore, collection, getDocs, addDoc, updateDoc, doc,query,where,setDoc ,deleteDoc,getDoc} from 'firebase/firestore';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { db } from '../modules/alpha1/App/services/firestore';


const getOrgUsers = async (orgId) => {
  try {
    const docRef = doc(db, "organisation", orgId);
    const org = await getDoc(docRef)
    return org.data();
  } catch (error) {
    console.error('Error fetching items: ', error);
    throw new Error('Error fetching items');
  }
};

const getUser = async (userEmail, userId) => {
  try {
    let q;
    if (userId) {
      q = query(collection(db, "users"), where("uid", "==", userId));
    } else {
      q = query(collection(db, "users"), where("email", "==", userEmail));
    }
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      // Assuming there's only one matching document, return the first one
      return querySnapshot.docs[0].data();
    } else {
      throw new Error('No matching user found');
    }
  } catch (error) {
    console.error('Error fetching user: ', error);
    throw new Error('Error fetching user');
  }
};





// React Query hooks
export const useGetOrgUsers= (orgId) => {
  return useQuery(['Users', orgId], () => getOrgUsers(orgId), {
    enabled: !!orgId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useGetUser= (userEmail, userId) => {
  return useQuery(['Users', userEmail, userId], () => getOrgUsers(userEmail, userId), {
    enabled: !!userEmail || !!userId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};