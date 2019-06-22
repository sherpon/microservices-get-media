
const addMediaToDb = async (firestore, websiteId) => {
  return new Promise((resolve, reject) => {
    const mediaRef = firestore.collection('websites').doc(websiteId).collection('media').orderBy('createdAt', 'desc');
    mediaRef.get()
    .then(snapshot => {
      let media = [];
      snapshot.forEach(doc => {
        // console.log(doc.id, '=>', doc.data());
        const mediafile = {...doc.data(), filename: doc.id, createdAt: doc.data().createdAt._seconds * 1000};
        media.push(mediafile);
      });
      resolve(media);
    })
    .catch(err => {
      console.error('Error getting documents', err);
      reject(err);
    });
  });
};

module.exports = addMediaToDb;