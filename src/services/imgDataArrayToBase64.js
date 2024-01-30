export const ArrayDataToBase = (imageDataArray) =>{
    const uint8Array = new Uint8Array(imageDataArray);
    const binaryString = uint8Array.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    const base64Image = btoa(binaryString);
    const imageDataURI = `data:image/jpeg;base64,${base64Image}`;
    console.log(imageDataURI);
    return imageDataURI;
}