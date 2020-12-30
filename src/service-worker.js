importScripts("./ngsw-worker.js")

addEventListener('sync', (event)=>{
    console.log('in the sync event')
    if(event.tag === 'post-data') {
        console.log('got the post-data event tag')
        event.waitUntil(getandSendData())
    }
    if(event.tag === 'post-image') {
        console.log('got the post-image event tag');
        event.waitUntil(openIndexedDBforImage())
    }
})

function openIndexedDBforImage() {
    let db;
    const request = indexedDB.open('pwaDB');
    request.onerror = (event) => {
        console.log("Unable to open the IndexedDb")
    }

    request.onsuccess = (event) => {
        db = event.target.result;
        getImageandSendImage(db);
    }

    return db;
}


function getImageandSendImage(db) {
    console.log('in getImageDatafromIndexDb')
    const transaction = db.transaction(['testing']);
    const objectStore = transaction.objectStore('testing');
    const request = objectStore.get('pwaImage');
    request.onerror = (event) => {
        console.log('Unable to get data');
    }
    request.onsuccess = (event) => {
        addImage(request.result);
        console.log("From service worker getting data from indexedDB", request.result);
    }

}

function addImage(image) {
    console.log('in add function', image)
    var uploadData = new FormData();
    uploadData.append('image', image, image.name);
    fetch('http://localhost:3000/upload/product', {
        method: 'POST',
        body: uploadData
    })
    .then(()=> Promise.resolve())
    .catch(()=> Promise.reject())
}



function add(pwaData){
    console.log('in add function', pwaData)

    fetch('http://localhost:3000/pwaTesting', {
        method: 'POST',
        headers: {
            'content-type': "application/json"
        },
        body: JSON.stringify(pwaData)
    })
    .then(()=> Promise.resolve())
    .catch(()=> Promise.reject())
}

function getandSendData() {
    console.log('in the getandsenddata');
    let db;
    const request = indexedDB.open('pwaDB');
    request.onerror = (event) => {
        console.log("Unable to open the IndexedDb")
    }

    request.onsuccess = (event) => {
        db = event.target.result;
        getDataFromIndexedDb(db)
    }
}

function getDataFromIndexedDb(db) {
    console.log('in getDatafromIndexDb')
    const transaction = db.transaction(['testing']);
    const objectStore = transaction.objectStore('testing');
    const request = objectStore.get('pwaData');
    request.onerror = (event) => {
        console.log('Unable to get data');
    }
    request.onsuccess = (event) => {
        add(request.result);
        console.log("From service worker getting data from indexedDB", request.result);
    }
}