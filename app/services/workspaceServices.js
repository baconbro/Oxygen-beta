import { getFirestore, collection, getDocs, addDoc, updateDoc, doc,query,where,setDoc ,deleteDoc,getDoc} from 'firebase/firestore';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { db } from '../modules/alpha1/App/services/firestore';


const getSpaces = async (orgId) => {
  try {
    const itemsColRef = query(collection(db, 'organisation', orgId, 'spaces'));
    const snapshot = await getDocs(itemsColRef);
    const workspaces = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return workspaces;
  } catch (error) {
    console.error('Error fetching workspaces: ', error);
    throw new Error('Error fetching workspaces');
  }
};

const getSpace = async (id, orgId) => {
  try {
    const spaceDocRef = doc(db, 'organisation', orgId, 'spaces', id)
    const workspace = await getDoc(spaceDocRef);
  return workspace.data();
  } catch (error) {
    console.error('Error fetching workspace: ', error);
    throw new Error('Error fetching workspace');
  }
};




// React Query hooks
export const useGetSpaces = (orgId) => {
  return useQuery(['Workspaces', orgId], () => getSpaces(orgId), {
    enabled: !!orgId,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
// React Query hooks
export const useGetSpace = (id, orgId) => {
  return useQuery(['Workspace', id], () => getSpace(id, orgId), {
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};