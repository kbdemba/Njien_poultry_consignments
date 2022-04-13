import { getFirestore, collection, addDoc, doc, getDoc, getDocs, setDoc, deleteDoc } from "firebase/firestore"; 
const db = getFirestore();


export const getUserInfo = async (userId)=>{
  return getDoc(doc(db, 'users', userId))
    .then( userData => {
      if(userData.exists()){
        return {data : userData.data()}
      }else{
        return {data: {}}
      }
    })
    .catch((error) => {return {error: error}})
}

// Save and update user info
export const updateUserInfo = async (data, userId) => {
  return setDoc( doc(db, 'users', userId), data , { merge: true }
  ).then(data=>{ return {data:data}})
  .catch((error) => {return {error: error}})
}


// //// /// / / /. / //// / / / / / / // //// /// / / /. / //// / / / / / /
export const getConsignments = async ()=>{
  return getDocs(collection(db, 'consignments'))
    .then( querySnapshot => {
      let data = []
      querySnapshot.forEach(doc => {
        data.push({...doc.data(), id: doc.id})
      })
      return {data: data}
    })
    .catch((error) => {return {error: error}})
}

export const getConsignmentDetail = async (id)=>{
  return getDoc(doc(db, 'consignments', id))
    .then( data => {
      if(data.exists()){
        return {data : data.data()}
      }else{
        // TODO: if no data, return a 404 that the data does not exist
        return {error: 'Consignment not found'}
      }
    })
    .catch((error) => {return {error: error}})
}

export const addConsignment = async (data) => {
  return addDoc(collection(db, 'consignments'), data)
    .then(data => {
      return {id: data.id}
    })
    .catch((error) => {return {error: error}})
}

// TODO:
// Update consignment 
export const updateConsignment = async (data, id) => {
  return setDoc( doc(db, 'consignments', id), data , { merge: true }
  ).then(updatedData=>{ return {data:updatedData}}) // no updated data returneed
  .catch((error) => {return {error: error}})
}

// TODO:
// Delete consignment
export const deleteConsignment = async (id) => {
  return deleteDoc( doc(db, 'consignments', id))
  .then(data=>{ return {data:data}}) // no data returneed
  .catch((error) => {return {error: error}})
}


// Later
// export const CreateConsignment = async (data) => {
//   const docRef = await addDoc(collection(db, "consignmentSummary"), {
//     name: "Tokyo",
//     country: "Japan"
//   });
//   // after creating consignment, create a wrapper/summary that has the id, name and date of the consignment
//   return addDoc(collection(db, 'consignments'), data)
//     .then(data => {
//       console.log(data.id, data)
//       return {data}
//     })
//     .catch((error) => {return {error: error}})
// }


// const docRef = await addDoc(collection(db, "cities"), {
//     name: "Tokyo",
//     country: "Japan"
//   });
//   console.log("Document written with ID: ", docRef.id);

// get user info